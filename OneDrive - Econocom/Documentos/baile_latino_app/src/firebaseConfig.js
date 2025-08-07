// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⛔ Sustituye los valores por los tuyos desde Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyC6SMfP5jCCgPnsuncctMSREBXtMzSbdcI",
  authDomain: "baile-latino-app.firebaseapp.com",
  projectId: "baile-latino-app",
  storageBucket: "baile-latino-app.firebasestorage.app",
  messagingSenderId: "639461122814",
  appId: "1:639461122814:web:49c35cf9d98b1c19077baf",
  measurementId: "G-WV351VPFT4"
};

// Inicializar la app
const app = initializeApp(firebaseConfig);

// Exportar los servicios
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
