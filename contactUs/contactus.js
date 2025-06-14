document.getElementById('contact-form').addEventListener('submit', function(event) {
  const phoneInput = document.getElementById('phNumber');
  const phonePattern = /^[0-9]{10}$/;

  if (!phonePattern.test(phoneInput.value)) {
      alert('Please enter a valid 10-digit phone number.');
      event.preventDefault();
      return false;
  }
});

function validateForm() {
  let userName = document.getElementById("name").value;
  let userEmail = document.getElementById("email").value;

  let nameRegex = /^[a-zA-Z\s]+$/; // Allows letters and spaces
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format

  if (!nameRegex.test(userName)) {
      document.getElementById("name").value = "";
      alert("Please use correct name information!");
      return false;
  }

  if (!emailRegex.test(userEmail)) {
      document.getElementById("email").value = "";
      alert("Please use a correct email format!");
      return false;
  }

  return true;
}

// Phone number input validation
document.getElementById('phNumber').addEventListener('input', function(e) {
  this.value = this.value.replace(/[^0-9]/g, '');
  if (this.value.length > 10) {
      this.value = this.value.slice(0, 10);
  }
});

// Add error message display
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-error';
  errorDiv.textContent = message;
  document.querySelector('.contact-form').prepend(errorDiv);
  setTimeout(() => errorDiv.remove(), 5000);
}

// Add this to your contactus.js
document.addEventListener('DOMContentLoaded', function() {
  const alert = document.querySelector('.alert-success');
  if(alert) {
      setTimeout(() => {
          alert.style.opacity = '0';
          setTimeout(() => alert.remove(), 500);
      }, 5000);
  }
});