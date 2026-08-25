const HASH_ROUTES = {
  "#anasayfa": "/",
  "#kulup": "/kulup.html",
  "#tarihce": "/tarihce.html",
  "#baskan": "/baskan.html",
  "#takimlar": "/takimlar.html",
  "#galeri": "/takimlar.html#galeri",
  "#fikstur": "/fikstur.html",
  "#iletisim": "/iletisim.html",
};

function redirectLegacyHash() {
  const path = window.location.pathname;
  const isHome = path === "/" || path.endsWith("/index.html");
  if (!isHome || !window.location.hash) return;
  const next = HASH_ROUTES[window.location.hash];
  if (next) window.location.replace(next);
}

redirectLegacyHash();

const IMAGE_PLAN = {
  hero: "/images/hero-stadium.jpg",
  president: "/images/president.jpg",
  history: "/images/tarihce-visual.jpg",
  aTeam: [
    "/images/teams/a-takimi/01.jpg",
    "/images/teams/a-takimi/02.jpg",
    "/images/teams/a-takimi/03.jpg",
    "/images/teams/a-takimi/04.jpg",
    "/images/teams/a-takimi/05.jpg",
    "/images/teams/a-takimi/06.jpg",
  ],
  minikler: [
    "/images/teams/minikler/01.jpg",
    "/images/teams/minikler/02.jpg",
    "/images/teams/minikler/03.jpg",
    "/images/teams/minikler/04.jpg",
    "/images/teams/minikler/05.jpg",
    "/images/teams/minikler/06.jpg",
  ],
};

const pageId = document.documentElement.dataset.page || "";
const solidHeader = document.documentElement.dataset.header === "solid";
const header = document.querySelector("#site-header");
const menuToggle = document.querySelector("#menu-toggle");
const mobilePanel = document.querySelector("#mobile-panel");
const navLinks = document.querySelectorAll("[data-nav-link]");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-tab-panel]");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector("#lightbox-close");
const lightboxPrev = document.querySelector("#lightbox-prev");
const lightboxNext = document.querySelector("#lightbox-next");

let galleryItems = [];
let lightboxIndex = 0;

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", solidHeader || window.scrollY > 24);
}

function markActiveNav() {
  navLinks.forEach((link) => {
    const isActive = link.dataset.nav === pageId;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function toggleMobileMenu() {
  if (!menuToggle || !mobilePanel) return;
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
  mobilePanel.classList.toggle("is-open", open);
  document.body.classList.toggle("overflow-hidden", open);
}

function closeMobileMenu() {
  if (!menuToggle || !mobilePanel) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Menüyü aç");
  mobilePanel.classList.remove("is-open");
  document.body.classList.remove("overflow-hidden");
}

function bindNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu());
  });
}

function applyImageFallbacks() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const fail = () => {
      img.classList.add("is-missing");
      const galleryItem = img.closest("[data-lightbox]");
      if (galleryItem) galleryItem.hidden = true;
    };
    img.addEventListener("error", fail, { once: true });
    if (img.complete && img.naturalWidth === 0) fail();
  });
}

function initTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      tabButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      tabPanels.forEach((panel) => {
        panel.classList.toggle("hidden", panel.dataset.tabPanel !== target);
      });
      refreshGalleryItems();
    });
  });
}

function visibleGalleryItems() {
  return [...document.querySelectorAll("[data-lightbox]")].filter((item) => {
    return item.offsetParent !== null && !item.querySelector("img.is-missing");
  });
}

function refreshGalleryItems() {
  galleryItems = visibleGalleryItems();
}

function openLightbox(index) {
  refreshGalleryItems();
  if (!galleryItems.length || !lightbox) return;
  lightboxIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[lightboxIndex];
  const src = item.dataset.src;
  const caption = item.dataset.caption || "";
  lightboxImage.src = src;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("overflow-hidden");
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
  document.body.classList.remove("overflow-hidden");
}

function bindLightbox() {
  document.querySelectorAll("[data-lightbox]").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img?.classList.contains("is-missing")) return;
      refreshGalleryItems();
      const index = galleryItems.indexOf(item);
      if (index >= 0) openLightbox(index);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxPrev?.addEventListener("click", () => openLightbox(lightboxIndex - 1));
  lightboxNext?.addEventListener("click", () => openLightbox(lightboxIndex + 1));
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

function initScrollReveal() {
  const nodes = document.querySelectorAll(".scroll-reveal");
  if (!nodes.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
  );

  nodes.forEach((node) => observer.observe(node));
}

function bindKeyboard() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      closeMobileMenu();
    }
    if (!lightbox?.classList.contains("is-open")) return;
    if (event.key === "ArrowLeft") openLightbox(lightboxIndex - 1);
    if (event.key === "ArrowRight") openLightbox(lightboxIndex + 1);
  });
}

menuToggle?.addEventListener("click", toggleMobileMenu);
window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("resize", closeMobileMenu);

markActiveNav();
setHeaderState();
bindNavigation();
applyImageFallbacks();
initTabs();
bindLightbox();
initScrollReveal();
bindKeyboard();
refreshGalleryItems();

window.SKS_IMAGE_PLAN = IMAGE_PLAN;
