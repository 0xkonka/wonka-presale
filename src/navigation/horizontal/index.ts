// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: 'Presale',
      icon: 'presale',
      path: '/presale'
    },
    {
      title: 'Bridge',
      icon: 'bridge',
      path: 'https://vinium-bridge.vercel.app/',
      externalLink: true,
      openInNewTab: true
    }
    // {
    //   title: 'Analytics',
    //   icon: 'analytics',
    //   children: [
    //     {
    //       title: 'Analytics 1',
    //       path: '/analytics/analytics-1'
    //     },
    //   ]
    // },
  ]
}

export default navigation
