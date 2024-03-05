import * as React from 'react'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { usePresale } from '@/context/PresaleContext'
import { formatUnits } from 'ethers/lib/utils'
import { Box, Card, CardContent, Grid, Slider, Stack } from '@mui/material'
import { useAccount } from 'wagmi'

function formatDateTime(timestamp: number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const day = ('0' + date.getDate()).slice(-2)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const seconds = ('0' + date.getSeconds()).slice(-2)

  return `${day} ${month} ${year} , ${hours}:${minutes}:${seconds}`
}

const Stastics = () => {
  const { address: account } = useAccount()
  const { config, totalContributedAmount, presaleLevel } = usePresale()

  const startTimeFormat = formatDateTime(Number(config.startTime) * 1000)
  const endTimeFormat = formatDateTime(Number(config.endTime) * 1000)

  return (
    <Card sx={{ minWidth: 275, background: '#343e52' }}>
      <CardContent>
        <Typography variant='h3' component='div'>
          WONKA
        </Typography>
        <Divider />
        <Typography sx={{ fontSize: 16 }} color='text.primary' gutterBottom>
          WONKA is an innovative new gaming platform designed for gaming enthusiasts. From active betting to passive
          staking, there are rewards for all users.
        </Typography>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Launch Time</Typography>
          <Typography>{startTimeFormat}</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>End Time</Typography>
          <Typography>{endTimeFormat}</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Softcap</Typography>
          <Typography>{formatUnits(config.softcap, 6)} $</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Hardcap</Typography>
          <Typography>{formatUnits(config.hardcap, 6)}$</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Min Buy</Typography>
          <Typography>{formatUnits(config.minContribution, 6)}$</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Max Buy</Typography>
          <Typography>{formatUnits(config.maxContribution, 6)}$</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Total raised(% of target )</Typography>
          <Typography>{formatUnits(totalContributedAmount, 6)}$</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Presale Level</Typography>
          <Typography>{Number(presaleLevel)}</Typography>
        </Stack>
        <Divider />
      </CardContent>
    </Card>
  )
}

export default Stastics
