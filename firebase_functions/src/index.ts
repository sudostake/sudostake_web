/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { applyCorsHeaders, isPreflightRequest } from "./utils/apply_cors";
import { CONTRACT_WHITELIST, getVaultState } from "./utils/get_vault_state";
import { transformVaultState } from "./utils/transform_vault_state";

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

export const index_vault = onRequest(async (req, res) => {
    applyCorsHeaders(res);

    if (isPreflightRequest(req)) {
        res.status(204).send("");
        return;
    }

    if (req.method !== "POST") {
        res.set("Allow", "POST").status(405)
            .send("Method Not Allowed");
        return;
    }

    try {
        const { vault } = req.body;
        const { state, suffix } = await getVaultState(vault);

        if (!state) {
            res.status(400).json({
                error: "Failed to fetch vault state",
            });
            return;
        }

        // Index into Firestore under collection = factory contract
        logger.info(
            `Indexing vault to Firestore: ${suffix}/${vault}`,
            state
        );

        const transformed = transformVaultState(state);
        await db.collection(suffix).doc(vault).set(transformed);

        res.status(200).json(transformed);
    } catch (err) {
        logger.error("Failed to fetch vault state", err);
        res.status(500).json({
            error: "Internal error",
            details: (err as Error).message,
        });
    }
});

export const get_user_vaults = onRequest(async (req, res) => {
    applyCorsHeaders(res);

    if (isPreflightRequest(req)) {
        res.status(204).send("");
        return;
    }

    if (req.method !== "GET") {
        res.set("Allow", "GET").status(405).send("Method Not Allowed");
        return;
    }

    const owner = req.query.owner as string;
    const factory_id = req.query.factory_id as string;

    if (!owner || !factory_id) {
        res.status(400).json({
            error: "Missing 'owner' or 'factory_id' query parameter",
        });
        return;
    }

    if (!CONTRACT_WHITELIST[factory_id]) {
        res.status(403).json({ error: "Unauthorized factory_id" });
        return;
    }

    try {
        const snapshot = await db.collection(factory_id)
            .where("owner", "==", owner)
            .get();

        const vault_ids = snapshot.docs.map((doc) => doc.id);
        res.status(200).json(vault_ids);
    } catch (err) {
        logger.error("Failed to fetch user vaults", err);
        res.status(500).json({
            error: "Internal error", details: (err as Error).message,
        });
    }
});

export const view_pending_liquidity_requests = onRequest(async (req, res) => {
    applyCorsHeaders(res);

    if (isPreflightRequest(req)) {
        res.status(204).send("");
        return;
    }

    if (req.method !== "GET") {
        res.set("Allow", "GET").status(405).send("Method Not Allowed");
        return;
    }

    const factory_id = req.query.factory_id as string;

    if (!factory_id) {
        res.status(400).json({ error: "Missing 'factory_id' query parameter" });
        return;
    }

    if (!CONTRACT_WHITELIST[factory_id]) {
        res.status(403).json({ error: "Unauthorized factory_id" });
        return;
    }

    try {
        const snapshot = await db
            .collection(factory_id)
            .where("state", "==", "pending")
            .get();

        const pendingVaults = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(pendingVaults);
    } catch (err) {
        logger.error("Failed to fetch pending liquidity requests", err);
        res.status(500).json({
            error: "Internal error",
            details: (err as Error).message,
        });
    }
});

export const view_lender_positions = onRequest(async (req, res) => {
    applyCorsHeaders(res);

    if (isPreflightRequest(req)) {
        res.status(204).send("");
        return;
    }

    if (req.method !== "GET") {
        res.set("Allow", "GET").status(405).send("Method Not Allowed");
        return;
    }

    const factory_id = req.query.factory_id as string;

    if (!factory_id) {
        res.status(400).json({ error: "Missing 'factory_id' query parameter" });
        return;
    }

    if (!CONTRACT_WHITELIST[factory_id]) {
        res.status(403).json({ error: "Unauthorized factory_id" });
        return;
    }

    const lender_id = req.query.lender_id as string;

    if (!lender_id) {
        res.status(400).json({ error: "Missing 'lender_id' query parameter" });
        return;
    }

    try {
        const snapshot = await db
            .collection(factory_id)
            .where("accepted_offer.lender", "==", lender_id)
            .orderBy("accepted_offer.accepted_at", "desc")
            .get();

        const lender_positions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(lender_positions);
    } catch (err) {
        logger.error("Failed to fetch lender positions", err);
        res.status(500).json({
            error: "Internal error",
            details: (err as Error).message,
        });
    }
});
