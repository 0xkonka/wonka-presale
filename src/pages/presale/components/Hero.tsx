// MUI components import
import { Box, Typography, Stack, Theme, useTheme, useMediaQuery } from '@mui/material'

const Hero = () => {
  const theme: Theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const textStyle = {
    background: 'linear-gradient(180deg, #B7BCBC 0%, #FFF 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }

  return (
    <Stack direction='column' alignItems='center'>
      <Typography
        variant='h1'
        sx={{
          mb: { xs: 2, md: 8 },
          mt: 8,
          fontSize: { xs: 36, md: 64, xl: 72 },
          fontWeight: 400,
          fontFamily: `'Britanica-HeavySemiExpanded', sans-serif`
        }}
        style={textStyle}
      >
        STAKE, PLAY & GET REWARDS
      </Typography>
      <Typography
        variant={isSmallScreen ? 'subtitle1' : 'h5'}
        color='#F3F3F3'
        sx={{ mb: { xs: 8, md: 16 }, fontWeight: 300, width: 730, maxWidth: '100%', lineHeight: { xs: 1.25, sm: 1.7 } }}
      >
        WONKA is an innovative new gaming platform designed for gaming enthusiasts. From active betting to passive
        staking, there are rewards for all users.
      </Typography>
    </Stack>
  )
}

export default Hero
