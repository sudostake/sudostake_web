import * as admin from 'firebase-admin';
import { NamedEntityMap } from '../interfaces/named_entity_map';

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
export const set = (docRef: string, data: NamedEntityMap<any>): Promise<any> => {
    return admin.firestore().doc(docRef).set(data);
}
