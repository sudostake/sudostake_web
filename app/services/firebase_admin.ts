import * as admin from 'firebase-admin';
import { IObjectMap } from '../utils/generic_interface';

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (error) {
        console.log('Firebase admin initialization error', error.stack);
    }
}

// Init data
const db = admin.firestore();
const doc = (docRef: string): any => {
    return db.doc(docRef);
}

// Export Method to set data
export const set = (docRef: string, data: IObjectMap<any>): Promise<any> => {
    return doc(docRef).set(data);
}
