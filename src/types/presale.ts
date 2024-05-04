export type PresaleConfig = {
  usdc: string
  presaleToken: string
  startTime: bigint
  endTime: bigint
  softcap: bigint
  hardcap: bigint
  minContribution: bigint
  maxContribution: bigint
}

export type UserInfo = {
  contributedAmount: bigint
  claimableAmount: bigint
  pendingReward: bigint
  status: boolean
}

export enum FunderStatus {
  None,
  Invested,
  Claimed
}

export type allPresaleInfo = {
  chainId: number
  chainName: string
  chainDec: number
  totalContributed: bigint
  hardCap: bigint
  capPerLevel: bigint
  contributedPerLevel: bigint
}
