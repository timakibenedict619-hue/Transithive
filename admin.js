import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const content = document.getElementById("content");

const dashboardBtn = document.getElementById("dashboardBtn");
const shipmentsBtn = document.getElementById("shipmentsBtn");
const trackingBtn = document.getElementById("trackingBtn");
const customersBtn = document.getElementById("customersBtn");
const settingsBtn = document.getElementById("settingsBtn");

// ---------------- Dashboard ----------------

async function loadDashboard() {

    content.innerHTML = `
        <h2 class="text-3xl font-bold mb-6">Dashboard</h2>

        <p class="text-gray-600">
            Loading dashboard...
        </p>
    `;

    try{

        const snapshot = await getDocs(collection(db,"shipments"));

        document.getElementById("totalShipments").textContent = snapshot.size;

        content.innerHTML = `
            <h2 class="text-3xl font-bold mb-6">
                Welcome Administrator
            </h2>

            <p class="text-gray-600">
                Use the menu on the left to manage shipments, tracking, customers and settings.
            </p>
        `;

    }catch(error){

        console.error(error);

        content.innerHTML = `
            <h2 class="text-2xl font-bold text-red-600">
                Failed to load dashboard.
            </h2>
        `;
    }

}

// ---------------- Shipments ----------------

async function loadShipments(){

    content.innerHTML=`
        <h2 class="text-3xl font-bold mb-6">
            Shipments
        </h2>

        <button
        class="bg-blue-600 text-white px-5 py-3 rounded-lg mb-6">
        + Create Shipment
        </button>

        <div id="shipmentList">
        Loading...
        </div>
    `;

    try{

        const snapshot=await getDocs(collection(db,"shipments"));

        let html="";

        if(snapshot.empty){

            html=`
            <div class="bg-yellow-100 p-5 rounded-lg">
            No shipments found.
            </div>
            `;

        }else{

            snapshot.forEach(doc=>{

                const s=doc.data();

                html+=`
                <div class="bg-white border rounded-lg p-5 mb-4 shadow">

                    <h3 class="font-bold text-lg">
                    ${s.trackingId || "-"}
                    </h3>

                    <p>
                    Customer:
                    ${s.customer || "-"}
                    </p>

                    <p>
                    Origin:
                    ${s.origin || "-"}
                    </p>

                    <p>
                    Destination:
                    ${s.destination || "-"}
                    </p>

                    <p>
                    Status:
                    <strong>${s.status || "Pending"}</strong>
                    </p>

                </div>
                `;
            });

        }

        document.getElementById("shipmentList").innerHTML=html;

    }catch(error){

        console.error(error);

        document.getElementById("shipmentList").innerHTML=
        "<p class='text-red-600'>Unable to load shipments.</p>";

    }

}

// ---------------- Tracking ----------------

function loadTracking(){

    content.innerHTML=`

    <h2 class="text-3xl font-bold mb-6">
    Tracking Updates
    </h2>

    <div class="bg-white rounded-lg shadow p-6">

        <p class="mb-4">
        Search and update shipment tracking.
        </p>

        <input
        class="border rounded-lg p-3 w-full mb-4"
        placeholder="Enter Tracking ID">

        <button
        class="bg-blue-600 text-white px-5 py-3 rounded-lg">

        Search Shipment

        </button>

    </div>

    `;

}

// ---------------- Customers ----------------

function loadCustomers(){

    content.innerHTML=`

    <h2 class="text-3xl font-bold mb-6">

    Customers

    </h2>

    <div class="bg-white rounded-lg shadow p-6">

    Customer management will be available here.

    </div>

    `;

}

// ---------------- Settings ----------------

function loadSettings(){

    content.innerHTML=`

    <h2 class="text-3xl font-bold mb-6">

    Settings

    </h2>

    <div class="bg-white rounded-lg shadow p-6">

    Website settings will appear here.

    </div>

    `;

}

// ---------------- Sidebar ----------------

dashboardBtn?.addEventListener("click",loadDashboard);

shipmentsBtn?.addEventListener("click",loadShipments);

trackingBtn?.addEventListener("click",loadTracking);

customersBtn?.addEventListener("click",loadCustomers);

settingsBtn?.addEventListener("click",loadSettings);

// ---------------- Start ----------------

loadDashboard();
