export function menu() {
  const button = document.querySelector('.mobile-menu');
  const navigation = document.querySelector('#main-navigation');
  const smallScreen = window.matchMedia('(max-width: 1100px)');
  function close(returnFocus = false) {
    navigation.classList.remove('active');
    button.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menu');
    if (returnFocus) button.focus();
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
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    close();
    const section = document.querySelector(link.getAttribute('href'));
    if (section) {
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
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
