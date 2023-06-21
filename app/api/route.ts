import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { CosmWasmClient } from "cosmwasm";
import { set } from '../services/firebase_admin';

export async function POST(req: NextRequest, event: NextFetchEvent) {
    const req_data = await req.json();

    // Index vault data to firestore async
    CosmWasmClient.connect(req_data.rpcEndpoint).then((client) => {
        client.queryContractSmart(req_data.address, {
            info: {},
        }).then((info) => {
            set(`/vaults/${req_data.address}`, info)
        });
    });

    return NextResponse.json({ msg: "data indexed" })
}