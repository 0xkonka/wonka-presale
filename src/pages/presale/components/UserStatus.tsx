import * as React from 'react'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { usePresale } from '@/context/PresaleContext'
import { Card, CardContent, Grid, Slider, Stack } from '@mui/material'
import { formatEther, formatUnits } from 'viem'
import { PresaleConfig } from '@/types/presale'
import { hexToRGBA } from '@/@core/utils/hex-to-rgba'

interface Props {
  config: PresaleConfig
}

const UserStatus = ({ config }: Props) => {
  const { userInfo } = usePresale()

  const { contributedAmount, claimableAmount, pendingReward, status } = userInfo || {}

  return (
    <Card sx={{ minWidth: 275, background: hexToRGBA('#343e52', 0.9) }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          User Status
        </Typography>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Status</Typography>
          <Typography>{status ? 'Claimed' : Number(contributedAmount) > 0 ? 'Invested' : 'None'}</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Contributed Amount</Typography>
          <Typography>{contributedAmount ? (+formatUnits(contributedAmount, 6)).toFixed(2) : 0} $</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Claimable Amount</Typography>
          <Typography>{claimableAmount ? (+formatEther(claimableAmount)).toFixed(2) : 0} Wonka</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Reward Amount</Typography>
          <Typography>{pendingReward ? (formatEther(pendingReward)) : 0} Wonka</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default UserStatus
//  000 085 388 876 468 683