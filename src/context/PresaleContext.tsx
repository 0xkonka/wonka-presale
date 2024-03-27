import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Provider } from '@ethersproject/abstract-provider'
import { Config, useAccount, useChainId, useClient, useReadContract, useWalletClient } from 'wagmi'
import type { Account, Chain, Client, Transport } from 'viem'
import { providers } from 'ethers'
import { multicall, readContract } from '@wagmi/core'
import PRESALE_ABI from '@/abi/presale.json'
import { PRESALE_ADDRESS } from '@/configs/address'
import { wagmiConfig } from '@/pages/_app'
import { PresaleConfig, UserInfo } from '@/types/presale'
import { usePolling } from '@/hooks/use-polling'
import { avalancheFuji, sepolia } from 'viem/chains'

const POLLING_INTERVAL = 3000 * 1000 //default

type PresaleContextValue = {
  account?: string
  config?: PresaleConfig
  wonkaPrice: bigint
  capAmount: bigint
  presaleLevel: number
  totalContributedAmount: bigint
  totalContributedPerChain: { chainId: number; chainName: string; totalContributed: bigint }[]
  presaleStatus: number
  userInfo?: UserInfo
  refresh: () => Promise<any>
}

const PresaleContext = createContext<PresaleContextValue | undefined>(undefined)

type PresaleProviderProps = {
  children: React.ReactNode
  // loader?: React.ReactNode
}

export const PresaleProvider: React.FC<PresaleProviderProps> = ({ children }) => {
  const { address: account } = useAccount()
  const chainId = useChainId()

  const [totalContributedPerChain, setTotalContributedPerChain] = useState<
  { chainId: number; chainName: string; totalContributed: bigint }[]
  >([])

  const [config, setConfig] = useState<PresaleConfig>()
  const [presaleLevel, setPresaleLevel] = useState(0)
  const [totalContributed, setTotalContributed] = useState<bigint>(BigInt(0))
  const [presaleStatus, setPresaleStatus] = useState(0)
  const [wonkaPrice, setPrice] = useState<bigint>(BigInt(0))
  const [capAmount, setCapAmount] = useState<bigint>(BigInt(0))
  const [userInfo, sertUserInfo] = useState<UserInfo>()

  const presaleContract = {
    address: PRESALE_ADDRESS[chainId] as '0x{string}',
    abi: PRESALE_ABI as any
  } as const

  // const { data: sepoliaStake } = useReadContract({
  //   ...presaleContract,
  //   functionName: 'totalContributed',
  //   chainId: sepolia.id,
  //   args: []
  // })

  // const { data: fujiStake } = useReadContract({
  //   ...presaleContract,
  //   functionName: 'totalContributed',
  //   chainId: avalancheFuji.id,
  //   args: []
  // })

  const fetchAllChainPresaleConfig = async () => {
    const sepoliaStake = await readContract(wagmiConfig, {
      address: PRESALE_ADDRESS[sepolia.id] as '0x{string}',
      abi: PRESALE_ABI as any,
      functionName: 'totalContributed',
      chainId: sepolia.id,
      args: []
    })

    console.log('sepoliaStake', sepoliaStake)
    const fujiStake = await readContract(wagmiConfig, {
      address: PRESALE_ADDRESS[avalancheFuji.id] as '0x{string}',
      abi: PRESALE_ABI as any,
      functionName: 'totalContributed',
      chainId: avalancheFuji.id,
      args: []
    })

    setTotalContributedPerChain([
      {
        chainId: sepolia.id,
        chainName: sepolia.name,
        totalContributed: sepoliaStake as bigint
      },
      {
        chainId: avalancheFuji.id,
        chainName: avalancheFuji.name,
        totalContributed: fujiStake as bigint
      }
    ])
  }

  // Get Presale Config
  const fetchPresaleConfig = async () => {
    const result = await multicall(wagmiConfig, {
      contracts: [
        {
          ...presaleContract,
          functionName: 'presaleConfig',
          args: []
        },
        {
          ...presaleContract,
          functionName: 'presaleLevel',
          args: []
        },
        {
          ...presaleContract,
          functionName: 'totalContributed',
          args: []
        },
        {
          ...presaleContract,
          functionName: 'presaleStatus',
          args: []
        },
        {
          ...presaleContract,
          functionName: 'wonkaPrice',
          args: ['0']
        },
        {
          ...presaleContract,
          functionName: 'capPerLevel',
          args: ['0']
        }
      ]
    })

    const presaleConfig = result[0].result as any[]
    const _config: PresaleConfig = {
      usdc: presaleConfig[0],
      presaleToken: presaleConfig[1],
      startTime: presaleConfig[2],
      endTime: presaleConfig[3],
      softcap: presaleConfig[4],
      hardcap: presaleConfig[5],
      minContribution: presaleConfig[6],
      maxContribution: presaleConfig[7]
    }
    setConfig(_config)

    const _presaleLevel = Number(result[1].result)
    setPresaleLevel(_presaleLevel)
    const _totalContributed = result[2].result as bigint
    setTotalContributed(_totalContributed)
    const _presaleStatus = Number(result[3].result)
    setPresaleStatus(_presaleStatus)

    const _price = result[4].result as bigint
    setPrice(_price)
    const _capAmount = result[5].result as bigint
    setCapAmount(_capAmount)
  }

  // Get User Info
  const fetchUserInfo = async () => {
    if (account) {
      const result = await multicall(wagmiConfig, {
        contracts: [
          {
            ...presaleContract,
            functionName: 'funders',
            args: [account]
          },
          {
            ...presaleContract,
            functionName: 'pendingWonka',
            args: [account]
          }
        ]
      })

      const _userInfo = result[0].result as any
      const _pendingReward = result[1].result as bigint

      const userInfo: UserInfo = {
        contributedAmount: _userInfo[0] as bigint,
        claimableAmount: _userInfo[1] as bigint,
        pendingReward: _pendingReward,
        status: _userInfo[4] as boolean
      }

      sertUserInfo(userInfo)
    }
  }

  usePolling(fetchAllChainPresaleConfig, POLLING_INTERVAL, false, [chainId])
  usePolling(fetchPresaleConfig, POLLING_INTERVAL, false, [chainId])
  usePolling(fetchUserInfo, POLLING_INTERVAL, false, [account, chainId])

  return (
    <PresaleContext.Provider
      value={{
        account,
        totalContributedPerChain,
        config,
        wonkaPrice,
        capAmount,
        presaleLevel,
        totalContributedAmount: totalContributed,
        presaleStatus,
        userInfo,
        refresh: () => {
          return Promise.all([fetchAllChainPresaleConfig(), fetchPresaleConfig(), fetchUserInfo()])
        }
      }}
    >
      {config && presaleLevel !== undefined && totalContributed !== undefined ? children : null}
    </PresaleContext.Provider>
  )
}

export const usePresale = () => {
  const _PresaleContext = useContext(PresaleContext)

  if (!_PresaleContext) {
    throw new Error('You must provide a PresaleContext via PresaleProvider')
  }

  return _PresaleContext
}
