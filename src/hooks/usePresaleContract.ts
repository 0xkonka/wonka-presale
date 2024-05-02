/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react'
import { type BaseError, useAccount, useChainId, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { PRESALE_ADDRESS, USDC_ADDRESS } from '@/configs/address'
import PRESALE_ABI from '@/abi/presale.json'
import { erc20Abi, parseUnits } from 'viem'

const usePresaleContract = () => {
  const { address: account } = useAccount()
  const chainId = useChainId()

  const { data: txhash, writeContract, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txhash
  })

  const onApprove = (approveAmount: string) => {
    try {
      console.log('Approving')
      writeContract({
        address: USDC_ADDRESS[chainId] as '0x{string}',
        abi: erc20Abi,
        functionName: 'approve',
        args: [PRESALE_ADDRESS[chainId] as '0x{string}', parseUnits(approveAmount, 6)]
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  const onContribute = (contributeAmount: string, code: string) => {
    try {
      console.log('Contributing')
      writeContract({
        address: PRESALE_ADDRESS[chainId] as '0x{string}',
        abi: PRESALE_ABI,
        functionName: 'contribute',
        args: [parseUnits(contributeAmount, 6), code]
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  const onClaim = () => {
    try {
      console.log('Claiming')
      writeContract({
        address: PRESALE_ADDRESS[chainId] as '0x{string}',
        abi: PRESALE_ABI,
        functionName: 'claim',
        args: []
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  // const updateStatus = async () => {
  //   const totalRaised = await tokenSaleContract.totalRaised()
  //   const totalSold = await tokenSaleContract.totalSold()
  //   const totalContributors = await tokenSaleContract.funderCounter()
  //   const statusEnum = await tokenSaleContract.status()

  //   if (account) {
  //     const _userStatus = await tokenSaleContract.funders(account)
  //     setUserStatus(_userStatus)
  //   }

  //   setPresaleStatus({ totalRaised, totalSold, totalContributors, statusEnum })
  // }

  // useEffect(() => {
  //   if (tokenSaleContract) {
  //     ; (async () => {
  //       const _presaleConfig = await tokenSaleContract.presaleConfig()
  //       setPresaleConfig({
  //         token: _presaleConfig.token,
  //         price: _presaleConfig.price,
  //         listing_price: _presaleConfig.listing_price,
  //         liquidity_percent: _presaleConfig.liquidity_percent,
  //         hardcap: _presaleConfig.hardcap,
  //         softcap: _presaleConfig.softcap,
  //         min_contribution: _presaleConfig.min_contribution,
  //         max_contribution: _presaleConfig.max_contribution,
  //         startTime: _presaleConfig.white_startTime,
  //         endTime: _presaleConfig.white_endTime
  //       })
  //     })()
  //     updateStatus()
  //   }
  // }, [tokenSaleContract])

  return { onClaim, onContribute, onApprove, txhash, isPending, isConfirming, isConfirmed, error }
}

export default usePresaleContract
