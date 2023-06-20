import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { CosmWasmClient } from "cosmwasm";
import { set } from '../services/firebase_admin';

const rpcEndpoint = "https://rpc.constantine.archway.tech:443";

export async function POST(req: NextRequest, event: NextFetchEvent) {
    const req_data = await req.json();

    // Write the data to firestore
    const client = await CosmWasmClient.connect(rpcEndpoint);
    const info = await client.queryContractSmart(req_data.address, {
        info: {},
    });
    await set(`/vaults/${req_data.address}`, info);

    return NextResponse.json({ msg: "data indexed" })
}