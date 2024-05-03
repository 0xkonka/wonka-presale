import React, { CSSProperties, useEffect, useMemo, useState } from 'react'
import { type BaseError, useAccount, useChainId, useReadContract } from 'wagmi'
import { erc20Abi, formatUnits, parseUnits } from 'viem'
import { Button, InputAdornment, Stack, Typography } from '@mui/material'
import ReactCodeInput from 'react-code-input'
import { usePresale } from '@/context/PresaleContext'
import { LaunchpadStatus } from '..'
import CustomTextField from '@/@core/components/mui/text-field'
import { PRESALE_ADDRESS, USDC_ADDRESS } from '@/configs/address'
import usePresaleContract from '@/hooks/usePresaleContract'
import { PresaleConfig } from '@/types/presale'
import toast from 'react-hot-toast'
import { showToast } from '@/hooks/toasts'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const { ref } = router.query

  const { status } = presaleState
  const buyTokenSymbol = 'USDC'

  const { address: account } = useAccount()
  const chainId = useChainId()
  const { totalContributedAmount, userInfo } = usePresale()
  const { minContribution: minPerTx } = config
  const { contributedAmount: userContributedAmount } = userInfo || {}

  const { onApprove, onContribute, onClaim, isPending, isConfirming, isConfirmed, error } = usePresaleContract()
  const { refresh } = usePresale()

  const [code, setCode] = useState<string>((ref as string) || '')
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

  const inputStyle: CSSProperties = {
    height: 40,
    width: '17%',
    borderRadius: '6px',
    padding: 3,
    marginRight: 5,
    background: 'transparent',
    color: '#fff',
    border: '1px solid #b79e30',
    fontSize: 40,
    textTransform: 'uppercase',
    textAlign: 'center'
  }

  if (!userInfo) return <></>

  let dec = 18
  if (chainId == 56) {
    dec = 18
  } else {
    dec = 6
  }

  if (status === 'upcoming') {
    return (
      <Typography>
        Balance : {usdcBalance ? formatUnits(usdcBalance!, dec) : 0} {buyTokenSymbol}{' '}
      </Typography>
    )
  }

  if (status === 'live') {
    return (
      <>
        <Typography sx={{ marginTop: '20px' }}>Referral code: </Typography>
        <Stack direction='row' justifyContent='center'>
          <ReactCodeInput
            name='pinCode'
            type='text'
            placeholder=''
            fields={5}
            onChange={setCode}
            value={code}
            inputMode='verbatim'
            inputStyle={inputStyle}
            autoFocus={true}
            pattern='0-9'
          />
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ marginTop: '20px' }}>
          {/* <Button
            className='gradient-stroke-button'
            onClick={() => enterCode()}
            sx={{
              py: { xs: 2, md: 3 },
              px: 10,
              fontSize: { xs: 14, lg: 20 },
              borderRadius: '10px',
              // color: {xs: '#FFF', md: '#67DAB1'}
              color: '#020101',
              background: '#67DAB1'
            }}
            variant='contained'
          >
            Redeem Code
          </Button> */}

          <CustomTextField
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button sx={{ color: '#b79e30' }} onClick={() => setContributeAmount(formatUnits(usdcBalance!, dec))}>
                    MAX
                  </Button>
                </InputAdornment>
              )
            }}
            value={contributeAmount}
            type='number'
            placeholder={usdcBalance ? parseFloat(formatUnits(usdcBalance, dec)).toFixed(2) : '0'}
            onChange={e => setContributeAmount(e.target.value)}
          />
          {(allowance ? +formatUnits(allowance, dec) : 0) >= +contributeAmount ? (
            <Button
              variant='contained'
              color='primary'
              onClick={() => onContribute(contributeAmount, code)}
              disabled={isPending || isConfirming}
              sx={{ background: '#b79e30' }}
            >
              Woomp In
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={() => onApprove(contributeAmount)}
              disabled={isPending || isConfirming}
            >
              Approve
            </Button>
          )}
        </Stack>
        <Typography>
          Balance : {usdcBalance ? parseFloat(formatUnits(usdcBalance, dec)).toFixed(2) : 0} {buyTokenSymbol}{' '}
        </Typography>
        <Typography sx={{ marginTop: '10px' }}>
          Need USDC on this chain? Swap any token to USDC from any chain using{' '}
          <a href='https://bridge.chocolatefactory.gg' target='_blank' style={{ color: '#fff' }}>
            Jumper
          </a>{' '}
          in 1 click
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
          Balance : {usdcBalance ? parseFloat(formatUnits(usdcBalance, dec)).toFixed(2) : 0} {buyTokenSymbol}{' '}
        </Typography>
      </>
    )
  }

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>Auction is finished</Typography>
        <Button variant='contained' color='success' onClick={() => onClaim()} disabled={isPending || isConfirming}>
          Claim
        </Button>
      </Stack>
      <Typography>
        Balance : {formatUnits(usdcBalance!, dec) ?? 0} {buyTokenSymbol}{' '}
      </Typography>
    </>
  )
}

export default LaunchpadAction
