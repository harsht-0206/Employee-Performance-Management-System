// Replace these placeholder values with the configuration from Firebase Console.
// Firebase web config is not a password. Never put service-account keys here.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9imYGyLP7Lh9wSRLyIsfitNYvPppX_yk",
  authDomain: "employee-performance-b3037.firebaseapp.com",
  projectId: "employee-performance-b3037",
  storageBucket: "employee-performance-b3037.firebasestorage.app",
  messagingSenderId: "948905991840",
  appId: "1:948905991840:web:a4525494e22074ce63b3c5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
