
  const track = document.querySelector('.testimonial-track');
  const cards = document.querySelectorAll('.testimonial');
  const leftBtn = document.querySelector('.nav-button.left');
  const rightBtn = document.querySelector('.nav-button.right');

  let index = 0;
  let cardWidth = 300 + 32; // card + margin
  let interval;

  function scrollToIndex(i) {
    const card = cards[i];
    const offsetLeft = card.offsetLeft;
    const viewWidth = track.parentElement.offsetWidth;
    const scrollOffset = offsetLeft - (viewWidth - card.offsetWidth) / 2;
    track.style.transform = `translateX(${-scrollOffset}px)`;
    index = i;
  }
  

  function next() {
    index = (index + 1) % cards.length;
    scrollToIndex(index);
  }

  function prev() {
    index = (index - 1 + cards.length) % cards.length;
    scrollToIndex(index);
  }

  function autoScroll() {
    interval = setInterval(next, 3500);
  }

  function stopAutoScroll() {
    clearInterval(interval);
  }

  leftBtn.addEventListener('click', () => {
    stopAutoScroll();
    prev();
  });

  rightBtn.addEventListener('click', () => {
    stopAutoScroll();
    next();
  });

  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      stopAutoScroll();
      scrollToIndex(i);
    });
  });

  // Start auto scroll
  autoScroll();
