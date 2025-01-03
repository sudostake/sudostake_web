import { useMutation } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { VaultIndexErrorState, selectedChainState, walletState } from "../state";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query"
import { Coin, coin } from "cosmwasm";
import { convertDenomToMicroDenom, convertMicroDenomToDenom } from "../utils/conversion";
import { ExecuteInstruction, ExecuteResult, JsonObject } from "@cosmjs/cosmwasm-stargate";
import { record_purchase } from "../services/firebase_client";
import { Currency } from "../types/currency";
import { VaultIndex } from "../types/vault_index";
import { Decision, VotingVault } from "../types/voting";
import { ValidatorInfo } from "../types/validator_info";

// TODO make this dynamic
const GAS_ADJUSTMENT = 1.4;

export const useIndexVault = () => {
    const chainInfo = useRecoilValue(selectedChainState);
    const setVaultIndexErrorState = useSetRecoilState(VaultIndexErrorState);

    return useMutation(async (vault_address: string) => {
        const response = await fetch("/api", {
            method: "POST",
            body: JSON.stringify({ rpc: chainInfo.rpc, vault_address }),
        });

        // Return success if ok
        if (response.ok) {
            return response.json();
        }

        // Here we catch the server error
        return Promise.reject(response)
    }, {
        onSuccess(_) {
            localStorage.removeItem('failed_vault_index');
        },
        onError(_, vault_address) {
            localStorage.setItem('failed_vault_index', vault_address);
            setVaultIndexErrorState(true);
        },
    });
}

export const useMintVault = () => {
    const chain_info = useRecoilValue(selectedChainState);
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async () => {
        // Execute transaction
        const exec_res: ExecuteResult = await client.execute(
            address,
            chain_info.sudomod_address,
            { mint_vault: {} },
            GAS_ADJUSTMENT,
            '',
            [
                chain_info.vault_creation_fee,
            ]
        );

        // Find attr _contract_address from instantiate event
        const instantiate_event = exec_res.events.find(e => e.type === 'instantiate');
        const vault_address_attr = instantiate_event.attributes.find(a => a.key === '_contract_address');

        // Find attr vault_instance_seq_id from wasm events
        let vault_instance_seq_id = '';
        exec_res.events.filter(e => e.type === 'wasm').forEach(wasm_event => {
            const vault_instance_seq_id_attr = wasm_event.attributes.find(a => a.key === 'vault_instance_seq_id');
            if (Boolean(vault_instance_seq_id_attr)) {
                vault_instance_seq_id = vault_instance_seq_id_attr.value;
            }
        });

        // Record purchase for analytics
        record_purchase({
            transaction_id: exec_res.transactionHash,
            currency: chain_info.stakeCurrency.coinDenom,
            value: convertMicroDenomToDenom(
                chain_info.vault_creation_fee.amount,
                chain_info.stakeCurrency.coinDecimals
            ),
            items: [
                {
                    item_id: vault_address_attr.value,
                    item_name: vault_instance_seq_id
                }
            ]
        });

        // Index vault
        return await indexVault(vault_address_attr.value);
    }, {
        async onSuccess(res) {
            toast("New vault minted!", { type: 'success' });
            await queryClient.invalidateQueries({ queryKey: ['owner_vaults', address] });
            return await queryClient.refetchQueries({ queryKey: ['owner_vaults', address] });
        },
        onError(e) {
            toast("Error minting vault", { type: 'error' })
        }
    });
}

export const useTransferVaultOwnership = (vault: VaultIndex) => {
    const { address, client } = useRecoilValue(walletState);
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async (to_address: string) => {
        await client.execute(
            address,
            vault.id,
            { transfer_ownership: { to_address } },
            GAS_ADJUSTMENT,
            ''
        );

        return await indexVault(vault.id);
    }, {
        async onSuccess(res) {
            toast(`Vault #${vault.index_number} transferred successfully`, { type: 'success' });
        },
        onError(e) {
            toast("Error transferring vault", { type: 'error' })
        }
    });
}

export const useVoteOnProposal = (proposal_id: string) => {
    const { address, client } = useRecoilValue(walletState);

    return useMutation(async ({ vaults, decision }: { vaults: VotingVault[], decision: Decision }) => {
        const instructions: ExecuteInstruction[] = vaults.map(vault => {
            return {
                contractAddress: vault.vault.id,
                msg: { vote: { proposal_id: Number(proposal_id), vote: decision.id } }
            } as ExecuteInstruction;
        });

        console.log(instructions);

        await client.executeMultiple(
            address,
            instructions,
            GAS_ADJUSTMENT,
            ''
        );
    }, {
        async onSuccess(res) {
            toast(`Voted successfully`, { type: 'success' });
        },
        onError(e) {
            console.log(e);
            toast("Error voting", { type: 'error' })
        }
    });
}

export const useDeposit = (to_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();

    return useMutation(async ({ amount, currency }: { amount: number, currency: Currency }) => {
        const microAmount = convertDenomToMicroDenom(`${amount}`, currency.coinDecimals);
        return await client.sendTokens(
            address,
            to_address,
            [coin(microAmount, currency.coinMinimalDenom)],
            GAS_ADJUSTMENT,
            '',
        )
    }, {
        async onSuccess(res) {
            toast(`Deposit successful`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', to_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', to_address] });
        },
        onError(e) {
            console.log(e);
            toast("Error depositing funds", { type: 'error' })
        }
    });
}

export const useWithdraw = (from_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();

    return useMutation(async ({ amount, currency, to_address }: { amount: number, currency: Currency, to_address?: string}) => {
        const microAmount = convertDenomToMicroDenom(`${amount}`, currency.coinDecimals);
        return await client.execute(
            address,
            from_address,
            { withdraw_balance: { to_address, funds: coin(microAmount, currency.coinMinimalDenom) } },
            GAS_ADJUSTMENT,
            ''
        );
    }, {
        async onSuccess(res) {
            toast(`Withdraw successful`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', from_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', from_address] });
        },
        onError(e) {
            toast("Error withdrawing funds", { type: 'error' })
        }
    });
}

export const useClaimRewards = (vault_address: string) => {
    const queryClient = useQueryClient();
    const { address, client } = useRecoilValue(walletState);
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async (index_data: boolean) => {
        await client.execute(
            address,
            vault_address,
            { claim_delegator_rewards: {} },
            GAS_ADJUSTMENT,
            ''
        );

        if (index_data) {
            return await indexVault(vault_address);
        }
    }, {
        async onSuccess(res) {
            toast(`Claim rewards successful`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', vault_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', vault_address] });
        },
        onError(e) {
            toast("Error claiming rewards", { type: 'error' })
        }
    });
}

export const useDelegate = (vault_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async ({ amount, currency, validator }: { amount: number, currency: Currency, validator: ValidatorInfo }) => {
        const microAmount = convertDenomToMicroDenom(`${amount}`, currency.coinDecimals);
        await client.execute(
            address,
            vault_address,
            { delegate: { validator: validator.address, amount: microAmount } },
            GAS_ADJUSTMENT,
            ''
        );

        return await indexVault(vault_address);
    }, {
        async onSuccess(res) {
            toast(`Delegate successful`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', vault_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', vault_address] });
        },
        onError(e) {
            console.log(e);
            toast("Error delegating funds", { type: 'error' })
        }
    });
}

export const useUndelegate = (vault_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async ({ amount, currency, validator }: { amount: number, currency: Currency, validator: ValidatorInfo }) => {
        const microAmount = convertDenomToMicroDenom(`${amount}`, currency.coinDecimals);
        await client.execute(
            address,
            vault_address,
            { undelegate: { validator: validator.address, amount: microAmount } },
            GAS_ADJUSTMENT,
            ''
        );

        return indexVault(vault_address);
    }, {
        async onSuccess(res) {
            toast(`Undelegate successful`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', vault_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', vault_address] });
        },
        onError(e) {
            console.log(e);
            toast("Error undelegating funds", { type: 'error' })
        }
    });
}

export const useRedelegate = (vault_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();

    return useMutation(async ({ amount, currency, from_validator, to_validator }:
        { amount: number, currency: Currency, from_validator: ValidatorInfo, to_validator: ValidatorInfo }) => {
        const microAmount = convertDenomToMicroDenom(`${amount}`, currency.coinDecimals);
        return await client.execute(
            address,
            vault_address,
            { redelegate: { src_validator: from_validator.address, dst_validator: to_validator.address, amount: microAmount } },
            GAS_ADJUSTMENT,
            ''
        );
    }, {
        async onSuccess(res) {
            toast(`Redelegate successful`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', vault_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', vault_address] });
        },
        onError(e) {
            console.log(e);
            toast("Error redelegating funds", { type: 'error' })
        }
    });
}

export const useRequestLiquidity = (vault_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async (payload: JsonObject) => {
        await client.execute(
            address,
            vault_address,
            payload,
            GAS_ADJUSTMENT,
            ''
        );

        return await indexVault(vault_address);
    }, {
        async onSuccess(res) {
            toast(`Liquidity request successful`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', vault_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', vault_address] });
        },
        onError(e) {
            console.log(e);
            toast("Error requesting liquidity", { type: 'error' })
        }
    });
}

export const useClosePendingLiquidityRequest = (vault_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async () => {
        await client.execute(
            address,
            vault_address,
            { close_pending_liquidity_request: {} },
            GAS_ADJUSTMENT,
            ''
        );

        return await indexVault(vault_address);
    }, {
        async onSuccess(res) {
            toast(`Liquidity request closed successfully`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', vault_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', vault_address] });
        },
        onError(e) {
            console.log(e);
            toast("Error closing liquidity request", { type: 'error' })
        }
    });
}

export const useAcceptLiquidityRequest = (vault_address: string) => {
    const chainInfo = useRecoilValue(selectedChainState);
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async ({ amount, denom }: { amount: number, denom: string }) => {
        const request_currency = chainInfo.request_currencies.find(currency => currency.coinMinimalDenom === denom);
        const microAmount = convertDenomToMicroDenom(`${amount}`, request_currency.coinDecimals);
        const requested_amount: Coin = coin(
            microAmount,
            denom
        );

        await client.execute(
            address,
            vault_address,
            { accept_liquidity_request: {} },
            GAS_ADJUSTMENT,
            '',
            [
                requested_amount,
            ]
        );

        // TODO record_purchase for analytics purpose
        // TODO refactor currency list across app
        // let the currency list be a separate list
        // All currencies
        // request currencies

        // Get the liquidity_commission sent to instantiator_address
        // 
        /**
         * 
         record_purchase({
            transaction_id: exec_res.transactionHash,
            currency: get_currency(liquidity_commission.denom).coinDenom,
            value: convertMicroDenomToDenom(
                liquidity_commission.amount,
                get_currency(liquidity_commission.denom).coinDecimals,
            items: [
                {
                    item_id: vault_address_attr.value,
                    item_name: accept_liquidity_request
                }
            ]
        });
         */


        return await indexVault(vault_address);
    }, {
        async onSuccess(res) {
            toast(`Liquidity request accepted successfully`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', vault_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', vault_address] });
        },
        onError(e) {
            console.log(e);
            toast("Error accepting liquidity request", { type: 'error' })
        }
    });
}

export const useRepayLoan = (vault_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async () => {
        await client.execute(
            address,
            vault_address,
            { repay_loan: {} },
            GAS_ADJUSTMENT,
            '',
        );

        return await indexVault(vault_address);
    }, {
        async onSuccess(res) {
            toast(`Loan repaid successfully`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', vault_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', vault_address] });
        },
        onError(e) {
            console.log(e);
            toast("Error repaying loan", { type: 'error' })
        }
    });
}

export const useLiquidateCollateral = (vault_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async () => {
        await client.execute(
            address,
            vault_address,
            { liquidate_collateral: {} },
            GAS_ADJUSTMENT,
            '',
        );

        return await indexVault(vault_address);
    }, {
        async onSuccess(res) {
            toast(`Liquidation successfully`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', vault_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', vault_address] });
        },
        onError(e) {
            console.log(e);
            toast("Error liquidating collateral", { type: 'error' })
        }
    });
}