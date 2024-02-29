import useSWR from 'swr'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance, useContractWrite, useContractRead } from 'wagmi'

import ProgressBar from '../ProgressBar'
import fetcher from 'utils/fetcher'
// import Loading from 'components/Loading';

import styles from './styles.module.scss'
import PresaleOver from '../Over'

import PresaleContractABI from '../../../abi/Presale.json'

const classNames = require('classnames')

const PresaleProgress = () => {
  // const { data, error } = useSWR('/v1/landing', fetcher, { refreshInterval: 5000 });
  const data = {
    TotalRaised: 100000,
    AssetCode: 'USDC',
  }

  // const [asset, setAsset] = useState({});

  useEffect(() => {
    //   (async () => {
    //     if (data) {
    //       const { data: result } = await axios.get(`https://horizon.stellar.org/accounts/${data.Address}`);
    //       const foundAsset = result.balances.find((x) =>
    //         x.asset_code === data.AssetCode && x.asset_issuer === data.AssetIssuer);
    //       if (foundAsset) {
    //         setAsset(foundAsset);
    //       }
    //       setAsset({ balance: 100 })
    //     }
    //   })();
    // const p = setInterval(() => {
    //   (async () => {
    //     if (data) {
    //       const { data: result } = await axios.get(`https://horizon.stellar.org/accounts/${data.Address}`);
    //       const foundAsset = result.balances.find((x) =>
    //         x.asset_code === data.AssetCode && x.asset_issuer === data.AssetIssuer);
    //       if (foundAsset) {
    //         setAsset(foundAsset);
    //       }
    //       setAsset({ balance: 100 })
    //     }
    //   })();
    // }, 5000);
    // const p = setInterval(() => {
    //   (async () => {
    //     if (data) {
    //       const { data: balance } = useContractRead({
    //         address: CONTRACT_ADDRESS.Presale as `0x${string}`,
    //         abi: PresaleContractABI,
    //         functionName: 'balanceOf',
    //         args: [address],
    //       })
    //     }
    //   })();
    // }, 5000);
    // const { data: balance } = useContractRead({
    //   address: token.address as `0x${string}`,
    //   abi: erc20ABI,
    //   functionName: 'balanceOf',
    //   args: [address],
    // })
    // return () => {
    //   clearInterval(p);
    // };
  }, [data])

  const asset = {
    balance: 33333,
  }

  // if (!error && !data) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <p>Presale has not started yet.</p>;
  // }

  // if (!asset) {
  //   return <Loading />;
  // }

  const percent = parseInt((parseFloat(asset.balance) * 100) / data.TotalRaised)
  // const percent = 10;

  if (percent >= 99) {
    return <PresaleOver />
  }

  return (
    <>
      <h1 className={styles.title}>
        Token Pre-sale is Live <span className={classNames(styles.status, styles['status-success'])} />
      </h1>

      <div className={styles.card}>
        <div className={styles.progress}>
          <span style={{ color: 'black' }}>{parseInt(asset.balance, 10)} </span>
          <span className={styles['progress-letter']}>of </span>
          <span style={{ color: 'black' }}>
            {data.TotalRaised} {data.AssetCode}{' '}
          </span>
          <span className={styles['progress-separator']}>| </span>
          <span className={classNames(styles['progress-success'], styles['progress-status-success'])}>
            ({percent}
            %)
          </span>
        </div>
        <div className={styles['progress-bar']}>
          <ProgressBar value={percent} />
        </div>
      </div>

      {/* <div className={styles.card}>
        <h2 className={styles['card-title']}>How to participate?</h2>
        <p className={styles['card-desc']}>
          To participate in the presale, you must transfer your desired amount to
          the presale address. Please, read the following requirements to avoid losing
          your assets:
        </p>
        <ul className={styles.list}>
          {items.map((item: ParticipateItem) => (
            <li key={item.id}>
              <span className={styles['bullet-point']} />
              {item.text}
            </li>
          ))}
        </ul>
      </div> */}
    </>
  )
}

export default PresaleProgress
