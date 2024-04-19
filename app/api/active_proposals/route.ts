import { get_chain_info_from_id } from '@/app/utils/supported_chains';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const chain_id = searchParams.get('chain_id');
    const chain_info = get_chain_info_from_id(chain_id);

    try {
        // Improvised
        // We are using the limit 10, and a reverse pagination to get the latest
        // 10 proposals, and filter for only those in the voting period.
        // In the event the top ten is no longer sufficient enough to
        // capture all active props, we can increase the limit
        // 
        // TODO
        // How to query for only proposals with status PROPOSAL_STATUS_VOTING_PERIOD
        const api = [
            chain_info.src.rest,
            '/cosmos/gov/v1/proposals?pagination.reverse=true&pagination.limit=10',
        ].join('');
        const response = await fetch(api, {
            method: "GET",
        });
        const data = await response.json();
        const active_proposals = data.proposals.filter(d => d.status === 'PROPOSAL_STATUS_VOTING_PERIOD');
        console.log(active_proposals);
        return NextResponse.json(active_proposals)
    } catch (e) {
        return new Response(e, {
            status: 400,
        })
    }
}
