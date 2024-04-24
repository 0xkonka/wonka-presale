/* eslint-disable react/jsx-key */
// MUI components import

import { hexToRGBA } from '@/@core/utils/hex-to-rgba'
import { usePresale } from '@/context/PresaleContext'
import { Typography, Stack, Theme, useTheme, useMediaQuery, Slider, Card } from '@mui/material'
import { Box, maxWidth } from '@mui/system'
import { formatUnits } from 'viem'

const StakedAmountInfo = () => {
  const theme: Theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { totalContributedPerChain } = usePresale()

  if (totalContributedPerChain.length === 0) return <div />

  return (
    <Card sx={{ width: 'min-content', background: hexToRGBA('#343e52', 0.9) , opacity: '50', paddingX: 15, paddingY: 5 }}>
      <Stack direction='column' alignItems='center'>
        <Typography
          variant='h1'
          sx={{
            mb: { xs: 2, md: 8 },
            fontSize: { xs: 10, md: 20, xl: 30 },
            fontWeight: 400,
            width: 730,
            maxWidth: '100%'
          }}
        >
          Staked Amount Per Chain
        </Typography>

        {totalContributedPerChain.map((id, index) => (
          <Stack key={index} direction='column' alignItems='center'>
            <Typography
              variant={isSmallScreen ? 'subtitle1' : 'h5'}
              color='#c4a72a'
              sx={{
                mt: { xs: 2, md: 4 },
                width: 730,
                maxWidth: '100%'
              }}
            >
              {id.chainName}
            </Typography>
            Total Staked:
            <Slider
              sx={{ width: 730, maxWidth: '100%' }}
              aria-labelledby='continuous-slider'
              value={+formatUnits(id.totalContributed, 6)}
              min={0}
              max={+formatUnits(id.hardCap, 6)}
              valueLabelDisplay='on'
              marks={[
                { value: 0, label: '$0' },
                { value: +formatUnits(id.hardCap, 6), label: `$${+formatUnits(id.hardCap, 6)}` }
              ]}
            />
            Staked Per Tier:
            <Slider
              sx={{ width: 730, maxWidth: '100%' }}
              aria-labelledby='continuous-slider'
              value={+formatUnits(id.contributedPerLevel, 6)}
              min={0}
              max={+formatUnits(id.capPerLevel, 6)}
              valueLabelDisplay='on'
              marks={[
                { value: 0, label: '$0' },
                { value: +formatUnits(id.capPerLevel, 6), label: `$${+formatUnits(id.capPerLevel, 6)}` }
              ]}
            />
          </Stack>
        ))}
      </Stack>
    </Card>
  )
}

export default StakedAmountInfo
