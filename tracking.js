import { db } from "./firebase.js";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Find shipment by tracking ID
export async function findShipment(trackingId) {

  const q = query(
    collection(db, "shipments"),
    where("trackingId", "==", trackingId)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const shipment = snapshot.docs[0];

  return {
    id: shipment.id,
    ...shipment.data()
  };

}

// Update shipment tracking
export async function updateTracking(
  trackingId,
  status,
  location,
  message
) {

  const q = query(
    collection(db, "shipments"),
    where("trackingId", "==", trackingId)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Tracking ID not found.");
  }

  const shipmentRef = doc(db, "shipments", snapshot.docs[0].id);

  await updateDoc(shipmentRef, {

    status: status,

    currentLocation: location,

    updatedAt: serverTimestamp(),

    trackingHistory: arrayUnion({

      status: status,

      location: location,

      message: message,

      time: new Date().toISOString()

    })

  });

}
