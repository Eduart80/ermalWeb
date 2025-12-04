window.addEventListener("load", function () {
    // Set a timeout to hide the overlay after 30 seconds
    setTimeout(function () {
      const overlay = document.getElementById("page-overlay");
      if (overlay) {
        overlay.style.display = "none"; // Hide the overlay
      }
    },30000); // 30 seconds
  });
   // Close the overlay when clicking outside the content
  document.getElementById("page-overlay").addEventListener("click", function (event) {
    // Check if the click is outside the overlay content
    if (!event.target.closest(".overlay-content")) {
      this.style.display = "none"; // Hide the overlay
    }
  });