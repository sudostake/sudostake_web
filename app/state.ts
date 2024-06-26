'use client'

import { atom } from 'recoil'
import { SudoStakeChainInfoSchema } from './types/chain_info_schema';
import { WalletStatus } from './enums/wallet_status';
import { ValidatorInfo, ValidatorUnbondingInfo } from './types/validator_info';
import { WalletState } from './types/wallet_state';

/**
 * 
 */
export const walletState = atom<WalletState>({
    key: 'walletState',
    default: {
        client: null,
        status: WalletStatus.idle,
        name: '',
        address: '',
        wallet_logo_url: '',
        selected_wallet: null
    },
    dangerouslyAllowMutability: true,
});

/**
 * 
 */
export const selectedChainState = atom<SudoStakeChainInfoSchema>({
    key: 'selectedChainState',
    default: null,
});

/**
 * 
 */
export const validatorListState = atom<{
    validator_list: ValidatorInfo[],
    validator_unbonding_list: ValidatorUnbondingInfo[]

}>({
    key: 'validatorListState',
    default: {
        validator_list: [],
        validator_unbonding_list: []
    },
});

/**
 * 
 */
export const VaultIndexErrorState = atom<boolean>({
    key: 'VaultIndexErrorState',
    default: false,
});
