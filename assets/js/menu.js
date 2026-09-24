export function menu() {
  const button = document.querySelector('.mobile-menu');
  const navigation = document.querySelector('#main-navigation');
  const smallScreen = window.matchMedia('(max-width: 1100px)');
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  function close(returnFocus = false) {
    navigation.classList.remove('active');
    button.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menu');
    if (returnFocus) button.focus();
  }
  const initialSection = window.location.hash ? document.querySelector(window.location.hash) : null;
  const alignInitialSection = () => {
    if (initialSection) initialSection.scrollIntoView({ behavior: 'auto', block: 'start' });
  };
  if (initialSection) {
    window.requestAnimationFrame(() => window.requestAnimationFrame(alignInitialSection));
    window.addEventListener('load', alignInitialSection, { once: true });
  }
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-expanded') === 'true') return close();
    navigation.classList.add('active');
    button.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Fechar menu');
    document.dispatchEvent(new Event('menuopen'));
    navigation.querySelector('a').focus();
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', event => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    event.preventDefault();
    close();
    section.setAttribute('tabindex', '-1');
    const reduceMotion = document.documentElement.dataset.motion === 'reduce' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', link.getAttribute('href'));
    window.setTimeout(() => section.focus({ preventScroll: true }), reduceMotion ? 0 : 350);
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('active')) close(true);
  });
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target) && !button.contains(event.target)) close();
  });
  document.addEventListener('accessibilityopen', () => close());
  smallScreen.addEventListener('change', () => close());
}
