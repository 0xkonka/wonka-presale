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
  config: PresaleConfig
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

const initialConfig: PresaleConfig = {
  usdc: '',
  presaleToken: '',
  price: BigInt(1),
  startTime: BigInt(1),
  endTime: BigInt(2),
  softcap: BigInt(1),
  hardcap: BigInt(2),
  capPerLevel: BigInt(1),
  minContribution: BigInt(1),
  maxContribution: BigInt(2)
}

export const PresaleProvider: React.FC<PresaleProviderProps> = ({ children }) => {
  const { address: account } = useAccount()
  const chainId = useChainId()

  const [config, setConfig] = useState<PresaleConfig>(initialConfig)
  const [presaleLevel, setPresaleLevel] = useState<number>(0)
  const [totalContributed, setTotalContributed] = useState<bigint>(BigInt(0))
  const [presaleStatus, setPresaleStatus] = useState(0)
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
          }
        ]
      })

      if (result[0].status === 'success') {
        const presaleConfig = result[0].result as any[]
        const _config: PresaleConfig = {
          usdc: presaleConfig[0],
          presaleToken: presaleConfig[1],
          price: presaleConfig[2],
          startTime: presaleConfig[3],
          endTime: presaleConfig[4],
          softcap: presaleConfig[5],
          hardcap: presaleConfig[6],
          capPerLevel: presaleConfig[7],
          minContribution: presaleConfig[7],
          maxContribution: presaleConfig[8]
        }
        setConfig(_config)
      }

      if (result[1].status === 'success') {
        const _presaleLevel = result[1].result as number
        setPresaleLevel(_presaleLevel)
      }

      if (result[2].status === 'success') {
        const _totalContributed = result[2].result as bigint
        setTotalContributed(_totalContributed)
      }

      if (result[2].status === 'success') {
        const _presaleStatus = result[3].result as number
        setPresaleStatus(_presaleStatus)
      }
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
      value={{ account, config, presaleLevel, totalContributedAmount: totalContributed, presaleStatus,  userInfo }}
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
