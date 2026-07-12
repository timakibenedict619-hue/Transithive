// js/email.js

const EMAILJS_PUBLIC_KEY = "FG31F5ufeoDeU_npx";
const EMAILJS_SERVICE_ID = "service_7c141e5";
const EMAILJS_TEMPLATE_ID = "template_5dvj1lw";

// Initialize EmailJS
export function initializeEmail() {

    if (!window.emailjs) {
        console.error("EmailJS library not loaded.");
        return;
    }

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

}

// Send shipment email
export async function sendShipmentEmail({
    customerName,
    customerEmail,
    trackingId,
    status,
    origin,
    destination
}) {

    if (!window.emailjs) {
        throw new Error("EmailJS library is not loaded.");
    }

    return await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
            customer_name: customerName,
            customer_email: customerEmail,
            tracking_id: trackingId,
            shipment_status: status,
            shipment_origin: origin,
            shipment_destination: destination
        }
    );

}
