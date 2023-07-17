import { CosmWasmClient } from "cosmwasm";
import { IObjectMap, LiquidityRequestTypes, VaultIndex } from "../utils/generic_interface";
import { JsonObject } from "@cosmjs/cosmwasm-stargate";
import { convertMicroDenomToDenom } from "../utils/conversion";

// All chains connection instances
const connections: IObjectMap<CosmWasmClient> = {};

// TODO for now, only archway supported
export const rpc_to_vault_code_ids_map: IObjectMap<{ vault_code_ids: number[], coinDecimals: number }> = {
    'https://rpc.constantine.archway.tech': {
        vault_code_ids: [
            484
        ],
        coinDecimals: 18
    }
};

export async function get_connection(rpc: string): Promise<CosmWasmClient> {
    // Return an existing connection
    if (connections[rpc]) {
        return connections[rpc];
    }

    // Throws error when the rpc is not in the whitelist
    if (!rpc_to_vault_code_ids_map[rpc]) {
        throw new Error('selected network not whitelisted');
    }

    // Create a new connection if no instance already exists
    const client = await CosmWasmClient.connect(rpc);
    connections[rpc] = client;
    return client;
}

export function index_vault_data(data: JsonObject, rpc: string): JsonObject {
    const coinDecimals = rpc_to_vault_code_ids_map[rpc].coinDecimals;
    const index: VaultIndex = {};

    if (Boolean(data['liquidity_request'])) {
        const msg = data['liquidity_request']['msg'];
        index.status = Boolean(data['liquidity_request']['state']) ? 'active' : 'pending';

        // Index fixed_interest_rental
        if (Boolean(msg['fixed_interest_rental'])) {
            index.request_type = LiquidityRequestTypes.fixed_interest_rental;
            index.requested_amount = {
                denom: msg['fixed_interest_rental']['requested_amount']['denom'],
                amount: convertMicroDenomToDenom(msg['fixed_interest_rental']['requested_amount']['amount'], coinDecimals)
            };
            index.can_cast_vote = msg['fixed_interest_rental']['can_cast_vote'];
            index.claimable_tokens = convertMicroDenomToDenom(msg['fixed_interest_rental']['claimable_tokens'], coinDecimals);
        }

        // Index fixed_term_rental
        if (Boolean(msg['fixed_term_rental'])) {
            index.request_type = LiquidityRequestTypes.fixed_term_rental;
            index.requested_amount = {
                denom: msg['fixed_term_rental']['requested_amount']['denom'],
                amount: convertMicroDenomToDenom(msg['fixed_term_rental']['requested_amount']['amount'], coinDecimals)
            };
            index.can_cast_vote = msg['fixed_term_rental']['can_cast_vote'];
            index.duration_in_seconds = msg['fixed_term_rental']['duration_in_seconds'];
        }

        // Index fixed_term_loan
        if (Boolean(msg['fixed_term_loan'])) {
            index.request_type = LiquidityRequestTypes.fixed_term_loan;
            index.requested_amount = {
                denom: msg['fixed_term_loan']['requested_amount']['denom'],
                amount: convertMicroDenomToDenom(msg['fixed_term_loan']['requested_amount']['amount'], coinDecimals)
            };
            index.duration_in_seconds = msg['fixed_term_loan']['duration_in_seconds'];
            index.interest_amount = convertMicroDenomToDenom(msg['fixed_term_loan']['interest_amount'], coinDecimals);
            index.collateral_amount = convertMicroDenomToDenom(msg['fixed_term_loan']['collateral_amount'], coinDecimals);
        }
    }

    return { ...data, index };
}