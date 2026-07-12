import {db} from './firebase.js';
import {collection,getDocs} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
const body=document.getElementById('rows');
const snap=await getDocs(collection(db,'shipments'));
snap.forEach(d=>{const s=d.data();body.innerHTML+=`<tr><td>${s.trackingId}</td><td>${s.status}</td><td><a href="shipment-details.html?id=${d.id}">View</a></td></tr>`});