import { CosmWasmClient } from "cosmwasm";
import { JsonObject } from "@cosmjs/cosmwasm-stargate";
import { convertMicroDenomToDenom, secondsToDhms } from "../utils/conversion";
import { get_chain_info_from_rpc } from "../utils/supported_chains";
import { LiquidityRequestType } from "../enums/liquidity_request_type";
import { VaultIndex } from "../models/vault_index";
import { NamedEntityMap } from "../interfaces/named_entity_map";

// All chains connection instances
const connections: NamedEntityMap<CosmWasmClient> = {};


// TODO: optimize the use of this function
export async function get_connection(rpc: string): Promise<CosmWasmClient> {
    // Return an existing connection
    if (connections[rpc]) {
        return connections[rpc];
    }

    // Throws error when the rpc is not supported
    if (!Boolean(get_chain_info_from_rpc(rpc))) {
        throw new Error('selected network not whitelisted');
    }

    // Create a new connection if no instance already exists
    const client = await CosmWasmClient.connect(rpc);
    connections[rpc] = client;
    return client;
}

export function index_vault_data({ vault_info, staking_info, rpc, include_request_state }:
    { vault_info: JsonObject, staking_info: JsonObject, rpc: string, include_request_state?: boolean }) {
    const chain_info = get_chain_info_from_rpc(rpc);
    const stakingDenomDecimal = chain_info.stakeCurrency.coinDecimals;
    const index: VaultIndex = {
        from_code_id: vault_info['config']['from_code_id'],
        index_number: vault_info['config']['index_number'],
        owner: vault_info['config']['owner'],
        liquidity_request_status: 'idle',
        tvl: convertMicroDenomToDenom(staking_info.total_staked, stakingDenomDecimal)
    };

    if (Boolean(vault_info['liquidity_request'])) {
        const msg = vault_info['liquidity_request']['msg'];
        index.liquidity_request_status = Boolean(vault_info['liquidity_request']['state']) ? 'active' : 'pending';

        // Index fixed_interest_rental
        if (Boolean(msg['fixed_interest_rental'])) {
            const request_denom = msg['fixed_interest_rental']['requested_amount']['denom'];
            const request_currency = chain_info.request_currencies.find(currency => currency.coinMinimalDenom === request_denom);

            index.request_type = LiquidityRequestType.fixed_interest_rental;
            index.requested_amount = {
                denom: request_denom,
                amount: convertMicroDenomToDenom(msg['fixed_interest_rental']['requested_amount']['amount'], request_currency.coinDecimals)
            };
            index.can_cast_vote = msg['fixed_interest_rental']['can_cast_vote'];
            index.claimable_tokens = convertMicroDenomToDenom(msg['fixed_interest_rental']['claimable_tokens'], stakingDenomDecimal);
        }

        // Index fixed_term_rental
        if (Boolean(msg['fixed_term_rental'])) {
            const request_denom = msg['fixed_term_rental']['requested_amount']['denom'];
            const request_currency = chain_info.request_currencies.find(currency => currency.coinMinimalDenom === request_denom);

            index.request_type = LiquidityRequestType.fixed_term_rental;
            index.requested_amount = {
                denom: request_denom,
                amount: convertMicroDenomToDenom(msg['fixed_term_rental']['requested_amount']['amount'], request_currency.coinDecimals)
            };
            index.can_cast_vote = msg['fixed_term_rental']['can_cast_vote'];
            index.duration_in_seconds = msg['fixed_term_rental']['duration_in_seconds'];
        }

        // Index fixed_term_loan
        if (Boolean(msg['fixed_term_loan'])) {
            const request_denom = msg['fixed_term_loan']['requested_amount']['denom'];
            const request_currency = chain_info.request_currencies.find(currency => currency.coinMinimalDenom === request_denom);

            index.request_type = LiquidityRequestType.fixed_term_loan;
            index.requested_amount = {
                denom: request_denom,
                amount: convertMicroDenomToDenom(msg['fixed_term_loan']['requested_amount']['amount'], request_currency.coinDecimals)
            };
            index.duration_in_seconds = msg['fixed_term_loan']['duration_in_seconds'];
            index.interest_amount = convertMicroDenomToDenom(msg['fixed_term_loan']['interest_amount'], request_currency.coinDecimals);
            index.collateral_amount = convertMicroDenomToDenom(msg['fixed_term_loan']['collateral_amount'], stakingDenomDecimal);
        }

        // Index state data for active liquidity requests
        if (index.liquidity_request_status === 'active') {
            index.lender = vault_info['liquidity_request']['lender'];

            if (include_request_state) {
                const state = vault_info['liquidity_request']['state'];

                if (Boolean(state['FixedInterestRental'])) {
                    index.already_claimed = convertMicroDenomToDenom(state['FixedInterestRental']['already_claimed'], stakingDenomDecimal);
                }

                if (Boolean(state['FixedTermRental'])) {
                    index.end_time = secondsToDhms(new Date(Number(state['FixedTermRental']['end_time']) / 1000000));
                }

                if (Boolean(state['FixedTermLoan'])) {
                    index.end_time = secondsToDhms(new Date(Number(state['FixedTermLoan']['end_time']) / 1000000));
                    index.processing_liquidation = state['FixedTermLoan']['processing_liquidation'];
                    index.already_claimed = convertMicroDenomToDenom(state['FixedTermLoan']['already_claimed'], stakingDenomDecimal);
                }
            }
        }
    }

    // Add voter property to the indexed vault data
    const lender_can_vote = index.can_cast_vote && Boolean(index.lender);
    index.active_voter = lender_can_vote ? index.lender : index.owner;

    // Add timestamp when this vault was indexed
    index.indexed_at = new Date();
    return index;
}
