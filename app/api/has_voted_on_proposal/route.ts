import { get_chain_info_from_id } from '@/app/utils/supported_chains';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const chain_id = searchParams.get('chain_id');
    const proposal_id = searchParams.get('proposal_id');
    const address = searchParams.get('address');
    const chain_info = get_chain_info_from_id(chain_id);

    try {
        const api = `${chain_info.src.rest}/cosmos/gov/v1/proposals/${proposal_id}/votes/${address}`;
        const response = await fetch(api, {
            method: "GET",
        });

        // Parse response data
        const data = await response.json();
        return NextResponse.json(data)
    } catch (e) {
        console.log(e);
        return new Response(e, {
            status: 400,
        })
    }
}
