import { providers } from "near-api-js";

type FunctionCallQueryResponse = {
    kind: "function_call";
    result: Uint8Array;
    logs: string[];
};

export type VaultStateResult = {
    state: {
        owner: string;
        [key: string]: unknown;
    };
    suffix: string;
};

// Maps allowed vault suffixes to their RPC URLs
export const CONTRACT_WHITELIST: Record<string, string> = {
    "nzaza.testnet": "https://rpc.testnet.fastnear.com",
    "sudostake.near": "https://rpc.mainnet.fastnear.com",
};

/**
 * Determines RPC URL and fetches vault state from the chain.
 * Throws if the vault address is invalid or the query fails.
 *
 * @param {string} vault - The vault contract account ID
 * @return {Promise<VaultStateResult>}
 */
export async function getVaultState(vault: string): Promise<VaultStateResult> {
    if (!vault || typeof vault !== "string") {
        throw new Error("Missing or invalid vault address");
    }

    const suffix = Object.keys(CONTRACT_WHITELIST)
        .find((key) => vault.endsWith(key));
    if (!suffix) {
        throw new Error("Vault address not allowed");
    }

    const rpcUrl = CONTRACT_WHITELIST[suffix];
    const provider = new providers.JsonRpcProvider({ url: rpcUrl });

    const raw = await provider.query({
        request_type: "call_function",
        account_id: vault,
        method_name: "get_vault_state",
        args_base64: Buffer.from(JSON.stringify({})).toString("base64"),
        finality: "final",
    });

    const result = raw as unknown as FunctionCallQueryResponse;

    return {
        state: JSON.parse(Buffer.from(result.result).toString()),
        suffix,
    };
}
