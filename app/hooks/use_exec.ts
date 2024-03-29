import { useMutation } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { VaultIndexErrorState, selectedChainState, walletState } from "../state";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query"
import { Coin, coin } from "cosmwasm";
import { convertDenomToMicroDenom } from "../utils/conversion";
import { ExecuteInstruction, JsonObject } from "@cosmjs/cosmwasm-stargate";
import { Currency, Decision, ValidatorInfo, VaultIndex, VotingVault } from "../utils/interface";

export const useIndexVault = () => {
    const chainInfo = useRecoilValue(selectedChainState);
    const setVaultIndexErrorState = useSetRecoilState(VaultIndexErrorState);

    return useMutation(async (vault_address: string) => {
        const response = await fetch("/api", {
            method: "POST",
            body: JSON.stringify({ rpc: chainInfo.src.rpc, vault_address }),
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
    const chainInfo = useRecoilValue(selectedChainState);
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault();

    return useMutation(async () => {
        const exec_res = await client.execute(
            address,
            chainInfo.sudomod_address,
            { mint_vault: {} },
            1.4,
            '',
            [
                chainInfo.vault_creation_fee,
            ]
        );

        // Find the event of type instantiate and attribute with key _contract_address
        const instantiate_event = exec_res.events.find(e => e.type === 'instantiate');
        const vault_address_attr = instantiate_event.attributes.find(a => a.key === '_contract_address');
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
            1.4,
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
            1.4,
            ''
        );
    }, {
        async onSuccess(res) {
            toast(`Voted successfully`, { type: 'success' });
        },
        onError(e) {
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
            1.4,
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

    return useMutation(async ({ amount, currency, to_address, send_memo }: { amount: number, currency: Currency, to_address?: string, send_memo?: string }) => {
        const microAmount = convertDenomToMicroDenom(`${amount}`, currency.coinDecimals);
        return await client.execute(
            address,
            from_address,
            { withdraw_balance: { to_address, funds: coin(microAmount, currency.coinMinimalDenom) } },
            1.4,
            send_memo
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
            1.4,
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
            1.4,
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
            1.4,
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
            1.4,
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
            1.4,
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
            1.4,
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
        const request_currency = chainInfo.request_denoms.find(currency => currency.coinMinimalDenom === denom);
        const microAmount = convertDenomToMicroDenom(`${amount}`, request_currency.coinDecimals);
        const requested_amount: Coin = coin(
            microAmount,
            denom
        );

        /**
         * const keplr = new KeplrClient('chain_id');
         * const chainClient = new ChainClient();
         * const transaction = {};
         * const signed_tx = keplr.sign(transaction)
         * const res = chainClient.broadcast(signed_tx);
         */

        await client.execute(
            address,
            vault_address,
            { accept_liquidity_request: {} },
            1.4,
            '',
            [
                requested_amount,
            ]
        );

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
            1.4,
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
            1.4,
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