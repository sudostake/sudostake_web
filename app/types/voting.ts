import { VoteOption } from "../enums/vote_option"
import { VaultIndex } from "./vault_index"

export type Decision = {
    id: VoteOption,
    title: string,
    description: string,
}

export type VotingVault = {
    vault: VaultIndex,
    has_voted: boolean,
}