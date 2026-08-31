import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Google Authentication Provider
const googleProvider = new GoogleAuthProvider();


// If already logged in, go directly to admin dashboard
onAuthStateChanged(auth, (user) => {

    if (user) {
        window.location.href = "dashboard.html";
    }

});


// ===============================
// EMAIL + PASSWORD LOGIN
// ===============================

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const error =
        document.getElementById("error");

    error.textContent = "";

    if (!email || !password) {

        error.textContent =
            "Please enter your email and password.";

        return;

    }

    try {

        loginBtn.disabled = true;
        loginBtn.textContent = "Signing in...";

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        window.location.href = "dashboard.html";

    } catch (err) {

        console.error(err);

        error.textContent =
            err.message;

        loginBtn.disabled = false;
        loginBtn.textContent = "Login";

    }

});


// ===============================
// GOOGLE LOGIN
// ===============================

const googleLoginBtn =
    document.getElementById("googleLoginBtn");


googleLoginBtn.addEventListener("click", async () => {

    const error =
        document.getElementById("error");

    error.textContent = "";

    try {

        googleLoginBtn.disabled = true;

        googleLoginBtn.innerHTML =
            "Signing in with Google...";


        await signInWithPopup(
            auth,
            googleProvider
        );


        // Firebase authentication successful
        window.location.href =
            "dashboard.html";


    } catch (err) {

        console.error(err);

        error.textContent =
            err.message;


        googleLoginBtn.disabled = false;

        googleLoginBtn.innerHTML =
            '<span class="google-icon">G</span><span>Continue with Google</span>';

    }

});
