import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
export const storage = getStorage(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistence failed: Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    console.warn('Persistence not available');
  }
});

export default app;