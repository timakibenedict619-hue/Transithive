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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// If already logged in, go to the admin dashboard
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "../admin.html";
  }
});

// Get page elements
const loginBtn = document.getElementById("loginBtn");
const error = document.getElementById("error");

// Login button
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  error.textContent = "";

  if (!email || !password) {
    error.textContent = "Please enter your email and password.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "../admin.html";

  } catch (err) {
    switch (err.code) {
      case "auth/invalid-credential":
        error.textContent = "Incorrect email or password.";
        break;
      case "auth/user-not-found":
        error.textContent = "Admin account not found.";
        break;
      case "auth/wrong-password":
        error.textContent = "Incorrect password.";
        break;
      case "auth/invalid-email":
        error.textContent = "Invalid email address.";
        break;
      default:
        error.textContent = err.message;
    }
  }
});
