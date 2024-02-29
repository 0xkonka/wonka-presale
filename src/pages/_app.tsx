import 'styles/style.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { app } from 'appConfig'
import { useState, useEffect } from 'react'
import HeadGlobal from 'components/HeadGlobal'
// Web3Wrapper deps:
import {
  connectorsForWallets,
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
  Theme,
  getDefaultWallets
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  injectedWallet,
  metaMaskWallet,
  braveWallet,
  coinbaseWallet,
  walletConnectWallet,
  ledgerWallet,
  rainbowWallet,
  argentWallet,
  trustWallet
} from '@rainbow-me/rainbowkit/wallets'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet, arbitrum, avalanche, bsc, base, goerli, sepolia } from 'wagmi/chains'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <HeadGlobal />
      <Web3Provider>
        <Component key={router.asPath} {...pageProps} />
      </Web3Provider>
    </ThemeProvider>
  )
}
export default App

// Web3 Configs
const projectId = 'e973a06523ca5ac45d042a4e0b9d73f7'
const { wallets } = getDefaultWallets()
const config = getDefaultConfig({
  appName: 'Tren Finance',
  projectId,
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet]
    }
  ],
  chains: [goerli],
  // ssr: true
})
const queryClient = new QueryClient()

// Web3Provider
export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} initialChain={5}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
