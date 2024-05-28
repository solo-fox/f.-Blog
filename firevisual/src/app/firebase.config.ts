// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyATY1NOkREit8-4js4ZD9Y8PFe5btpYx3M",
  authDomain: "firevisual-35cc7.firebaseapp.com",
  projectId: "firevisual-35cc7",
  storageBucket: "firevisual-35cc7.appspot.com",
  messagingSenderId: "569598924621",
  appId: "1:569598924621:web:9fa0856b703ea0e4484904",
  measurementId: "G-VC31LCBYPZ"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}
// Initialize Firebase auth
export const auth = getAuth();