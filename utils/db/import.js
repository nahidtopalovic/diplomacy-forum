/* eslint-disable no-undef */
// Imports
// const firestoreService = require('firestore-export-import');
const { initializeApp, restore } = require('firestore-export-import');
const serviceAccount = require('./serviceAccount.json');

// JSON To Firestore

const jsonToFirestore = async () => {
    try {
        console.log('Initialzing Firebase');

        await initializeApp(serviceAccount);
        console.log('Firebase Initialized');

        await restore('./utils/db/mockData.json');
        console.log('Upload Success');
    } catch (error) {
        console.log(error);
    }
};

jsonToFirestore();
