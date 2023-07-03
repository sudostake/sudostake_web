import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { ValidatorInfo, selectedChainState, walletState } from "../state";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query"
import { coin } from "cosmwasm";
import { Currency } from "../utils/supported_chains";
import { convertDenomToMicroDenom } from "../utils/conversion";

export const indexVault = async (client: SigningCosmWasmClient, vault_address: string) => {
    // TODO we also pass in the action description for historic purposes
    const vault_info = await client.queryContractSmart(vault_address, { info: {} });
    const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ vault_info, vault_address }),
    });

    return await response.json();
}

export const useCreateVault = () => {
    const chainInfo = useRecoilValue(selectedChainState);
    const { address, client } = useRecoilValue(walletState);

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
        return await indexVault(client, vault_address);
    }, {
        onSuccess(res) {
            toast("New vault created!", { type: 'success' })
        },
        onError(e) {
            toast("Error creating vault", { type: 'error' })
        }
    });
}

export const useTransferVaultOwnership = (vault: any) => {
    const { address, client } = useRecoilValue(walletState);

    return useMutation(async (to_address: string) => {
        await client.execute(
            address,
            vault.id,
            { transfer_ownership: { to_address } },
            'auto',
            ''
        );

        return await indexVault(client, vault.id);
    }, {
        onSuccess(res) {
            toast(`Vault #${vault.config.index_number} transferred successfully`, { type: 'success' })
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
            [coin(`${microAmount}`, currency.coinMinimalDenom)],
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
            { withdraw_balance: { to_address, funds: coin(`${microAmount}`, currency.coinMinimalDenom) } },
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

    return useMutation(async () => {
        return await client.execute(
            address,
            vault_address,
            { claim_delegator_rewards: {} },
            'auto',
            ''
        );
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
        // return new Promise(resolve => setTimeout(resolve, 3000));
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
        // return new Promise(resolve => setTimeout(resolve, 3000));
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