// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1rb8p4KsKaxQK_QVtjWbFE5IStV1F5CI",
  authDomain: "swifttrans-logistics.firebaseapp.com",
  projectId: "swifttrans-logistics",
  storageBucket: "swifttrans-logistics.firebasestorage.app",
  messagingSenderId: "336087148680",
  appId: "1:336087148680:web:d3fb690dd18d2337ca973d",
  measurementId: "G-0W702ZGW7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
