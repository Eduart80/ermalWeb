(function () {
  var overlay = document.getElementById('ad-overlay');
  var timerEl = document.getElementById('ad-timer');
  var closeBtn = document.getElementById('ad-close-btn');
  var seconds = 5;

  function closeAd() {
    overlay.style.display = 'none';
  }

  var countdown = setInterval(function () {
    seconds--;
    timerEl.textContent = 'Closes in ' + seconds + 's';
    if (seconds <= 0) {
      clearInterval(countdown);
      closeAd();
    }
  }, 1000);

  // Close when clicking the backdrop (outside the image)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      clearInterval(countdown);
      closeAd();
    }
  });

  // Close button
  closeBtn.addEventListener('click', function () {
    clearInterval(countdown);
    closeAd();
  });
})();
