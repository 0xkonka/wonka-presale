import React from 'react'
import { styled } from '@mui/material/styles'
import { Stack, Typography, TypographyProps } from '@mui/material'
import getTimePeriods from '@/@core/utils/getTimePeriods'
import { usePresale } from '@/context/PresaleContext'
import { LaunchpadStatus } from '..'

export interface LaunchpadTimeProps {
  presaleState: { status: LaunchpadStatus; secondsUntilStart: number; secondsUntilEnd: number }
}

const TimerSpan = styled(Typography)<TypographyProps>(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#000',
  fontSize: 20,
  borderRadius: 4,
  padding: 5,
  marginLeft: 5,
  marginRight: 5
}))

const LaunchpadTime: React.FC<LaunchpadTimeProps> = ({ presaleState }: LaunchpadTimeProps) => {
  const { status, secondsUntilStart, secondsUntilEnd } = presaleState
  const countdownToUse = status === 'upcoming' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)

  if (status === 'ended') {
    return (
      <Stack>
        <Typography>Auction has ended</Typography>
      </Stack>
    )
  }

  return (
    <Stack alignItems={'center'}>
      <Typography
        variant='h5'
        marginBottom={3}
        sx={{ fontFamily: `'Britanica-HeavySemiExpanded', sans-serif`, color: '#c4a72a' }}
      >
        {status === 'upcoming' ? '  Auction Starts in' : '  Auction Ends in'}
      </Typography>
      <Stack direction={'row'} alignItems={'center'}>
        {timeUntil.months > 0 ? (
          <>
            <TimerSpan>{timeUntil.months.toString().padStart(2, '0')}</TimerSpan>:
          </>
        ) : (
          <></>
        )}
        <TimerSpan>{timeUntil.days.toString().padStart(2, '0')}</TimerSpan>:
        <TimerSpan>{timeUntil.hours.toString().padStart(2, '0')}</TimerSpan>:
        <TimerSpan>{timeUntil.minutes.toString().padStart(2, '0')}</TimerSpan>:
        <TimerSpan>{timeUntil.seconds.toString().padStart(2, '0')}</TimerSpan>
      </Stack>
    </Stack>
  )
}

export default LaunchpadTime
