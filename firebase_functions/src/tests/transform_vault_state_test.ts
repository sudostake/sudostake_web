import { transformVaultState } from "../utils/transform_vault_state";
import { Timestamp } from "firebase-admin/firestore";


describe("transformVaultState", () => {
    const baseState = {
        owner: "test.near",
    };

    it("returns idle state when no liquidity_request", () => {
        const result = transformVaultState(baseState);
        expect(result).toEqual({
            owner: "test.near",
            state: "idle",
        });
    });

    it("returns pending state when liquidity_request exists but no accepted_offer", () => {
        const result = transformVaultState({
            ...baseState,
            liquidity_request: {
                token: "usdc.testnet",
                amount: "1000000",
                interest: "5",
                collateral: "100000000",
                duration: 3600,
            },
        });

        expect(result).toEqual({
            owner: "test.near",
            state: "pending",
            liquidity_request: {
                token: "usdc.testnet",
                amount: "1000000",
                interest: "5",
                collateral: "100000000",
                duration: 3600,
            },
        });
    });

    it("returns active state when both liquidity_request and accepted_offer exist", () => {
        const acceptedAtNs = 1_713_248_000_000_000_000; // ns
        const result = transformVaultState({
            ...baseState,
            liquidity_request: {
                token: "usdc.testnet",
                amount: "1000000",
                interest: "5",
                collateral: "100000000",
                duration: 86400,
            },
            accepted_offer: {
                lender: "lender.near",
                accepted_at: acceptedAtNs,
            },
        });

        expect(result.state).toBe("active");

        expect(result.accepted_offer).toEqual({
            lender: "lender.near",
            accepted_at: Timestamp.fromMillis(Math.floor(acceptedAtNs / 1_000_000)),
        });

        expect(result.liquidity_request?.duration).toBe(86400);
    });

    it("includes liquidation field if present", () => {
        const result = transformVaultState({
            ...baseState,
            liquidation: {
                liquidated: "5000000000000000000000000",
            },
        });

        expect(result.liquidation).toEqual({
            liquidated: "5000000000000000000000000",
        });
    });
});
