import { get_chain_info_from_id } from '@/app/utils/supported_chains';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const chain_id = searchParams.get('chain_id');
    const chain_info = get_chain_info_from_id(chain_id)

    try {
        let validators = [];
        let has_next_page = true;
        let next_key;

        while (has_next_page) {
            const api = [
                `${chain_info.src.rest}/cosmos/staking/v1beta1/validators`,
                Boolean(next_key) ? `?pagination.key=${next_key}` : ''
            ].join('');

            const response = await fetch(api, {
                method: "GET",
            });

            // Parse response data
            const data = await response.json();

            // Check if there is a next page
            next_key = data.pagination.next_key;
            has_next_page = Boolean(next_key);

            // Update validators list
            validators = [...validators, ...data.validators]
        }

        return NextResponse.json({ validators })
    } catch (e) {
        return new Response(e, {
            status: 400,
        })
    }
}
