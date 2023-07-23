import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const api = "https://lcd-office.cosmostation.io/archway-testnet/cosmos/staking/v1beta1/validators";
        const response = await fetch(api, {
            method: "GET",
        });
        const data = await response.json();
        return NextResponse.json(data)
    } catch (e) {
        return new Response(e, {
            status: 400,
        })
    }
}
