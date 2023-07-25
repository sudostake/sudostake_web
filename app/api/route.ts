import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { set } from '../services/firebase_admin';
import { get_connection, index_vault_data } from '../services/vault_indexer';
import { get_chain_info_from_rpc } from '../utils/supported_chains';

export async function POST(req: NextRequest) {
    const req_data = await req.json();

    try {
        const client = await get_connection(req_data.rpc);

        // Get contract_data for the vault_address,
        // then check if the contract matches any of the code_ids whitelisted
        // For the network
        const contract_data = await client.getContract(req_data.vault_address);
        const chain_info = get_chain_info_from_rpc(req_data.rpc)
        if (chain_info && !chain_info.vault_code_ids.includes(contract_data.codeId)) {
            throw new Error('contract code not white_listed for the selected network');
        }

        // Query the vault info and set the data to firestore
        const contract_info = await client.queryContractSmart(req_data.vault_address, { info: {} });
        await set(`/vaults/${req_data.vault_address}`, index_vault_data({
            vault_info: contract_info,
            rpc: req_data.rpc
        }));

        return NextResponse.json({ msg: "data indexed" })
    } catch (e) {
        return new Response(e, {
            status: 400,
        })
    }
}
