import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { selectedChainState, walletState } from "../state";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query"
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