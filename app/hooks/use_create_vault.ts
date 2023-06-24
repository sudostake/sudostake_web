import { JsonObject, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { ChainInfo } from "../utils/supported_chains";
import { selectedChainState, walletState } from "../state";
import { toast } from "react-toastify";

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
    return await client.execute(
        senderAddress,
        chainInfo.sudomod_address,
        msg,
        'auto',
        '',
        [
            chainInfo.vault_creation_fee,
        ]
    )
}

export const indexVault = async (client: SigningCosmWasmClient, vault_address: string) => {
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
        const exec_res = await createVault({
            msg: { mint_vault: {} },
            senderAddress: address,
            client,
            chainInfo,
        });
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
