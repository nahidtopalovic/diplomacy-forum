import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            private_key: process.env.FIREBASE_PRIVATE_KEY,
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    });
}

const firestoreAdmin = admin.firestore();
const authAdmin = admin.auth();

export { firestoreAdmin, authAdmin };
