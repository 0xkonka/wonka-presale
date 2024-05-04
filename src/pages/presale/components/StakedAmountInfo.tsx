/* eslint-disable react/jsx-key */
// MUI components import

import { hexToRGBA } from '@/@core/utils/hex-to-rgba'
import { usePresale } from '@/context/PresaleContext'
import { Typography, Stack, Theme, useTheme, useMediaQuery, Slider, Card } from '@mui/material'
import { Box, maxWidth } from '@mui/system'
import { formatUnits } from 'viem'
import Divider from '@mui/material/Divider'
import { useChainId } from 'wagmi'

const StakedAmountInfo = () => {
  const theme: Theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { totalContributedPerChain } = usePresale()
  const chainId = useChainId()
  let dec = 18
  if (chainId == 56) {
    dec = 18
  } else {
    dec = 6
  }

  if (totalContributedPerChain.length === 0) return <div />

  return (
    <Card sx={{ width: 'min-content', background: '#330246d4', borderRadius: '20px', paddingX: 15, paddingY: 5 }}>
      <Stack direction='column' alignItems='center'>
        <Typography
          variant='h1'
          color='#c4a72a'
          sx={{
            mb: { xs: 5, md: 8 },
            fontSize: { xs: 20, md: 20, xl: 30 },
            fontWeight: 400,
            width: 730,
            maxWidth: '100%',
            textAlign: 'center',
            fontFamily: `'Britanica-HeavySemiExpanded', sans-serif`
          }}
        >
          Auction Chain Race
        </Typography>

        {totalContributedPerChain.map((id, index) => (
          <Stack key={index} direction='column' alignItems='center' sx={{ paddingBottom: '30px' }}>
            <Typography
              variant={isSmallScreen ? 'subtitle1' : 'h3'}
              color='#c4a72a'
              sx={{
                mt: { xs: 2, md: 4 },
                width: 730,
                maxWidth: '100%',
                fontFamily: `'Britanica-HeavySemiExpanded', sans-serif`,
                textAlign: 'center'
              }}
            >
              {id.chainName}
            </Typography>
            Total Amount:
            <Slider
              sx={{ width: { xs: '50%', xl: '730px' }, maxWidth: '100%', color: '#c4a72a' }}
              aria-labelledby='continuous-slider'
              value={+parseFloat(formatUnits(id.totalContributed, id.chainDec)).toFixed(2)}
              min={0}
              max={2000000}
              valueLabelDisplay='on'
              marks={[
                { value: 0, label: '$0' },
                { value: 2000000, label: `$2000000` }
              ]}
            />
            Current Tier Progress:
            <Slider
              sx={{ width: { xs: '50%', xl: '730px' }, maxWidth: '100%', color: '#c4a72a' }}
              aria-labelledby='continuous-slider'
              value={+parseFloat(formatUnits(id.contributedPerLevel, id.chainDec)).toFixed(2)}
              min={0}
              max={+parseFloat(formatUnits(id.capPerLevel, id.chainDec)).toFixed(2)}
              valueLabelDisplay='on'
              marks={[
                { value: 0, label: '$0' },
                {
                  value: +parseFloat(formatUnits(id.capPerLevel, id.chainDec)).toFixed(2),
                  label: `$${+parseFloat(formatUnits(id.capPerLevel, id.chainDec)).toFixed(2)}`
                }
              ]}
            />
          </Stack>
        ))}
      </Stack>
    </Card>
  )
}

export default StakedAmountInfo
