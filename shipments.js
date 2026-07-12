import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const shipmentsCollection = collection(db, "shipments");

// Generate Tracking ID
export function generateTrackingId() {
    return "ST-" + Date.now().toString().slice(-8);
}

// Create Shipment
export async function createShipment(data) {

    try {

        const shipment = {
            trackingId: generateTrackingId(),
            customer: data.customer,
            sender: data.sender || "",
            email: data.email || "",
            phone: data.phone || "",
            origin: data.origin,
            destination: data.destination,
            status: "Pending",
            currentLocation: data.origin,
            createdAt: serverTimestamp()
        };

        await addDoc(shipmentsCollection, shipment);

        alert("Shipment created successfully.");

        return true;

    } catch (error) {

        console.error(error);
        alert(error.message);
        return false;

    }

}

// Load Shipments
export async function loadShipments() {

    const snapshot = await getDocs(shipmentsCollection);

    const shipments = [];

    snapshot.forEach(doc => {

        shipments.push({
            id: doc.id,
            ...doc.data()
        });

    });

    return shipments;

}
