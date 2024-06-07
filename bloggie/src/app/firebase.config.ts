// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "firebase/app";
import {
  getAuth
} from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId
};


// Initialize Firebase auth
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(firebaseApp)