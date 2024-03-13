'use client'

import { atom } from 'recoil'
import {
    SudoStakeChainInfoSchema, ValidatorInfo,
    ValidatorUnbondingInfo, WalletState,
    WalletStatusTypes
} from './utils/interface';

/**
 * 
 */
export const walletState = atom<WalletState>({
    key: 'walletState',
    default: {
        client: null,
        status: WalletStatusTypes.idle,
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
