
// Constants and global variables
const EMAIL_CONFIG = {
     //SERVICE_ID: "service_4fdhyzk",
    SERVICE_ID: process.env.SERVICE_ID,
    //TEMPLATE_ID: "template_z6qj346",
    TEMPLATE_ID: process.env.TEMPLATE_ID,
    //COM_TEMPLATE_ID:"template_5vn7gdi",
    COM_TEMPLATE_ID:process.env.COM_TEMPLATE_ID,
    //USER_ID: "SELPS1Q3isb2mYOFb",
    USER_ID: process.env.USER_ID,
    //COMPANY_EMAIL: "ermalhila@hotmail.com"
    COMPANY_EMAIL: process.env.COMPANY_EMAIL
};

console.log("EMAIL_CONFIG.SERVICE_ID = "+EMAIL_CONFIG.SERVICE_ID);

let selectedTimeSlot = null;
let selectedButton = null;
const bookedSlotsData = {};

function displayAvailableSlots(date) {
    const allSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
    const bookedSlots = bookedSlotsData[date] || [];
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    const timeSlotsDiv = document.getElementById("time-slots");
    
    timeSlotsDiv.style.display = "block";
    timeSlotsDiv.innerHTML = "";

    if (availableSlots.length === 0) {
        timeSlotsDiv.innerHTML = "<p>No available slots for this day.</p>";
    } else {
        availableSlots.forEach((slot) => {
            const button = document.createElement("button");
            button.textContent = slot;
            button.addEventListener('click', () => selectTimeSlot(slot, button));
            timeSlotsDiv.appendChild(button);
        });
    }
}

function selectTimeSlot(slot, button) {
    if (selectedButton) {
        selectedButton.classList.remove("selected");
    }
    selectedTimeSlot = slot;
    selectedButton = button;
    button.classList.add("selected");
    displayBookingConfirmation();
}


function displayBookingConfirmation() {
    const fullName = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    const confirmationDiv = document.getElementById("booking-confirmation");
    confirmationDiv.style.display = "block";
    confirmationDiv.innerHTML = `
        <h3>Booking Details</h3>
        <p><strong>Date:</strong> ${window.selectedDate}</p>
        <p><strong>Time:</strong> ${selectedTimeSlot}</p>
        <p><strong>Name:</strong> ${fullName || "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>Address:</strong> ${address || "Not provided"}</p>
        <button onclick="submitBooking()" class="confirm-btn">Confirm Booking</button>
        <button onclick="resetSelection()" class="cancel-btn">Change Selection</button>
    `;
   
}

function submitBooking() {
    const fullName = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    if (!validateBookingData(fullName, phone, email, address)) return;

    const confirmButton = document.querySelector('.confirm-btn');
    confirmButton.disabled = true;
    confirmButton.textContent = 'Sending...';
   
    // Send emails to both client and company
    Promise.all([
        sendCompanyEmail(fullName, email, phone, address),
        sendClientEmail(fullName, email, phone, address),
        
    ])
    .then(() => {
        alert('Booking confirmed! Check your email for details.');
        updateBookedSlots();
        resetSelection();
    })
    .catch(error => {
        console.error('Failed to send emails:', error);
        alert('Booking error. Please try again or contact us directly.');
    })
    .finally(() => {
        confirmButton.disabled = false;
        confirmButton.textContent = 'Confirm Booking';
    });
}

function validateBookingData(fullName, phone, email, address) {
    if (!window.selectedDate || !selectedTimeSlot || !fullName || !phone || !email || !address) {
        alert("Please fill in all fields and select a date and time slot.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    return true;
}

function sendClientEmail(fullName, email, phone, address) {
    
   
    const templateParams = {
         to_email: email,
        to_name: fullName,
        date: window.selectedDate,
        time: selectedTimeSlot,
        address: address,
        phone_number: phone,
    };

    return emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, templateParams);
}

function sendCompanyEmail() {
     const fullName = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    const templateParams = {
         to_email: EMAIL_CONFIG.COMPANY_EMAIL,
        client_name: fullName,
        client_email: email,
        client_phone: phone,
        date: window.selectedDate,
        time: selectedTimeSlot,
        address: address,
        message: `New booking received. Please update the calendar accordingly.`
    };

    return emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.COM_TEMPLATE_ID, templateParams);
}

function updateBookedSlots() {
    if (!bookedSlotsData[window.selectedDate]) {
        bookedSlotsData[window.selectedDate] = [];
    }
    bookedSlotsData[window.selectedDate].push(selectedTimeSlot);
}

function resetSelection() {
    window.selectedDate = null;
    selectedTimeSlot = null;
    if (selectedButton) {
        selectedButton.classList.remove("selected");
    }
    selectedButton = null;
    document.getElementById("time-slots").style.display = "none";
    document.getElementById("booking-confirmation").style.display = "none";
    document.getElementById("booking-form").reset();
}

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init(EMAIL_CONFIG.USER_ID);
});