import * as React from 'react'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { usePresale } from '@/context/PresaleContext'
import { formatUnits } from 'ethers/lib/utils'
import { Box, Card, CardContent, Grid, Slider, Stack } from '@mui/material'
import { useAccount } from 'wagmi'
import { PresaleConfig } from '@/types/presale'
import { hexToRGBA } from '@/@core/utils/hex-to-rgba'

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

interface Props {
  config: PresaleConfig
}

const Stastics: React.FC<Props> = ({ config }) => {
  const { address: account } = useAccount()
  const { totalContributedAmount, presaleLevel } = usePresale()

  const startTimeFormat = formatDateTime(Number(config?.startTime) * 1000)
  const endTimeFormat = formatDateTime(Number(config?.endTime) * 1000)

  if (!config) return <></>

  return (
    <Card sx={{ minWidth: 275, background: '#330246d4', borderRadius: '20px' }}>
      <CardContent>
        <Typography
          variant='h2'
          component='div'
          sx={{
            fontFamily: `'Britanica-HeavySemiExpanded', sans-serif`,
            color: '#c4a72a',
            textAlign: 'center',
            marginBottom: '20px'
          }}
        >
          $WONKA Bootstrap Auction
        </Typography>
        <Divider />
        <Typography sx={{ fontSize: 16, marginTop: '20px', marginBottom: '20px' }} color='text.primary' gutterBottom>
          $WONKA is the powerhouse of the Chocolate Factory's ecosystem with inbuilt deflationary flywheel tokenomics
          giving holders a direct share of the protocols growth through staking revenue & bonuses.
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
        {/*<Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Softcap</Typography>
          <Typography>${formatUnits(config.softcap, 6)}</Typography>
  </Stack>*/}
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Hardcap</Typography>
          <Typography>$10,000,000</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Min Buy</Typography>
          <Typography>$10</Typography>
        </Stack>
        {/*<Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Max Buy</Typography>
          <Typography>${formatUnits(config.maxContribution, 6)}</Typography>
  </Stack>*/}
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Total raised on current chain</Typography>
          <Typography>${formatUnits(totalContributedAmount, 6)}</Typography>
        </Stack>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 1.5 }}>Presale Level</Typography>
          <Typography>{presaleLevel + 1}/8</Typography>
        </Stack>
        <Divider />
      </CardContent>
    </Card>
  )
}

export default Stastics
