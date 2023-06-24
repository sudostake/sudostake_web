import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { set } from '../services/firebase_admin';

// TODO we could filter by the code_id req_data.vault_address was created from
export async function POST(req: NextRequest, event: NextFetchEvent) {
    const req_data = await req.json();
    set(`/vaults/${req_data.vault_address}`, req_data.vault_info);

    return NextResponse.json({ msg: "data indexed" })
}