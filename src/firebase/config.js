import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
import { getEnviroments } from "../helpers";

// dev/prod
// const firebaseConfig = {
//     apiKey: "AIzaSyC5H4TKm3OG6sA_jXsxWt9Sc9iyXWFXKpE",
//     authDomain: "journal-app-63cf1.firebaseapp.com",
//     projectId: "journal-app-63cf1",
//     storageBucket: "journal-app-63cf1.firebasestorage.app",
//     messagingSenderId: "355219855152",
//     appId: "1:355219855152:web:a60f220b5c8998c91a5af5"
// };

// testing
const firebaseConfig = {
    apiKey: "AIzaSyCGZ460q2HhkKD1eutgMxo9Mutxl-FFgQY",
    authDomain: "journal-app-testing-6f2bf.firebaseapp.com",
    projectId: "journal-app-testing-6f2bf",
    storageBucket: "journal-app-testing-6f2bf.firebasestorage.app",
    messagingSenderId: "460522556749",
    appId: "1:460522556749:web:50e6fadedd23fbca237b04",
    measurementId: "G-43Y9HGW8NE"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB   = getFirestore(FirebaseApp)