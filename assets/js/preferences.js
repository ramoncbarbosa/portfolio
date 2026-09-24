(() => {
  const root = document.documentElement;
  const key = 'portfolio-preferences';
  const defaults = { theme: 'dark', textScale: 1, contrast: false, motion: false };
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key)) || {}; } catch { /* Storage may be disabled. */ }
  let preferences = {
    theme: saved.theme === 'light' ? 'light' : 'dark',
    textScale: [1, 1.125, 1.25, 1.375, 1.5].includes(saved.textScale) ? saved.textScale : 1,
    contrast: saved.contrast === true,
    motion: saved.motion === true,
  };
  function apply() {
    root.dataset.theme = preferences.theme;
    root.dataset.contrast = preferences.contrast ? 'high' : 'normal';
    root.dataset.motion = preferences.motion ? 'reduce' : 'normal';
    root.style.setProperty('--text-scale', preferences.textScale);
  }
  apply();

  document.addEventListener('DOMContentLoaded', () => {
    const theme = document.querySelector('#theme-toggle');
    const toggle = document.querySelector('#accessibility-toggle');
    const panel = document.querySelector('#accessibility-panel');
    const decrease = document.querySelector('#text-decrease');
    const increase = document.querySelector('#text-increase');
    const contrast = document.querySelector('#high-contrast');
    const motion = document.querySelector('#reduce-motion');
    function sync() {
      theme.setAttribute('aria-pressed', String(preferences.theme === 'light'));
      theme.setAttribute('aria-label', preferences.theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro');
      theme.title = theme.getAttribute('aria-label');
      document.querySelector('#text-size-value').value = `${Math.round(preferences.textScale * 100)}%`;
      decrease.disabled = preferences.textScale === 1;
      increase.disabled = preferences.textScale === 1.5;
      contrast.checked = preferences.contrast;
      motion.checked = preferences.motion;
    }
    function update(changes) {
      preferences = { ...preferences, ...changes };
      apply(); sync();
      try { localStorage.setItem(key, JSON.stringify(preferences)); } catch { /* Settings still work in memory. */ }
      document.dispatchEvent(new Event('preferenceschange'));
    }
    function closePanel(returnFocus = false) {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    }
    toggle.addEventListener('click', () => {
      const opening = panel.hidden;
      panel.hidden = !opening;
      toggle.setAttribute('aria-expanded', String(opening));
      if (opening) {
        document.dispatchEvent(new Event('accessibilityopen'));
        document.querySelector('#accessibility-close').focus();
      }
    });
    document.querySelector('#accessibility-close').addEventListener('click', () => closePanel(true));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) closePanel(true);
    });
    document.addEventListener('click', (event) => {
      if (!panel.hidden && !panel.contains(event.target) && !toggle.contains(event.target)) closePanel();
    });
    document.addEventListener('menuopen', () => closePanel());
    theme.addEventListener('click', () => update({ theme: preferences.theme === 'dark' ? 'light' : 'dark' }));
    decrease.addEventListener('click', () => update({ textScale: Math.max(1, preferences.textScale - 0.125) }));
    increase.addEventListener('click', () => update({ textScale: Math.min(1.5, preferences.textScale + 0.125) }));
    contrast.addEventListener('change', () => update({ contrast: contrast.checked }));
    motion.addEventListener('change', () => update({ motion: motion.checked }));
    document.querySelector('#reset-preferences').addEventListener('click', () => update(defaults));
    const header = document.querySelector('header');
    const measureHeader = () => root.style.setProperty('--header-height', `${Math.ceil(header.getBoundingClientRect().bottom)}px`);
    new ResizeObserver(measureHeader).observe(header);
    measureHeader(); sync();
  });
})();
