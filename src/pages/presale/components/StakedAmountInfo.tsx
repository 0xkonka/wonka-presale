/* eslint-disable react/jsx-key */
// MUI components import

import { usePresale } from '@/context/PresaleContext'
import { Typography, Stack, Theme, useTheme, useMediaQuery, Slider } from '@mui/material'
import { maxWidth } from '@mui/system'
import { formatUnits } from 'viem'

const StakedAmountInfo = () => {
  const theme: Theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { totalContributedPerChain } = usePresale()

  if (totalContributedPerChain.length === 0) return <div />

  return (
    <Stack direction='column' alignItems='center' sx={{ mb: { xs: 2, md: 8 } }}>
      <Typography
        variant='h1'
        sx={{
          mb: { xs: 2, md: 8 },
          fontSize: { xs: 15, md: 30, xl: 45 },
          fontWeight: 400,
          width: 730,
          maxWidth: '100%'
        }}
      >
        Staked Amount Per Chain
      </Typography>

      {totalContributedPerChain.map((id, index) => (
        <>
          <Typography
            key={index}
            variant={isSmallScreen ? 'subtitle1' : 'h5'}
            color='#F3F3F3'
            sx={{
              mb: { xs: 2, md: 4 },
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
        </>
      ))}
    </Stack>
  )
}

export default StakedAmountInfo
