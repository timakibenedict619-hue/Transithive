import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const content = document.getElementById("content");

// Sidebar buttons
const dashboardBtn = document.getElementById("dashboardBtn");
const shipmentsBtn = document.getElementById("shipmentsBtn");
const trackingBtn = document.getElementById("trackingBtn");
const customersBtn = document.getElementById("customersBtn");
const settingsBtn = document.getElementById("settingsBtn");

// Dashboard
dashboardBtn?.addEventListener("click", loadDashboard);

// Shipments
shipmentsBtn?.addEventListener("click", () => {
    content.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Shipments</h2>

        <button id="newShipmentBtn"
        class="bg-blue-600 text-white px-5 py-3 rounded mb-6">
            + Create Shipment
        </button>

        <div id="shipmentList">
            Loading shipments...
        </div>
    `;

    loadShipments();
});

// Tracking
trackingBtn?.addEventListener("click", () => {

    content.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">
            Tracking Updates
        </h2>

        <p>Select a shipment to update its tracking timeline.</p>
    `;

});

// Customers
customersBtn?.addEventListener("click", () => {

    content.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">
            Customers
        </h2>

        <p>Customer management will be added here.</p>
    `;

});

// Settings
settingsBtn?.addEventListener("click", () => {

    content.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">
            Settings
        </h2>

        <p>Website settings will appear here.</p>
    `;

});

// Dashboard loader
async function loadDashboard() {

    try {

        const snapshot = await getDocs(collection(db, "shipments"));

        document.getElementById("totalShipments").textContent =
            snapshot.size;

    } catch (error) {

        console.error(error);

    }

    content.innerHTML = `
        <h2 class="text-2xl font-bold">
            Welcome to SwiftTrans Admin
        </h2>

        <p class="mt-3">
            Select a menu from the left to manage the logistics system.
        </p>
    `;
}

// Shipment loader
async function loadShipments() {

    try {

        const snapshot = await getDocs(collection(db, "shipments"));

        let html = "";

        snapshot.forEach(doc => {

            const shipment = doc.data();

            html += `
                <div class="border rounded-lg p-4 mb-3 bg-white shadow">

                    <h3 class="font-bold">
                        ${shipment.trackingId}
                    </h3>

                    <p>
                        ${shipment.customer}
                    </p>

                    <p>
                        ${shipment.status}
                    </p>

                </div>
            `;

        });

        if (html === "") {

            html = "<p>No shipments found.</p>";

        }

        document.getElementById("shipmentList").innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

// Load dashboard automatically
loadDashboard();
