document.addEventListener('DOMContentLoaded', function() {
  const calendar = document.getElementById('calendar');

  if (calendar) {
      calendar.addEventListener('click', function() {
    
      // Call the function to toggle visibility
      toggleVisibilityBasedOnChildren('time-slots');
      toggleVisibilityBasedOnChildren('booking-confirmation');
    });
  }
});

function toggleVisibilityBasedOnChildren(elementId) {
  const element = document.getElementById(elementId);
    element.style.display = 'block';
}
