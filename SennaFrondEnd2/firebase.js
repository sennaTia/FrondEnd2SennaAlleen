// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANIyme6e9JON409t7avb8IE-qSJzL2nBw",
    authDomain: "frondend2.firebaseapp.com",
    projectId: "frondend2",
    storageBucket: "frondend2.firebasestorage.app",
    messagingSenderId: "65358997164",
    appId: "1:65358997164:web:72b2330775c8311812a109",
    measurementId: "G-B6S38DS8E6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);