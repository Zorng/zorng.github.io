// Native links and disclosure controls remain functional without JavaScript.
document.getElementById('year').textContent = new Date().getFullYear();
const navigationLinks = [...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navigationLinks) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
function applyTheme(theme) {
  const isLight = theme === 'light';
  document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
  themeToggle.setAttribute('aria-checked', String(isLight));
  themeColor.content = isLight ? '#f5f7fb' : '#0c1017';
}
applyTheme(document.documentElement.dataset.theme);
themeToggle.hidden = false;
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch (_) { /* Switching still works without storage. */ }
});
