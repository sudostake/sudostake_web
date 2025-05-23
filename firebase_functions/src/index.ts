/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import {applyCorsHeaders, isPreflightRequest} from "./utils/apply_cors";
import {CONTRACT_WHITELIST, getVaultState} from "./utils/get_vault_state";

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
        const {vault} = req.body;
        const {state, suffix} = await getVaultState(vault);

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
        await db.collection(suffix).doc(vault).
            set({owner: state.owner});

        res.status(200).json(state);
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
        res.status(403).json({error: "Unauthorized factory_id"});
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
