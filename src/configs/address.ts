export enum SupportedChainId {
    MAINNET = 1,
    BSC = 56,
    AVAX = 43114,
    ARBI = 43621,
    BASE = 8453,
    GOERLI = 5,
    SEPOLIA = 11155111,
    FUJI = 43113,
    HEX_MAINNET = '0x1',
    HEX_BSC = '0x38',
    HEX_AVAX = '0xa86a',
    HEX_ARBI = '0xa4b1',
    HEX_BASE = '0x2105',
    HEX_GOERLI = '0xaa36a7',
    HEX_SEPOLIA = '0xaa36a7',
    HEX_FUJI = '0xa869'
}

type AddressMap = { [chainId: number]: string }

export const USDC_ADDRESS: AddressMap = {
    [SupportedChainId.GOERLI]: '',
    [SupportedChainId.SEPOLIA]: '0xB88b5F025382AaDaC2F87A01f950223e7Ee68a1b',
    [SupportedChainId.FUJI]: '0xD7df0E1B0ee1618638aAE3DD34B869eCA4660D13'
}

export const WONKA_ADDRESS: AddressMap = {
    [SupportedChainId.GOERLI]: '',
    [SupportedChainId.SEPOLIA]: '0x9848422A708960e6f416f719006328077Ad1816A',
    [SupportedChainId.FUJI]: '0x9c73CF53819E7fE7933950db8EBa83a1fB3b8f54'
}

export const PRESALE_ADDRESS: AddressMap = {
    [SupportedChainId.GOERLI]: '',
    [SupportedChainId.SEPOLIA]: '0x8F6964272516585167faEE7a04D2f048ae2d9cf9',
    [SupportedChainId.FUJI]: '0xa19f263aA7439dbBc94bFd38DF0dec689664398b'
}

export const LZEndpointAddress: AddressMap = {
    [SupportedChainId.GOERLI]: '',
    [SupportedChainId.SEPOLIA]: '0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1',
    [SupportedChainId.FUJI]: '0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706'
}
