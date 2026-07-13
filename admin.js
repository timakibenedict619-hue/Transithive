import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ===========================
// GET HTML ELEMENTS
// ===========================

const content = document.getElementById("content");

const dashboardBtn = document.getElementById("dashboardBtn");
const shipmentsBtn = document.getElementById("shipmentsBtn");
const trackingBtn = document.getElementById("trackingBtn");
const customersBtn = document.getElementById("customersBtn");
const settingsBtn = document.getElementById("settingsBtn");

// ===========================
// SIDEBAR EVENTS
// ===========================

dashboardBtn?.addEventListener("click", () => {

    loadDashboard();

});

shipmentsBtn?.addEventListener("click", () => {

    loadShipments();

});

trackingBtn?.addEventListener("click", () => {

    loadTracking();

});

customersBtn?.addEventListener("click", () => {

    loadCustomers();

});

settingsBtn?.addEventListener("click", () => {

    loadSettings();

});

// ===========================
// DASHBOARD
// ===========================

async function loadDashboard() {
// ===========================
// SHIPMENTS
// ===========================

async function loadShipments() {

    content.innerHTML = `
        <div class="flex justify-between items-center mb-6">

            <h2 class="text-3xl font-bold">
                Shipments
            </h2>

            <button
                id="createShipmentBtn"
                class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">

                + Create Shipment

            </button>

        </div>

        <div id="shipmentList">

            Loading shipments...

        </div>
    `;

    document
        .getElementById("createShipmentBtn")
        .addEventListener("click", showCreateShipmentForm);

    try {

        const snapshot = await getDocs(collection(db, "shipments"));

        let html = "";

        if (snapshot.empty) {

            html = `
                <div class="bg-yellow-100 text-yellow-800 p-5 rounded-lg">

                    No shipments found.

                </div>
            `;

        } else {

            snapshot.forEach(doc => {

                const shipment = doc.data();

                html += `

                <div class="bg-white rounded-xl shadow p-5 mb-4 border">

                    <div class="flex justify-between">

                        <div>

                            <h3 class="font-bold text-lg">

                                ${shipment.trackingId}

                            </h3>

                            <p>

                                <strong>Customer:</strong>

                                ${shipment.customer}

                            </p>

                            <p>

                                <strong>Origin:</strong>

                                ${shipment.origin}

                            </p>

                            <p>

                                <strong>Destination:</strong>

                                ${shipment.destination}

                            </p>

                            <p>

                                <strong>Status:</strong>

                                ${shipment.status}

                            </p>

                        </div>

                    </div>

                </div>

                `;

            });

        }

        document.getElementById("shipmentList").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("shipmentList").innerHTML = `

            <p class="text-red-600">

                Unable to load shipments.

            </p>

        `;

    }

}

// ===========================
// CREATE SHIPMENT FORM
// ===========================

function showCreateShipmentForm() {

    content.innerHTML = `

    <h2 class="text-3xl font-bold mb-6">

        Create Shipment

    </h2>

    <div class="bg-white rounded-xl shadow p-6 space-y-4">

        <input
            id="customer"
            class="w-full border rounded-lg p-3"
            placeholder="Customer Name">

        <input
            id="email"
            class="w-full border rounded-lg p-3"
            placeholder="Customer Email">

        <input
            id="phone"
            class="w-full border rounded-lg p-3"
            placeholder="Phone Number">

        <input
            id="origin"
            class="w-full border rounded-lg p-3"
            placeholder="Origin">

        <input
            id="destination"
            class="w-full border rounded-lg p-3"
            placeholder="Destination">

        <select
            id="status"
            class="w-full border rounded-lg p-3">

            <option>Pending</option>
            <option>In Transit</option>
            <option>Delivered</option>

        </select>

        <button
            id="saveShipmentBtn"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">

            Save Shipment

        </button>

    </div>

    `;

    document
        .getElementById("saveShipmentBtn")
        .addEventListener("click", saveShipment);

}

// ===========================
// SAVE SHIPMENT
// ===========================

async function saveShipment() {

    try {

        const shipment = {

            trackingId:
                "ST" +
                Math.floor(
                    100000000 + Math.random() * 900000000
                ),

            customer:
                document.getElementById("customer").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            origin:
                document.getElementById("origin").value,

            destination:
                document.getElementById("destination").value,

            status:
                document.getElementById("status").value,

            createdAt:
                new Date()

        };

        await addDoc(
            collection(db, "shipments"),
            shipment
        );

        alert("Shipment created successfully.");

        loadShipments();

    } catch (error) {

        console.error(error);

        alert("Failed to create shipment.");

    }

      }
    content.innerHTML = `
        <h2 class="text-3xl font-bold mb-5">
            Dashboard
        </h2>

        <p class="text-gray-600">
            Loading dashboard...
        </p>
    `;

    try {

        const snapshot = await getDocs(
            collection(db, "shipments")
        );

        document.getElementById("totalShipments").textContent =
            snapshot.size;

        content.innerHTML = `
            <h2 class="text-3xl font-bold mb-5">
                Welcome Administrator
            </h2>

            <p class="text-gray-600">
                SwiftTrans Logistics Admin System is connected successfully.
            </p>
        `;

    } catch (error) {

        console.error(error);

        content.innerHTML = `
            <h2 class="text-red-600 text-2xl">
                Dashboard failed to load.
            </h2>
        `;

    }

}
