document.addEventListener("DOMContentLoaded", () => {
  // 1. Automatické propisování kontaktů z config.js do celého webu
  if (typeof ELMONT_CONFIG !== "undefined") {
    document.querySelectorAll("[data-contact]").forEach((el) => {
      const key = el.getAttribute("data-contact");
      if (ELMONT_CONFIG[key]) {
        el.textContent = ELMONT_CONFIG[key];
      }
    });

    document.querySelectorAll("[data-contact-href]").forEach((el) => {
      const key = el.getAttribute("data-contact-href");
      if (ELMONT_CONFIG[key]) {
        el.setAttribute("href", ELMONT_CONFIG[key]);
      }
    });
  }

  // 2. Mobilní menu
  const toggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  }

  // 3. Předvyplnění zprávy na stránce kontakt.html (z kalkulačky nebo služeb)
  const zpravaInput = document.getElementById("zprava");
  if (zpravaInput) {
    const params = new URLSearchParams(window.location.search);
    const poptavka = params.get("poptavka") || localStorage.getItem("elmont_poptavka");
    if (poptavka) {
      zpravaInput.value = poptavka;
      localStorage.removeItem("elmont_poptavka");
    }
  }
});

// Přepínač 3 vodičů (L / PE / N) na úvodní stránce
function switchWire(wire, btn) {
  document.querySelectorAll(".wire-tab").forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".wire-panel").forEach((p) => (p.style.display = "none"));
  const panel = document.getElementById("panel-" + wire);
  if (panel) panel.style.display = "block";
}

// Kopírování e-mailu na kliknutí
function copyEmail() {
  if (typeof ELMONT_CONFIG === "undefined") return;
  navigator.clipboard.writeText(ELMONT_CONFIG.email);
  const badge = document.getElementById("copyStatus");
  if (badge) {
    badge.style.display = "inline-block";
    setTimeout(() => (badge.style.display = "none"), 2500);
  }
}
