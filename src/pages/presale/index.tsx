import { useRouter } from 'next/router'

import { Typography, Box, Stack, useTheme, Theme, useMediaQuery, Grid, Card, CardContent } from '@mui/material'

// Import Basic React
import React, { useEffect, useState } from 'react'

// Import Subviews
import Hero from '@/pages/presale/components/Hero'
import { useAccount } from 'wagmi'
import LaunchpadTime from './components/LaunchpadTime'
import { usePresale } from '@/context/PresaleContext'
import { formatUnits } from 'viem'
import LaunchpadAction from './components/LaunchpadAction'
import Stastics from './components/Stastics'
import UserStatus from './components/UserStatus'
import PresaleTable from './components/PresaleTable'
import StakedAmountInfo from './components/StakedAmountInfo'
import { hexToRGBA } from '@/@core/utils/hex-to-rgba'

export type LaunchpadStatus = 'upcoming' | 'live' | 'ended' //'upcoming' | 'live' | 'filled' | 'ended' | 'claimable'

const Presale = () => {
  const { address: account } = useAccount()
  const { config, totalContributedAmount, presaleLevel, presaleStatus } = usePresale()

  const contributedPercent = ((Number(totalContributedAmount) / Number(config?.hardcap)) * 100).toFixed(4)

  const [presaleState, setPresaleState] = React.useState({
    status: 'upcoming' as LaunchpadStatus,
    secondsUntilStart: 0,
    secondsUntilEnd: 0
  })

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentTime = Math.floor(Date.now() / 1000)
      const secondsUntilStart = Number(config?.startTime) - currentTime
      const secondsUntilEnd = Number(config?.endTime) - currentTime

      let status: LaunchpadStatus

      if (presaleStatus === 0) {
        if (secondsUntilStart > 0) status = 'upcoming'
        else status = 'live'
      } else status = 'ended'
      setPresaleState({
        status,
        secondsUntilStart,
        secondsUntilEnd
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [config, presaleStatus])

  if (!config) return <></>

  return (
    <Box>
      <Hero />

      <Stack direction='column' alignItems='center'>
        <Grid container spacing={10} maxWidth={1200}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <StakedAmountInfo />
          </Grid>
          <Grid item xs={12} md={7}>
            <Stastics config={config} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ minWidth: 275, background: hexToRGBA('#343e52', 0.9), marginBottom: 8 }}>
              <CardContent>
                <Stack direction={'column'} gap={2}>
                  <LaunchpadTime presaleState={presaleState} />
                  {/* Contribute Progress bar */}
                  <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                    <Typography variant='subtitle2'>Contributed</Typography>
                    <Typography variant='subtitle2'> {contributedPercent} %</Typography>
                  </Stack>
                  <Box className='gradientProgress'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      style={{ marginLeft: `${contributedPercent}%` }}
                    >
                      <path
                        d='M13.7302 5.07458C13.6912 4.98206 13.6006 4.92188 13.5 4.92188L2.50002 4.922C2.39956 4.922 2.30886 4.98218 2.26968 5.07471C2.23061 5.16724 2.25076 5.27429 2.32082 5.34631L7.82082 11.0032C7.86782 11.0515 7.93252 11.0789 8.00002 11.0789C8.06753 11.0789 8.13223 11.0515 8.17922 11.0032L13.6792 5.34619C13.7493 5.27405 13.7693 5.16711 13.7302 5.07458Z'
                        fill='white'
                      />
                    </svg>
                    <Box
                      sx={{
                        width: '100%',
                        height: 12,
                        mb: 2,
                        borderRadius: 8,
                        background: 'linear-gradient(90deg, #00D084 0%, #0004ff 100.77%)'
                      }}
                    />
                  </Box>
                  <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                    <Typography variant='subtitle2'>{formatUnits(totalContributedAmount, 6)}$</Typography>
                    <Typography variant='subtitle2'>{formatUnits(config.hardcap, 6)}$</Typography>
                  </Stack>

                  {account && <LaunchpadAction config={config} presaleState={presaleState} />}
                </Stack>
              </CardContent>
            </Card>
            <UserStatus config={config} />
          </Grid>
          <Grid item xs={12} md={12}>
            <PresaleTable config={config} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}

export default Presale
