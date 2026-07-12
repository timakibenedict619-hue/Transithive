import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1rb8p4KsKaxQK_QVtjWbFE5IStV1F5CI",
  authDomain: "swifttrans-logistics.firebaseapp.com",
  projectId: "swifttrans-logistics",
  storageBucket: "swifttrans-logistics.firebasestorage.app",
  messagingSenderId: "336087148680",
  appId: "1:336087148680:web:d3fb690dd18d2337ca973d",
  measurementId: "G-0W702ZGW7M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// If already logged in, go to dashboard
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "admin.html";
  }
});

// Login Button
document.getElementById("loginBtn").addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const error = document.getElementById("error");
  error.textContent = "";

  try {

    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "admin.html";

  } catch (err) {

    error.textContent = err.message;

  }

});