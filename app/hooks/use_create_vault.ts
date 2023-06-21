import { JsonObject, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { coin } from "@cosmjs/stargate";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { selectedChainState, walletState } from "../providers";
import { ChainInfo } from "../utils/supported_chains";

const createVault = async ({
    msg,
    senderAddress,
    client,
    chainInfo
}: {
    msg: JsonObject
    senderAddress: string
    client: SigningCosmWasmClient,
    chainInfo: ChainInfo
}) => {
    const funds = [
        chainInfo.vault_creation_fee,
    ]

    return await client.execute(
        senderAddress,
        chainInfo.sudomod_address,
        msg,
        'auto',
        undefined,
        funds
    )
}

export const indexVault = async (vault_address: string, rpcEndpoint: string) => {
    const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ vault_address, rpcEndpoint }),
    });

    return await response.json();
}

export const useCreateVault = () => {
    const chainInfo = useRecoilValue(selectedChainState);
    const { address, client } = useRecoilValue(walletState);

    return useMutation(async () => {
        const exec_res = await createVault({
            msg: { mint_vault: {} },
            senderAddress: address,
            client,
            chainInfo,
        });
        console.log(exec_res);
        // return await indexVault()
        // await new Promise(resolve => setTimeout(resolve, 3000));
    }, {
        onSuccess(res) {
            // TODO
        },
        onError(e) {
            console.log(e);
        }
    });
}
