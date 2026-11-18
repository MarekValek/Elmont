document.addEventListener('DOMContentLoaded', () => {
  // Mobilní navigace
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // Fallback pro obrázky ze složky images/, pokud ještě nejsou nahrané na disk
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', function () {
      if (this.dataset.applied) return;
      this.dataset.applied = 'true';
      const label = encodeURIComponent(this.alt || 'ELMONT');
      this.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230d1424"/><rect x="20" y="20" width="760" height="460" rx="16" fill="none" stroke="%23c6e62e" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="8 8"/><text x="400" y="245" fill="%23c6e62e" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle">${label}</text><text x="400" y="280" fill="%2394a3b8" font-family="sans-serif" font-size="14" text-anchor="middle">Nahrajte soubor do složky images/</text></svg>`;
    });
  });

  // Předvyplnění poptávky na stránce kontakt.html z kalkulačky nebo služeb
  const kontaktZprava = document.getElementById('zprava');
  if (kontaktZprava) {
    const params = new URLSearchParams(window.location.search);
    const poptavka = params.get('poptavka') || localStorage.getItem('elmont_poptavka');
    if (poptavka) {
      kontaktZprava.value = poptavka;
      localStorage.removeItem('elmont_poptavka');
    }
  }
});

// Přepínač 3 vodičů na úvodní stránce
function switchWire(wire, btn) {
  document.querySelectorAll('.wire-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.wire-panel').forEach(p => p.style.display = 'none');
  const activePanel = document.getElementById('panel-' + wire);
  if (activePanel) activePanel.style.display = 'block';
}
