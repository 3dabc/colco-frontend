import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "colco-b2dcb.firebaseapp.com",
    projectId: "colco-b2dcb",
    storageBucket: "colco-b2dcb.firebasestorage.app",
    messagingSenderId: "1075069127435",
    appId: "1:1075069127435:web:59ab5c2361167904dbb00e",
    measurementId: "G-0Y4JRZW4K1"
  };
console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);