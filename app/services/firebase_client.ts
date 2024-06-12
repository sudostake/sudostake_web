'use client'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";
import { PurchaseInfo } from "../utils/interface";

// Initialize Firebase App
const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

function get_analytics(): Analytics | null {
    if (app.name && typeof window !== 'undefined') {
        return getAnalytics(app);
    }

    return null;
}

// Init Analytics
const analytics = get_analytics();

// Export function to log purchase
export function record_purchase(purchase_info: PurchaseInfo) {
    if (Boolean(analytics)) {
        logEvent(analytics, 'purchase', purchase_info);
    }
}

// Export DB
export const db = getFirestore(app);
