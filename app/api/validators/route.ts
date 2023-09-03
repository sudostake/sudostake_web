import { get_chain_info_from_id } from '@/app/utils/supported_chains';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const chain_id = searchParams.get('chain_id');
    const chain_info = get_chain_info_from_id(chain_id)

    try {
        const api = `${chain_info.src.rest}/cosmos/staking/v1beta1/validators`;
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
