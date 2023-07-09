import { CosmWasmClient } from "cosmwasm";
import { IObjectMap } from "../utils/generic_interface";

// All chains connection instances
const connections: IObjectMap<CosmWasmClient> = {};

// A list of allowed RPC end points, mapped to the list of allowed vault code ids
export const rpc_to_vault_code_ids_map: IObjectMap<number[]> = {
    'https://rpc.constantine.archway.tech': [
        484
    ]
};

export async function get_connection(rpc: string): Promise<CosmWasmClient> {
    // Return an existing connection
    if (connections[rpc]) {
        return connections[rpc];
    }

    // Throws error when the rpc is not in the whitelist
    if (!rpc_to_vault_code_ids_map[rpc]) {
        throw new Error('selected network not whitelisted');
    }

    // Create a new connection if no instance already exists
    const client = await CosmWasmClient.connect(rpc);
    connections[rpc] = client;
    return client;
}
