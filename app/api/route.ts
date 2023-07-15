import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { set } from '../services/firebase_admin';
import { get_connection, index_vault_data, rpc_to_vault_code_ids_map } from '../services/vault_indexer';

export async function POST(req: NextRequest) {
    const req_data = await req.json();

    try {
        const client = await get_connection(req_data.rpc);

        // Get contract_data for the vault_address,
        // then check if the contract matches any of the code_ids whitelisted
        // For the network
        const contract_data = await client.getContract(req_data.vault_address);
        if (!rpc_to_vault_code_ids_map[req_data.rpc].vault_code_ids.includes(contract_data.codeId)) {
            throw new Error('contract code not white_listed for the selected network');
        }

        // Query the vault info and set the data to firestore
        const contract_info = await client.queryContractSmart(req_data.vault_address, { info: {} });
        set(`/vaults/${req_data.vault_address}`, index_vault_data(contract_info, req_data.rpc));

        return NextResponse.json({ msg: "data indexed" })
    } catch (e) {
        return new Response(e, {
            status: 400,
        })
    }
}
