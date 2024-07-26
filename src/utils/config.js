import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js'
import bs58 from 'bs58'
import { Currency, Token, TxVersion, TOKEN_PROGRAM_ID, LOOKUP_TABLE_CACHE } from '@raydium-io/raydium-sdk'

export const connection = new Connection(process.env.RPC_URL, { wsEndpoint: process.env.WS_URL }) // helius

// export const myKeyPair = Keypair.fromSecretKey(new Uint8Array(bs58.decode(process.env.SOLANA_PRIVATE_KEY)))

export const makeTxVersion = TxVersion.V0

export const addLookupTableInfo = process.env.NETWORK == 'mainnet' ? LOOKUP_TABLE_CACHE : undefined

export const CONFIG_MAINNET_PROGRAM_ID = {
  AMM_OWNER: new PublicKey('GThUX1Atko4tqhN2NaiTazWSeFWMuiUvfFnyJyUghFMJ'),
  CREATE_POOL_FEE_ADDRESS: new PublicKey('7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5')
}

export const CONFIG_DEVNET_PROGRAM_ID = {
  AMM_OWNER: new PublicKey('Adm29NctkKwJGaaiU8CXqdV6WDTwR81JbxV8zoxn745Y'),
  CREATE_POOL_FEE_ADDRESS: new PublicKey('3XMrhbv989VxAMi3DErLV9eJht1pHppW5LbKxe9fkEFR')
}

export const CONFIG_PROGRAM_ID = process.env.NETWORK == 'mainent' ? CONFIG_MAINNET_PROGRAM_ID : CONFIG_DEVNET_PROGRAM_ID

export const DEFAULT_TOKEN = {
  SOL: new Currency(9, 'USDC', 'USDC'),
  WSOL: new Token(TOKEN_PROGRAM_ID, new PublicKey('So11111111111111111111111111111111111111112'), 9, 'WSOL', 'WSOL')
}
