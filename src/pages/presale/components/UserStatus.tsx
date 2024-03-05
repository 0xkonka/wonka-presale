import * as React from 'react'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { usePresale } from '@/context/PresaleContext'
import { Card, CardContent, Grid, Slider, Stack } from '@mui/material'
import { formatEther, formatUnits } from 'viem'

const UserStatus = () => {
  const { userInfo } = usePresale()

  const { contributedAmount, claimableAmount, status } = userInfo || {}

  return (
    <Card sx={{ minWidth: 275, background: '#343e52' }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          User Status
        </Typography>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Status</Typography>
          <Typography>{status === 2 ? 'Claimed' : status === 1 ? 'Invested' : 'None'}</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Contributed Amount</Typography>
          <Typography>{contributedAmount ? (+formatUnits(contributedAmount!, 6)).toFixed(2) : 0} $</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Claimable Amount</Typography>
          <Typography>{claimableAmount ? (+formatEther(claimableAmount!)).toFixed(2) : 0} Wonka</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default UserStatus
