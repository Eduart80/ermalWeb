document.addEventListener('DOMContentLoaded', function() {
  // Update copyright year
  const yearSpan = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;

  // Handle menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

 // Close menu on outside click
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      navMenu.classList.remove('active');
    }
  });
  

  // Prevent closing menu on click inside
  navMenu.addEventListener('click', (event) => {
    event.stopPropagation();
  });


  // Handle "Back to Top" button
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Button redirect (if needed)
  const getStartedButton = document.getElementById('getStartedButton');
  if (getStartedButton) {
    getStartedButton.addEventListener('click', () => {
      window.location.href = 'contactUs.php';
    });
  }
});