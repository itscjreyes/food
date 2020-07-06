import firebase from 'firebase';

const key = process.env.FIREBASE_KEY;
const id = process.env.FIREBASE_ID;

const config = {
    apiKey: key,
    authDomain: "food-da64a.firebaseapp.com",
    databaseURL: "https://food-da64a.firebaseio.com",
    projectId: "food-da64a",
    storageBucket: "food-da64a.appspot.com",
    messagingSenderId: "502897490499",
    appId: id,
};

firebase.initializeApp(config);
const storage = firebase.storage()

export default firebase;