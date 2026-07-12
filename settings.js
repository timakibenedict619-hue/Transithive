// js/settings.js

import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const SETTINGS_DOC = "general";

// Load Website Settings
export async function loadSettings() {

    try {

        const ref = doc(db, "settings", SETTINGS_DOC);

        const snap = await getDoc(ref);

        if (!snap.exists()) {

            return {
                companyName: "SwiftTrans Logistics",
                companyEmail: "",
                companyPhone: "",
                companyAddress: "",
                supportEmail: "",
                website: "",
                trackingPrefix: "ST",
                currency: "USD"
            };

        }

        return snap.data();

    } catch (error) {

        console.error(error);

        return null;

    }

}

// Save Website Settings
export async function saveSettings(settings) {

    try {

        const ref = doc(db, "settings", SETTINGS_DOC);

        await setDoc(ref, {

            companyName: settings.companyName,

            companyEmail: settings.companyEmail,

            companyPhone: settings.companyPhone,

            companyAddress: settings.companyAddress,

            supportEmail: settings.supportEmail,

            website: settings.website,

            trackingPrefix: settings.trackingPrefix,

            currency: settings.currency,

            updatedAt: serverTimestamp()

        });

        alert("Settings saved successfully.");

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// Generate Tracking ID
export function generateTrackingNumber(prefix = "ST") {

    const random = Math.floor(10000000 + Math.random() * 90000000);

    return `${prefix}${random}`;

}
