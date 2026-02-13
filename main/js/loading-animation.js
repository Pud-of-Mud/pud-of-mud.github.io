function isInViewport(el) {
  const rect = el.getBoundingClientRect();

   // add an offset of 200 to change when the elements will fade in
  const offset = 200;

  return (
    rect.top >= 0 &&
    rect.top + offset <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function fadeIn() {
  document.querySelectorAll('.fade-in').forEach(fadeIn => {
    if (isInViewport(fadeIn)) {        
      fadeIn.classList.add('is-faded');
    }
  });
}

// run this on page load to fade in any elements already in view
fadeIn();

// run fadeIn() as user scrolls page to look for elements coming into view
document.addEventListener('scroll', function () {
  fadeIn();
}, {
    passive: true
});