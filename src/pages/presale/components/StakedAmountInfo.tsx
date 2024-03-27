/* eslint-disable react/jsx-key */
// MUI components import
import { usePresale } from '@/context/PresaleContext'
import { Typography, Stack, Theme, useTheme, useMediaQuery } from '@mui/material'
import { formatUnits } from 'viem'

const StakedAmountInfo = () => {
  const theme: Theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { totalContributedPerChain } = usePresale()

  if (totalContributedPerChain.length === 0) return <div />

  return (
    <Stack direction='column' alignItems='center'>
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
        <Typography
          key={index}
          variant={isSmallScreen ? 'subtitle1' : 'h5'}
          color='#F3F3F3'
          sx={{
            mb: { xs: 2, md: 4 },
            fontWeight: 300,
            width: 730,
            maxWidth: '100%',
            lineHeight: { xs: 1.25, sm: 1.7 }
          }}
        >
          {id.chainName} : ${formatUnits(id.totalContributed, 6)}
        </Typography>
      ))}
    </Stack>
  )
}

export default StakedAmountInfo
