import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const address = searchParams.get('vault_address');

    try {
        const api = [
            'https://lcd-office.cosmostation.io/archway-testnet/cosmos/staking/v1beta1/delegators/',
            address,
            '/unbonding_delegations'
        ].join('');
        const response = await fetch(api, {
            method: "GET",
        });
        const data = await response.json();
        return NextResponse.json(data)
    } catch (e) {
        console.log(e);
        return new Response(e, {
            status: 400,
        })
    }
}
