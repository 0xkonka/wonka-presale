// ** React Import
import { useRef, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Box, { BoxProps } from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { createTheme, responsiveFontSizes, styled, ThemeProvider } from '@mui/material/styles'
import ConnectWallet from 'src/pages/components/connect-wallet/ConnectWallet'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Theme Config
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import Drawer from './Drawer'
import VerticalNavItems from './VerticalNavItems'
import VerticalNavHeader from './VerticalNavHeader'

// ** Theme Options
import themeOptions from 'src/@core/theme/ThemeOptions'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { FooterProps } from 'src/@core/layouts/types'
import Footer from '../../shared-components/footer'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.text.secondary} !important`,
  '&:hover': {
    color: `${theme.palette.primary.main} !important`
  }
}))

interface Props {
  navWidth: string
  navVisible: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  children: LayoutProps['children']
  setNavVisible: (value: boolean) => void
  saveSettings: LayoutProps['saveSettings']
  navMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['content']
  navMenuBranding: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  verticalNavItems: LayoutProps['verticalLayoutProps']['navMenu']['navItems']
  navMenuProps: LayoutProps['verticalLayoutProps']['navMenu']['componentProps']
  menuUnlockedIcon: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
  afterNavMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['afterContent']
  beforeNavMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['beforeContent']
footerProps?: FooterProps
}

const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: 58,
  transition: 'opacity .15s ease-in-out',
  background: `linear-gradient(${theme.palette.background.paper} ${
    theme.direction === 'rtl' ? '95%' : '5%'
  },${hexToRGBA(theme.palette.background.paper, 0.85)} 30%,${hexToRGBA(
    theme.palette.background.paper,
    0.5
  )} 65%,${hexToRGBA(theme.palette.background.paper, 0.3)} 75%,transparent)`,
  '&.scrolled': {
    opacity: 1
  }
}))

const Navigation = (props: Props) => {
  // ** Props
  const {
    hidden,
    settings,
    afterNavMenuContent,
    beforeNavMenuContent,
    navigationBorderWidth,
    navMenuContent: userNavMenuContent,
    footerProps
  } = props

  // ** States
  const [navHover, setNavHover] = useState<boolean>(false)
  const [groupActive, setGroupActive] = useState<string[]>([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([])

  // ** Ref
  const shadowRef = useRef(null)

  // ** Var
  const { afterVerticalNavMenuContentPosition, beforeVerticalNavMenuContentPosition } = themeConfig

  const navMenuContentProps = {
    ...props,
    navHover,
    groupActive,
    setGroupActive,
    currentActiveGroup,
    setCurrentActiveGroup
  }

  // ** Create new theme for the navigation menu when mode is `semi-dark`
  let darkTheme = createTheme(themeOptions(settings, 'dark'))

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    darkTheme = responsiveFontSizes(darkTheme)
  }

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = (ref: HTMLElement) => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect

      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect()

        return { ...original, height: Math.floor(original.height) }
      }
    }
  }

  // ** Scroll Menu
  const scrollMenu = (container: any) => {
    if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
      container = hidden ? container.target : container
      if (shadowRef && container.scrollTop > 0) {
        // @ts-ignore
        if (!shadowRef.current.classList.contains('scrolled')) {
          // @ts-ignore
          shadowRef.current.classList.add('scrolled')
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove('scrolled')
      }
    }
  }

  const ScrollWrapper = hidden ? Box : PerfectScrollbar

  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer {...props} navHover={navHover} setNavHover={setNavHover} navigationBorderWidth={navigationBorderWidth}>
        {/* <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}> */}
        <Box sx={{height: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 5 }}>
          <Box>
            <VerticalNavHeader {...props} navHover={navHover} />
            {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'fixed'
              ? beforeNavMenuContent(navMenuContentProps)
              : null}
            {(beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) && (
              <StyledBoxForShadow ref={shadowRef} />
            )}
            <Box sx={{ position: 'relative', overflow: 'hidden' }} >
              {/* @ts-ignore */}
              <ScrollWrapper
                {...(hidden
                  ? {
                      onScroll: (container: any) => scrollMenu(container),
                      sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' }
                    }
                  : {
                      options: { wheelPropagation: false },
                      onScrollY: (container: any) => scrollMenu(container),
                      containerRef: (ref: any) => handleInfiniteScroll(ref)
                    })}
              >
                {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'static'
                  ? beforeNavMenuContent(navMenuContentProps)
                  : null}
                {userNavMenuContent ? (
                  userNavMenuContent(navMenuContentProps)
                ) : (
                  <List className='nav-items'>
                    <VerticalNavItems
                      navHover={navHover}
                      groupActive={groupActive}
                      setGroupActive={setGroupActive}
                      currentActiveGroup={currentActiveGroup}
                      setCurrentActiveGroup={setCurrentActiveGroup}
                      {...props}
                    />
                  </List>
                )}
                {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'static'
                  ? afterNavMenuContent(navMenuContentProps)
                  : null}
                  
                <Box sx={{pt: 8, px: 5}}>
                  <ConnectWallet />
                </Box>
              </ScrollWrapper>
            </Box>
            {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'fixed'
              ? afterNavMenuContent(navMenuContentProps)
              : null}
          </Box>
          <Box sx={{px: 2}}>
            <Footer {...props} footerStyles={footerProps?.sx} footerContent={footerProps?.content} />
          </Box>
        </Box>
      </Drawer>
    </ThemeProvider>
  )
}

export default Navigation
