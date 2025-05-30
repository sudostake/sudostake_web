import { getVaultState } from "../utils/get_vault_state";

jest.mock("near-api-js", () => {
    const original = jest.requireActual("near-api-js");
    return {
        ...original,
        providers: {
            JsonRpcProvider: jest.fn().mockImplementation(() => ({
                query: jest.fn().mockResolvedValue({
                    kind: "function_call",
                    result: Buffer.from(JSON.stringify({
                        owner: "test-owner.near",
                    })),
                    logs: [],
                }),
            })),
        },
    };
});

describe("getVaultState", () => {
    it("returns decoded state and suffix for testnet vault", async () => {
        const { state, suffix } = await getVaultState(
            "vault-123.nzaza.testnet"
        );

        expect(state).toEqual({ owner: "test-owner.near" });
        expect(suffix).toBe("nzaza.testnet");
    });

    it("returns decoded state and suffix for mainnet vault", async () => {
        const { state, suffix } = await getVaultState("vault-0.sudostake.near");

        expect(state).toEqual({ owner: "test-owner.near" });
        expect(suffix).toBe("sudostake.near");
    });

    it("throws error for unwhitelisted vault address", async () => {
        await expect(getVaultState("unlisted.near"))
            .rejects.toThrow("Vault address not allowed");
    });

    it("throws error for missing vault", async () => {
        // @ts-expect-error: intentionally testing invalid input
        await expect(getVaultState(undefined))
            .rejects.toThrow("Missing or invalid vault address");
    });
});
