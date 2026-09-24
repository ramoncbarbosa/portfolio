export function skillsCarousel() {
  const track = document.querySelector('#skills-track');
  const controls = document.querySelector('.skills-controls');
  const previous = document.querySelector('#skills-prev');
  const next = document.querySelector('#skills-next');
  const smallScreen = matchMedia('(max-width: 1100px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function update() {
    const scrollable = smallScreen.matches && track.scrollWidth > track.clientWidth + 2;
    controls.hidden = !scrollable;
    if (scrollable) {
      track.setAttribute('tabindex', '0');
      track.setAttribute('aria-describedby', 'skills-hint');
    } else {
      track.removeAttribute('tabindex');
      track.removeAttribute('aria-describedby');
    }
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  function move(direction) {
    const instant = reducedMotion.matches || document.documentElement.dataset.motion === 'reduce';
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: instant ? 'instant' : 'smooth' });
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (!smallScreen.matches || event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: 'instant' });
    }
  });
  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);
  smallScreen.addEventListener('change', update);
  document.addEventListener('preferenceschange', () => requestAnimationFrame(update));
  update();
}
