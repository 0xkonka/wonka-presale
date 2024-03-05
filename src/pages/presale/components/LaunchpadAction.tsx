import React, { useMemo, useState } from 'react'
import { useAccount, useChainId, useReadContract } from 'wagmi'
import { erc20Abi, formatUnits, parseUnits } from 'viem'
import { Button, InputAdornment, Stack, Typography } from '@mui/material'
import { usePresale } from '@/context/PresaleContext'
import { LaunchpadStatus } from '..'
import CustomTextField from '@/@core/components/mui/text-field'
import { PRESALE_ADDRESS, USDC_ADDRESS } from '@/configs/address'
import usePresaleContract from '@/hooks/usePresaleContract'

// export interface Props {
//   status: LaunchpadStatus
//   presaleConfig: PresaleConfig
//   presaleStatus: PresaleStatus
//   userStatus: UserStatus
//   whiteListed: boolean
// }

export interface Props {
  presaleState: { status: LaunchpadStatus; secondsUntilStart: number; secondsUntilEnd: number }
}

const LaunchpadAction: React.FC<Props> = ({ presaleState }) => {
  const { status } = presaleState
  const buyTokenSymbol = 'usdc'

  const { address: account } = useAccount()
  const chainId = useChainId()
  const { config, totalContributedAmount, presaleLevel, userInfo } = usePresale()
  const { minContribution: minPerTx, maxContribution: maxPerUser } = config
  const { contributedAmount: userContributedAmount } = userInfo || {}

  const { onApprove, onContribute, onClaim, isPending, isConfirming, isConfirmed } = usePresaleContract()

  // const [openContribute, setOpenContribute] = useState(false)
  const [contributeAmount, setContributeAmount] = useState('')

  // const [pendingTx, setPendingTx] = useState(false)

  const { data: usdcBalance } = useReadContract({
    address: USDC_ADDRESS[chainId] as '0x{string}',
    abi: erc20Abi,

    functionName: 'balanceOf',
    args: [account!]
  })

  const { data: allowance } = useReadContract({
    address: USDC_ADDRESS[chainId] as '0x{string}',
    abi: erc20Abi,
    functionName: 'allowance',
    args: [account!, PRESALE_ADDRESS[chainId] as '0x{string}']
  })

  // const { onClaim } = usePresale()

  // const [onPresentContributeModal] = useModal(
  //   <ContributeModal
  //     contributeLimit={(maxPerUser ?? bigint.from(0)).sub(contributedAmount ?? bigint.from(0))}
  //     minPerTx={minPerTx ?? bigint.from(0)}
  //   />
  // )

  // const claim = async () => {
  //   if (tokenSaleContract) {
  //     const merkleProof = fetchMerkleProof(account)
  //     try {
  //       setPendingTx(true)
  //       await onClaim(merkleProof)
  //     } catch (err) {
  //       console.error(err)
  //     } finally {
  //       setPendingTx(false)
  //     }
  //   }
  // }

  const handleContribute = () => {
    if (formatUnits(allowance!, 6) > contributeAmount) {
      onApprove(contributeAmount)
    } else onContribute(contributeAmount)
  }

  const percentOfUserContribution = useMemo(() => {
    if (!totalContributedAmount) return 0
    return (Number(userContributedAmount) / Number(totalContributedAmount)) * 100
  }, [totalContributedAmount, userContributedAmount])

  if (status === 'upcoming') {
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
            placeholder={usdcBalance ? formatUnits(usdcBalance!, 6) : '0'}
            onChange={e => setContributeAmount(e.target.value)}
          />
          <Button variant='contained' color='success' disabled>
            Contribute
          </Button>
        </Stack>
        <Typography>
          Balance : {usdcBalance ? formatUnits(usdcBalance!, 6) : 0} {buyTokenSymbol}{' '}
        </Typography>
      </>
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
            placeholder={formatUnits(usdcBalance!, 6) ?? 0}
            onChange={e => setContributeAmount(e.target.value)}
          />
          <Button variant='contained' color='success' onClick={() => onClaim()} disabled={isPending || isConfirming}>
            {+formatUnits(allowance!, 6) > +contributeAmount ? 'Contribute' : 'Approve'}
          </Button>
        </Stack>
        <Typography>
          Balance : {formatUnits(usdcBalance!, 6) ?? 0} {buyTokenSymbol}{' '}
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
