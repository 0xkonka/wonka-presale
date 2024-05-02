import { useGlobalValues } from '@/context/GlobalContext'
import { Box, Typography, Stack, Button } from '@mui/material'
import ReactInputVerificationCode from 'react-input-verification-code'
import { useEffect, useState } from 'react'
import { showToast } from '@/hooks/toasts'

const Home = () => {
  const [verificationCode, setVerificationCode] = useState('')

  const gradientBgStyle = {
    background: 'linear-gradient(90deg, rgba(52, 97, 81, 0.60) 6.56%, rgba(81, 150, 125, 0.00) 88.13%)'
    // WebkitBackdropFilter: 'blur(1.244215965270996px)', // for Safari
    // backdropFilter: 'blur(1.244215965270996px)' // standard property, may not work as inline-style
  }
  const mobileGradientBgStyle = {
    background:
      'linear-gradient(90deg, rgba(52, 97, 81, 0.00) 9.95%, rgba(52, 97, 81, 0.60) 49.05%, rgba(81, 150, 125, 0.00) 88.78%)'
    // WebkitBackdropFilter: 'blur(1.244215965270996px)', // for Safari
    // backdropFilter: 'blur(1.244215965270996px)' // standard property, may not work as inline-style
  }
  const lightPrimaryBlendingStyle = {
    borderRadius: '2010px',
    background: '#67DAB1',
    filter: 'blur(400px)',
    width: '100%',
    height: 132,
    bottom: 0,
    zIndex: 1
  }

  const enterCode = () => {
    if (/_/.test(verificationCode) == false) {
      showToast('success', 'Verfication Code', verificationCode, 3000)
    } else {
      showToast('error', 'Error', 'Invalid verification code', 3000)
    }
  }

  return (
    <Box>
      <Box className='content' zIndex={10} position='relative'>
        <Stack direction={'column'} gap={8} sx={{ mt: { xs: 20, md: 32 } }}>
          <Stack
            sx={{
              flex: { xs: 1, lg: 1 },
              border: 'solid 1px #67DAB1',
              px: 10,
              py: 6,
              alignItems: { xs: 'center', lg: 'start' },
              minWidth: { xs: '100%', md: 465 }
            }}
          >
            <Typography
              className='header-gradient'
              variant='h1'
              sx={{
                mb: { xs: 4, md: 4 },
                lineHeight: 1,
                fontSize: { xs: 18, md: 28, xl: 40 }
              }}
            >
              Early Access
            </Typography>
            <Typography sx={{ fontSize: { xs: 12, lg: 20 }, mb: 4 }}>Enter your Invite Code</Typography>
            <Stack
              direction='row'
              justifyContent='center'
              className='tren-verification-box'
              mb={8}
              sx={{ width: 1, maxWidth: 384 }}
            >
              <ReactInputVerificationCode
                autoFocus
                placeholder='_'
                value={verificationCode}
                onChange={setVerificationCode}
                length={5}
                type='text'
              />
            </Stack>
            <Button
              className='gradient-stroke-button'
              onClick={enterCode}
              sx={{
                py: { xs: 2, md: 3 },
                px: 10,
                fontSize: { xs: 14, lg: 20 },
                borderRadius: '10px',
                color: { xs: '#FFF', md: '#67DAB1' }
              }}
              variant='outlined'
            >
              Enter the Code
            </Button>
          </Stack>
          <Stack
            sx={{
              flex: { xs: 1, lg: 2.5 },
              border: 'solid 1px #67DAB1',
              px: { xs: 4.5, lg: 10 },
              py: 6,
              alignItems: { xs: 'center', lg: 'start' }
            }}
          >
            <Typography
              className='header-gradient'
              variant='h1'
              sx={{
                mb: { xs: 10, md: 14 },
                lineHeight: 1,
                fontSize: { xs: 18, md: 28, xl: 40 }
              }}
            >
              Backed by
            </Typography>
            <Stack direction={'column'} justifyContent='space-between' gap={9} width='100%' flexWrap='wrap'>
              <Stack sx={{ gap: { xs: 6, md: 12 } }}>
                <Stack direction='row' justifyContent={'center'} alignItems='center' gap={5}>
                  <Box sx={{ height: { xs: 20, md: 36 } }}>
                    <img src='/images/logos/dragonfly.png' alt='Dragonfly' height='100%' />
                  </Box>
                  <Stack direction='row' alignItems='center' gap={3.5}>
                    <Stack sx={{ width: { xs: 24, md: 32 } }}>
                      <img src='/images/avatars/arthur-hayes.png' alt='Arthur Hayes' width='100%' />
                    </Stack>
                    <Typography sx={{ fontSize: { xs: 16, lg: 28 } }}>Arthur Hayes</Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction='row'
                  sx={{
                    gap: { xs: 4, md: 7.5 },
                    justifyContent: { xs: 'center', lg: 'flex-start', xl: 'space-between' }
                  }}
                >
                  <Box sx={{ height: { xs: 18, md: 26 } }}>
                    <img src='/images/logos/binance-labs.svg' alt='Binance Labs' height='100%' />
                  </Box>
                  <Box sx={{ height: { xs: 18, md: 26 } }}>
                    <img src='/images/logos/ventures.svg' alt='Ventures' height='100%' />
                  </Box>
                  <Box sx={{ height: { xs: 18, md: 26 } }}>
                    <img src='/images/logos/bybit.svg' alt='Bybit' height='100%' />
                  </Box>
                  <Box sx={{ height: { xs: 18, md: 26 } }}>
                    <img src='/images/logos/deribit.png' alt='Deribit' height='100%' />
                  </Box>
                  <Box sx={{ height: { xs: 18, md: 26 } }}>
                    <img src='/images/logos/mirana.png' alt='Mirana' height='100%' />
                  </Box>
                </Stack>
              </Stack>
              <Stack
                direction='row'
                sx={{
                  gap: { xs: 1, md: 4 },
                  justifyContent: { xs: 'space-between', sm: 'center', lg: 'flex-start', xl: 'flex-end' }
                }}
              >
                <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                  <Box sx={{ width: { xs: 42, md: 50 } }}>
                    <img src='/images/avatars/synthetics.png' alt='Synthetics' width='100%' />
                  </Box>
                  <Typography sx={{ fontSize: { xs: 12, md: 14 }, mt: { xs: 0, md: 3 } }}>SYNTHETICS</Typography>
                  <Typography sx={{ fontSize: { xs: 10, md: 14 } }} color='primary'>
                    @kayinne
                  </Typography>
                </Stack>
                <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                  <Box sx={{ width: { xs: 42, md: 50 } }}>
                    <img src='/images/avatars/aave.png' alt='Aave' width='100%' />
                  </Box>
                  <Typography sx={{ fontSize: { xs: 12, md: 14 }, mt: { xs: 0, md: 3 } }} mt={3}>
                    AAVE
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 10, md: 14 } }} color='primary'>
                    @Stanikulechov
                  </Typography>
                </Stack>
                <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                  <Box sx={{ width: { xs: 42, md: 50 } }}>
                    <img src='/images/avatars/curve.png' alt='Curve' width='100%' />
                  </Box>
                  <Typography sx={{ fontSize: { xs: 12, md: 14 }, mt: { xs: 0, md: 3 } }} mt={3}>
                    CURVE
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 10, md: 14 } }} color='primary'>
                    @newmilwich
                  </Typography>
                </Stack>
                <Stack direction='column' justifyContent='center' alignItems='center' gap={1}>
                  <Box sx={{ width: { xs: 42, md: 50 } }}>
                    <img src='/images/avatars/frax.png' alt='Frax' width='100%' />
                  </Box>
                  <Typography sx={{ fontSize: { xs: 12, md: 14 }, mt: { xs: 0, md: 3 } }} mt={3}>
                    FRAX
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 10, md: 14 } }} color='primary'>
                    @samkazemian
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default Home
