import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCG8CwdxdUQlC4bYOfxi6sppzGL5nO--8c",
  authDomain: "nel-grimorio-companion-app-cld.firebaseapp.com",
  projectId: "nel-grimorio-companion-app-cld",
  storageBucket: "nel-grimorio-companion-app-cld.firebasestorage.app",
  messagingSenderId: "636653022198",
  appId: "1:636653022198:web:459c396f561352209b75d7"
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