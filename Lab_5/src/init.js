// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAoe4Ak3Ck3boVEqWNpWzP7TibxUs12Ms0",
  authDomain: "piw6-f9710.firebaseapp.com",
  projectId: "piw6-f9710",
  storageBucket: "piw6-f9710.appspot.com",
  messagingSenderId: "875017744219",
  appId: "1:875017744219:web:cb3bb932c5bb618b85b47e",
  measurementId: "G-F37HCTN7S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);