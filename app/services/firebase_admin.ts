import * as admin from 'firebase-admin';
import { IObjectMap } from '../utils/interface';

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

// Export Method to set data
export const set = (docRef: string, data: IObjectMap<any>): Promise<any> => {
    return admin.firestore().doc(docRef).set(data);
}
