export type ValidatorInfo = {
    name: string,
    address: string,
    delegated_amount: number
}

export type UnbondingEntry = {
    amount: number,
    completion_time: string
}

export type ValidatorUnbondingInfo = {
    name: string,
    address: string,
    entries: UnbondingEntry[]
}