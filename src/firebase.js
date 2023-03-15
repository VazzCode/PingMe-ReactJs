import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyCzJnQH-h9Fvmrz7yzBW8Sr-56Zzd4nfg8",
    authDomain: "webapp-5c5c0.firebaseapp.com",
    projectId: "webapp-5c5c0",
    storageBucket: "webapp-5c5c0.appspot.com",
    messagingSenderId: "1034206825005",
    appId: "1:1034206825005:web:5991fa904cea74548506a4",
    measurementId: "G-648J0FK7DF"
  })

const auth = getAuth(app)
export {auth}
export const db = getFirestore(app);