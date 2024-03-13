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
    [SupportedChainId.GOERLI]: '',
    [SupportedChainId.SEPOLIA]: '0xB88b5F025382AaDaC2F87A01f950223e7Ee68a1b',
}

export const WONKA_ADDRESS: AddressMap = {
    [SupportedChainId.GOERLI]: '',
    [SupportedChainId.SEPOLIA]: '0x9848422A708960e6f416f719006328077Ad1816A',
}

export const PRESALE_ADDRESS: AddressMap = {
    [SupportedChainId.GOERLI]: '',
    [SupportedChainId.SEPOLIA]: '0x591AF082f3411EB00efAcAe4eF41f1E48b383efD',
}
