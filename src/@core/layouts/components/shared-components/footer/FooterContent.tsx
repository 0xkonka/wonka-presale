// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Theme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button, { ButtonProps } from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'

import Image from 'next/image'

const StyledCompanyName = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.text.secondary} !important`,
  '&:hover': {
    color: `${theme.palette.primary.main} !important`
  }
}))

const SquareSocialButton = styled(Button)<ButtonProps>(() => ({
  padding: 4,
  marginLeft: 8,
  marginRight: 8,
  minWidth: 34,
  minHeight: 34,
  border: 'solid 1px #53545F',
  borderRadius: 10
}))

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 7.5
        }}
      >
        {/* <Box sx={{display: 'flex'}}>
          <Typography variant='subtitle1' component={LinkStyled}  target='_blank' href='https://policy.com'>
            Privacy Policy
          </Typography>
          <Typography variant='subtitle1' sx={{px: 4}}>/</Typography>
          <Typography variant='subtitle1' component={LinkStyled}  target='_blank' href='https://terms.com'>
            Terms of Use
          </Typography>
        </Box> */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Typography variant='subtitle1' component={LinkStyled} target='_blank' href='https://discord.gg/wVg25dCJ7z'>
            Discord
          </Typography>
          <Typography variant='subtitle1' sx={{ px: 4 }}>
            /
          </Typography>
          <Typography variant='subtitle1' component={LinkStyled} target='_blank' href='https://twitter.com/WonkasMeme'>
            Twitter
          </Typography>
          {/* <Typography variant='subtitle1' sx={{px: 4}}>/</Typography>
          <Typography variant='subtitle1' component={LinkStyled}  target='_blank' href='https://instagram.com'>
            Instagram
          </Typography> */}
          <Typography variant='subtitle1' sx={{ px: 4 }}>
            /
          </Typography>
          <Typography variant='subtitle1' component={LinkStyled} target='_blank' href='https://t.me/Wonkas_Portal'>
            Telegram
          </Typography>
          <Typography variant='subtitle1' sx={{ px: 4 }}>
            /
          </Typography>
          <Typography
            variant='subtitle1'
            component={LinkStyled}
            target='_blank'
            href='https://docs.chocolatefactory.gg/'
          >
            Docs
          </Typography>
        </Box>
      </Box>
      <Stack sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <Stack direction='row' sx={{ justifyContent: 'center', alignItems: 'center', gap: 6 }}>
          <Link href='https://discord.gg/wVg25dCJ7z' target='_blank'>
            <svg width='26' height='26' viewBox='0 0 25 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M20.801 1.95544C19.2297 1.2361 17.571 0.725773 15.8672 0.4375C15.634 0.8543 15.4231 1.28313 15.2352 1.7222C13.4203 1.44871 11.5746 1.44871 9.75969 1.7222C9.5717 1.28318 9.36074 0.854351 9.12769 0.4375C7.42275 0.728207 5.76294 1.23974 4.19015 1.9592C1.06774 6.57886 0.221305 11.0838 0.644523 15.5247C2.47308 16.8758 4.51976 17.9032 6.69559 18.5625C7.18553 17.9036 7.61906 17.2045 7.99158 16.4727C7.28402 16.2085 6.60111 15.8824 5.95073 15.4984C6.1219 15.3743 6.28931 15.2464 6.45107 15.1222C8.34351 16.0122 10.409 16.4736 12.5003 16.4736C14.5915 16.4736 16.657 16.0122 18.5494 15.1222C18.7131 15.2558 18.8805 15.3837 19.0498 15.4984C18.3982 15.8831 17.714 16.2097 17.0052 16.4746C17.3772 17.206 17.8108 17.9045 18.3012 18.5625C20.4789 17.9059 22.5271 16.8789 24.356 15.5266C24.8526 10.3765 23.5077 5.913 20.801 1.95544ZM8.52766 12.7936C7.34829 12.7936 6.37395 11.7233 6.37395 10.4066C6.37395 9.08995 7.31443 8.01027 8.5239 8.01027C9.73336 8.01027 10.7002 9.08995 10.6795 10.4066C10.6588 11.7233 9.7296 12.7936 8.52766 12.7936ZM16.4729 12.7936C15.2916 12.7936 14.321 11.7233 14.321 10.4066C14.321 9.08995 15.2615 8.01027 16.4729 8.01027C17.6842 8.01027 18.6435 9.08995 18.6228 10.4066C18.6021 11.7233 17.6748 12.7936 16.4729 12.7936Z'
                fill='#C6C6C7'
              />
            </svg>
          </Link>
          <Link href='https://twitter.com/WonkasMeme' target='_blank'>
            <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M20.9519 8.92046C20.9641 9.09676 20.9641 9.27306 20.9641 9.45099C20.9641 14.8725 16.8369 21.1251 9.29002 21.1251V21.1218C7.06066 21.1251 4.87761 20.4865 3.00085 19.2824C3.32502 19.3214 3.65081 19.3409 3.97742 19.3417C5.82493 19.3434 7.61963 18.7235 9.0731 17.582C7.3174 17.5487 5.7778 16.4039 5.23996 14.7327C5.85499 14.8513 6.4887 14.827 7.09235 14.662C5.17822 14.2753 3.80112 12.5935 3.80112 10.6404C3.80112 10.6225 3.80112 10.6055 3.80112 10.5884C4.37146 10.9061 5.01004 11.0824 5.66325 11.1019C3.86043 9.89702 3.30471 7.49867 4.39339 5.62354C6.47651 8.18682 9.55 9.74509 12.8494 9.91002C12.5187 8.48498 12.9704 6.9917 14.0363 5.98995C15.6889 4.43655 18.2879 4.51617 19.8413 6.16788C20.7602 5.9867 21.6409 5.64954 22.4468 5.17182C22.1405 6.12157 21.4995 6.92833 20.6432 7.44099C21.4564 7.34512 22.251 7.12738 22.9993 6.79509C22.4484 7.62054 21.7546 8.33956 20.9519 8.92046Z'
                fill='#C6C6C7'
              />
            </svg>
          </Link>
          <Link href='https://t.me/Wonkas_Portal' target='_blank'>
            <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.5518 16.0161L10.1754 21.3091C10.7139 21.3091 10.9471 21.0779 11.2267 20.8001L13.751 18.3877L18.9817 22.2182C19.941 22.7528 20.6168 22.4713 20.8756 21.3357L24.309 5.24799L24.3099 5.24704C24.6142 3.82899 23.7971 3.27447 22.8625 3.62235L2.68116 11.3487C1.30382 11.8833 1.32468 12.6511 2.44702 12.9989L7.60657 14.6037L19.5912 7.10492C20.1552 6.73145 20.668 6.93809 20.2462 7.31156L10.5518 16.0161Z'
                fill='#C6C6C7'
              />
            </svg>
          </Link>
        </Stack>
        <Stack direction='row' sx={{ py: 6, mx: 2.5, justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Typography variant='body2' component={LinkStyled} target='_blank' href='https://docs.chocolatefactory.gg/'>
            Docs
          </Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'end' },
          borderTop: 'solid 1px #414141',
          pt: 7.5
        }}
      >
        <Typography
          variant='subtitle2'
          sx={{ display: 'flex', alignItems: 'center', fontWeight: 400, color: 'text.secondary' }}
        >
          The Chocolate Factory
          <Typography sx={{ ml: 2, color: '#fff' }}>{`© ${new Date().getFullYear()} All Right Reserved `}</Typography>
        </Typography>
      </Box>
    </Box>
  )
}

export default FooterContent
