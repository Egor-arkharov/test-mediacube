import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "test-ea-mediacube.firebaseapp.com",
  databaseURL: "https://test-ea-mediacube-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "test-ea-mediacube",
  storageBucket: "test-ea-mediacube.appspot.com",
  messagingSenderId: "501143151661",
  appId: process.env.FIREBASE_APIID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, remove, update };
