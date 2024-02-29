export enum SupportedChainId {
  MAINNET = 1,
  BSC = 56,
  AVAX = 43114,
  ARBI = 43621,
  BASE = 8453,
  GOERLI = 5,
  SEPOLIA = 11155111,
  HEX_MAINNET = '0x1',
  HEX_BSC = '0x38',
  HEX_AVAX = '0xa86a',
  HEX_ARBI = '0xa4b1',
  HEX_BASE = '0x2105',
  HEX_GOERLI = '0xaa36a7',
  HEX_SEPOLIA = '0xaa36a7',
}

type AddressMap = { [chainId: number]: string }

export const USDC_ADDRESS: AddressMap = {
  [SupportedChainId.GOERLI]: '0xc6B35B4C219AcCfD282021b3994fF10aC72138eA',
  [SupportedChainId.SEPOLIA]: '',
}

export const WONKA_ADDRESS: AddressMap = {
  [SupportedChainId.GOERLI]: '0xD414466571e92dFD69344AFC19bAc7A0406C8ED5',
  [SupportedChainId.SEPOLIA]: '',
}

export const PRESALE_ADDRESS: AddressMap = {
  [SupportedChainId.GOERLI]: '0x084E9665fAEc06c75B1dEe33aBE448fD1d15f8ec',
  [SupportedChainId.SEPOLIA]: '',
}
