import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { ValidatorInfo, selectedChainState, walletState } from "../state";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query"
import { Coin, coin } from "cosmwasm";
import { Currency } from "../utils/supported_chains";
import { convertDenomToMicroDenom } from "../utils/conversion";
import { JsonObject } from "@cosmjs/cosmwasm-stargate";
import { VaultIndex } from "../utils/interface";

// TODO refactor this to be fail safe
const useIndexVault = (rpc: string) => {
    return useMutation(async (vault_address: string) => {
        return await fetch("/api", {
            method: "POST",
            body: JSON.stringify({ rpc, vault_address }),
        });
    }, {
        async onSuccess(res) { },
        onError(e) { },
        retry: 3,
    });
}

export const useCreateVault = () => {
    const chainInfo = useRecoilValue(selectedChainState);
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault(chainInfo.src.rpc);

    return useMutation(async () => {
        const exec_res = await client.execute(
            address,
            chainInfo.sudomod_address,
            { mint_vault: {} },
            'auto',
            '',
            [
                chainInfo.vault_creation_fee,
            ]
        );

        const vault_address = exec_res.events[18].attributes[0].value;
        return await indexVault(vault_address);
    }, {
        async onSuccess(res) {
            toast("New vault created!", { type: 'success' });
            await queryClient.invalidateQueries({ queryKey: ['owner_vaults', address] });
            return await queryClient.refetchQueries({ queryKey: ['owner_vaults', address] });
        },
        onError(e) {
            toast("Error creating vault", { type: 'error' })
        }
    });
}

export const useTransferVaultOwnership = (vault: VaultIndex) => {
    const { address, client } = useRecoilValue(walletState);
    const chainInfo = useRecoilValue(selectedChainState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault(chainInfo.src.rpc);

    return useMutation(async (to_address: string) => {
        await client.execute(
            address,
            vault.id,
            { transfer_ownership: { to_address } },
            'auto',
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

export const useDeposit = (to_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();

    return useMutation(async ({ amount, currency }: { amount: number, currency: Currency }) => {
        const microAmount = convertDenomToMicroDenom(`${amount}`, currency.coinDecimals);
        return await client.sendTokens(
            address,
            to_address,
            [coin(microAmount, currency.coinMinimalDenom)],
            "auto",
            '',
        )
    }, {
        async onSuccess(res) {
            toast(`Deposit successful`, { type: 'success' })
            await queryClient.invalidateQueries({ queryKey: ['vault_metadata', to_address] });
            return await queryClient.refetchQueries({ queryKey: ['vault_metadata', to_address] });
        },
        onError(e) {
            toast("Error depositing funds", { type: 'error' })
        }
    });
}

export const useWithdraw = (from_address: string) => {
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();

    return useMutation(async ({ amount, currency, to_address }: { amount: number, currency: Currency, to_address?: string }) => {
        const microAmount = convertDenomToMicroDenom(`${amount}`, currency.coinDecimals);
        return await client.execute(
            address,
            from_address,
            { withdraw_balance: { to_address, funds: coin(microAmount, currency.coinMinimalDenom) } },
            'auto',
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
    const chainInfo = useRecoilValue(selectedChainState);
    const { mutate: indexVault } = useIndexVault(chainInfo.src.rpc);

    return useMutation(async (index_data: boolean) => {
        await client.execute(
            address,
            vault_address,
            { claim_delegator_rewards: {} },
            'auto',
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

    return useMutation(async ({ amount, currency, validator }: { amount: number, currency: Currency, validator: ValidatorInfo }) => {
        const microAmount = convertDenomToMicroDenom(`${amount}`, currency.coinDecimals);
        return await client.execute(
            address,
            vault_address,
            { delegate: { validator: validator.address, amount: microAmount } },
            'auto',
            ''
        );
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

    return useMutation(async ({ amount, currency, validator }: { amount: number, currency: Currency, validator: ValidatorInfo }) => {
        const microAmount = convertDenomToMicroDenom(`${amount}`, currency.coinDecimals);
        return await client.execute(
            address,
            vault_address,
            { undelegate: { validator: validator.address, amount: microAmount } },
            'auto',
            ''
        );
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
            'auto',
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
    const chainInfo = useRecoilValue(selectedChainState);
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault(chainInfo.src.rpc);

    return useMutation(async (payload: JsonObject) => {
        await client.execute(
            address,
            vault_address,
            payload,
            'auto',
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
    const chainInfo = useRecoilValue(selectedChainState);
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault(chainInfo.src.rpc);

    return useMutation(async () => {
        await client.execute(
            address,
            vault_address,
            { close_pending_liquidity_request: {} },
            'auto',
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
    const { mutate: indexVault } = useIndexVault(chainInfo.src.rpc);

    return useMutation(async ({ amount, denom }: { amount: number, denom: string }) => {
        const request_currency = chainInfo.request_denoms.find(currency => currency.coinMinimalDenom === denom);
        const microAmount = convertDenomToMicroDenom(`${amount}`, request_currency.coinDecimals);
        const requested_amount: Coin = coin(
            microAmount,
            denom
        );

        await client.execute(
            address,
            vault_address,
            { accept_liquidity_request: {} },
            'auto',
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
    const chainInfo = useRecoilValue(selectedChainState);
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault(chainInfo.src.rpc);

    return useMutation(async () => {
        await client.execute(
            address,
            vault_address,
            { repay_loan: {} },
            'auto',
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
    const chainInfo = useRecoilValue(selectedChainState);
    const { address, client } = useRecoilValue(walletState);
    const queryClient = useQueryClient();
    const { mutate: indexVault } = useIndexVault(chainInfo.src.rpc);

    return useMutation(async () => {
        await client.execute(
            address,
            vault_address,
            { liquidate_collateral: {} },
            'auto',
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