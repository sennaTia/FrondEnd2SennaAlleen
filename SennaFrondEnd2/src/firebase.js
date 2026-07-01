import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyANIyme6e9JON409t7avb8IE-qSJzL2nBw",
  authDomain: "frondend2.firebaseapp.com",
  projectId: "frondend2",
  storageBucket: "frondend2.firebasestorage.app",
  messagingSenderId: "65358997164",
  appId: "1:65358997164:web:72b2330775c8311812a109",
  measurementId: "G-B6S38DS8E6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const analytics = getAnalytics(app);
export default app;