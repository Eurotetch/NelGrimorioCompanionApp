// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 👇 INCOLLA QUI LE TUE CREDENZIALI FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAQc0MLTKCbWStSqPp0iYLb9UghGI_mprQ",
  authDomain: "nel-grimorio-app.firebaseapp.com",
  projectId: "nel-grimorio-app",
  storageBucket: "nel-grimorio-app.firebasestorage.app",
  messagingSenderId: "941937200372",
  appId: "1:941937200372:web:ed30a295569fff76bee2a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);