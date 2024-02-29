import styles from 'styles/Home.module.scss'
import { ThemeToggleButton, ThemeToggleList } from 'components/Theme'
import { useEffect, useState } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance, useContractWrite } from 'wagmi'
import ConnectWallet from 'components/Connect/ConnectWallet'
import Image from 'next/image'
import PresaleProgress from 'components/Presale/Progress';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
    </div>
  )
}

function Header() {
  return (
    <header className={styles.header}>
      <div />
      <div />
      <div className="flex align-middle">
        <ThemeToggleButton />
        <div className="flex w-full flex-col items-center">
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}

function Main() {
  const { address, isConnected, connector } = useAccount()
  // const { chain, chains } = useNetwork()
  // const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  
  // const CurrentChainInfo = chain && SUPPORTED_CHAINS.find(chainInfo => chainInfo.id === chain?.id)

  // const availableTokens: Token[] | undefined = CurrentChainInfo?.availableTokens!

  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: CurrentChainInfo.crossChainBridge as never,
  //   abi: CrossChainBridge,
  //   functionName: 'feed',
  // })

  // const [token, setToken] = useState<Token | undefined>(availableTokens ? availableTokens[0] : undefined)
  // const [amount, setAmount] = useState('0')
  // const [receiverAddr, setReceiverAddr] = useState<`0x${string}`>()

  // useEffect(() => {
  //   if (availableTokens && availableTokens?.length > 0) setToken(availableTokens[0])
  // }, [availableTokens])

  // const hanldeSelectToken = (token: Token) => {
  //   setToken(token)
  // }

  const handleTransfer = () => { }

  return (
    <main className={styles.main + ' space-y-6'}>
      <div className="flex w-full flex-col items-center rounded-xl bg-sky-500/10 p-6">
        <PresaleProgress />
      </div>
    </main>
  )
}
