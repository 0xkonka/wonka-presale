export type PresaleConfig = {
    usdc: string
    presaleToken: string
    price: bigint
    startTime: bigint
    endTime: bigint
    softcap: bigint
    hardcap: bigint
    capPerLevel: bigint
    minContribution: bigint
    maxContribution: bigint
}

export type UserInfo = {
    contributedAmount: bigint
    claimableAmount: bigint
    status: FunderStatus
}

export enum FunderStatus {
    None,
    Invested,
    Claimed
}
