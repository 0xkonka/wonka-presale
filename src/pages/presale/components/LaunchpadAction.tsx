import React, { useEffect, useMemo, useState } from 'react'
import { type BaseError, useAccount, useChainId, useReadContract } from 'wagmi'
import { erc20Abi, formatUnits, parseUnits } from 'viem'
import { Button, InputAdornment, Stack, Typography } from '@mui/material'
import { usePresale } from '@/context/PresaleContext'
import { LaunchpadStatus } from '..'
import CustomTextField from '@/@core/components/mui/text-field'
import { PRESALE_ADDRESS, USDC_ADDRESS } from '@/configs/address'
import usePresaleContract from '@/hooks/usePresaleContract'
import { PresaleConfig } from '@/types/presale'
import toast from 'react-hot-toast'
import { showToast } from '@/hooks/toasts'

// export interface Props {
//   status: LaunchpadStatus
//   presaleConfig: PresaleConfig
//   presaleStatus: PresaleStatus
//   userStatus: UserStatus
//   whiteListed: boolean
// }

export interface Props {
  config: PresaleConfig
  presaleState: { status: LaunchpadStatus; secondsUntilStart: number; secondsUntilEnd: number }
}

const LaunchpadAction: React.FC<Props> = ({ config, presaleState }) => {
  const { status } = presaleState
  const buyTokenSymbol = 'usdc'

  const { address: account } = useAccount()
  const chainId = useChainId()
  const { totalContributedAmount, userInfo } = usePresale()
  const { minContribution: minPerTx, maxContribution: maxPerUser } = config
  const { contributedAmount: userContributedAmount } = userInfo || {}

  const { onApprove, onContribute, onClaim, isPending, isConfirming, isConfirmed, error } = usePresaleContract()
  const { refresh } = usePresale()

  const [contributeAmount, setContributeAmount] = useState('')

  const { data: usdcBalance } = useReadContract({
    address: USDC_ADDRESS[chainId] as '0x{string}',
    abi: erc20Abi,

    functionName: 'balanceOf',
    args: [account!]
  })

  const { data: allowance, refetch } = useReadContract({
    address: USDC_ADDRESS[chainId] as '0x{string}',
    abi: erc20Abi,
    functionName: 'allowance',
    args: [account!, PRESALE_ADDRESS[chainId] as '0x{string}']
  })

  useEffect(() => {
    if (error) showToast('error', 'Error', (error as BaseError).shortMessage || error.message, 10000)
  }, [error])

  useEffect(() => {
    const refreshData = async () => {
      await refresh()
      await refetch()
    }
    refreshData()
  }, [isConfirmed])

  const percentOfUserContribution = useMemo(() => {
    if (!totalContributedAmount) return 0
    return (Number(userContributedAmount) / Number(totalContributedAmount)) * 100
  }, [totalContributedAmount, userContributedAmount])

  if (!userInfo) return <></>

  if (status === 'upcoming') {
    return (
      <Typography>
        Balance : {usdcBalance ? formatUnits(usdcBalance!, 6) : 0} {buyTokenSymbol}{' '}
      </Typography>
    )
  }

  if (status === 'live') {
    return (
      <>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <CustomTextField
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button
                    onClick={() =>
                      setContributeAmount(
                        (usdcBalance! ?? 0) < maxPerUser ? formatUnits(usdcBalance!, 6) : formatUnits(maxPerUser, 6)
                      )
                    }
                  >
                    MAX
                  </Button>
                </InputAdornment>
              )
            }}
            value={contributeAmount}
            type='number'
            placeholder={
              usdcBalance ? (usdcBalance < maxPerUser ? formatUnits(usdcBalance!, 6) : formatUnits(maxPerUser, 6)) : '0'
            }
            onChange={e => setContributeAmount(e.target.value)}
          />
          {(allowance ? +formatUnits(allowance, 6) : 0) >= +contributeAmount ? (
            <Button
              variant='contained'
              color='success'
              onClick={() => onContribute(contributeAmount)}
              disabled={isPending || isConfirming}
            >
              Contribute
            </Button>
          ) : (
            <Button
              variant='contained'
              color='success'
              onClick={() => onApprove(contributeAmount)}
              disabled={isPending || isConfirming}
            >
              Approve
            </Button>
          )}
        </Stack>
        <Typography>
          Balance : {usdcBalance ? formatUnits(usdcBalance!, 6) : 0} {buyTokenSymbol}{' '}
        </Typography>
      </>
    )
  }

  if (status === 'ended') {
    return (
      <>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button variant='contained' color='success' onClick={() => onClaim()} disabled={isPending || isConfirming}>
            Claim
          </Button>
        </Stack>
        <Typography>
          Balance : {usdcBalance ? formatUnits(usdcBalance, 6) : 0} {buyTokenSymbol}{' '}
        </Typography>
      </>
    )
  }

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>Presale is finished</Typography>
        <Button variant='contained' color='success' onClick={() => onClaim()} disabled={isPending || isConfirming}>
          Claim
        </Button>
      </Stack>
      <Typography>
        Balance : {formatUnits(usdcBalance!, 6) ?? 0} {buyTokenSymbol}{' '}
      </Typography>
    </>
  )
}

export default LaunchpadAction
