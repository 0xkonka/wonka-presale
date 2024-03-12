import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Provider } from '@ethersproject/abstract-provider'
import { Config, useAccount, useChainId, useClient, useReadContract, useWalletClient } from 'wagmi'
import type { Account, Chain, Client, Transport } from 'viem'
import { providers } from 'ethers'
import { multicall, readContract, getBalance } from '@wagmi/core'
import PRESALE_ABI from '@/abi/presale.json'
import { PRESALE_ADDRESS } from '@/configs/address'
import { wagmiConfig } from '@/pages/_app'
import { PresaleConfig, UserInfo } from '@/types/presale'

type PresaleContextValue = {
  account?: string
  config?: PresaleConfig
  wonkaPrice: bigint
  capAmount: bigint
  presaleLevel: number
  totalContributedAmount: bigint
  presaleStatus: number
  userInfo?: UserInfo
}

const PresaleContext = createContext<PresaleContextValue | undefined>(undefined)

type PresaleProviderProps = {
  children: React.ReactNode
  // loader?: React.ReactNode
}

export const PresaleProvider: React.FC<PresaleProviderProps> = ({ children }) => {
  const { address: account } = useAccount()
  const chainId = useChainId()

  const [config, setConfig] = useState<PresaleConfig>()
  const [presaleLevel, setPresaleLevel] = useState(0)
  const [totalContributed, setTotalContributed] = useState<bigint>(BigInt(0))
  const [presaleStatus, setPresaleStatus] = useState(0)
  const [wonkaPrice, setPrice] = useState<bigint>(BigInt(0))
  const [capAmount, setCapAmount] = useState<bigint>(BigInt(0))
  const [userInfo, sertUserInfo] = useState<UserInfo>()

  useEffect(() => {
    const presaleContract = {
      address: PRESALE_ADDRESS[chainId] as '0x{string}',
      abi: PRESALE_ABI as any
    } as const
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
            functionName: 'price',
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
    fetchPresaleConfig()
  }, [chainId, account])

  useEffect(() => {
    if (account) {
      // Get User Info
      const fetchUserInfo = async () => {
        const result: any = await readContract(wagmiConfig, {
          abi: PRESALE_ABI,
          address: PRESALE_ADDRESS[chainId] as '0x{string}',
          functionName: 'funders',
          args: [account]
        })

        const _userInfo: UserInfo = {
          contributedAmount: result[0],
          claimableAmount: result[1],
          status: result[2]
        }

        sertUserInfo(_userInfo)
      }
      fetchUserInfo()
    }
  }, [account, chainId])

  return (
    <PresaleContext.Provider
      value={{
        account,
        config,
        wonkaPrice,
        capAmount,
        presaleLevel,
        totalContributedAmount: totalContributed,
        presaleStatus,
        userInfo
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
