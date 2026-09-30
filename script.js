/* ============================================================
   Muhammad Raihan Miqdad — Portfolio interactions (work/)
   ============================================================ */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ---------- Footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ---------- Image fallbacks ---------- */
const profilePhoto = document.getElementById("profilePhoto");
const photoFallback = document.getElementById("photoFallback");
const cvPhoto = document.getElementById("cvPhoto");

const cvFallbackImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23dbe9ff'/%3E%3Ctext x='50%25' y='47%25' dominant-baseline='middle' text-anchor='middle' font-size='34' fill='%23123a86' font-family='Arial'%3ECV Photo%3C/text%3E%3Ctext x='50%25' y='56%25' dominant-baseline='middle' text-anchor='middle' font-size='16' fill='%232563eb' font-family='Arial'%3Eready to be added%3C/text%3E%3C/svg%3E";

if (profilePhoto && photoFallback) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.style.display = "none";
    photoFallback.style.display = "flex";
  });
}

if (cvPhoto) {
  cvPhoto.addEventListener("error", () => {
    cvPhoto.src = cvFallbackImage;
  });
}

/* ---------- Save as PDF ---------- */
const cvPrintBtn = document.getElementById("cvPrintBtn");
if (cvPrintBtn) {
  cvPrintBtn.addEventListener("click", () => window.print());
}

/* ---------- Mobile navigation ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navLinkItems = Array.from(document.querySelectorAll(".nav-link"));

function setNav(open) {
  if (!navLinks || !navToggle) return;
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu"
  );
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () =>
    setNav(!navLinks.classList.contains("open"))
  );

  navLinkItems.forEach((link) => link.addEventListener("click", () => setNav(false)));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNav(false);
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.classList.contains("open")) return;
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      setNav(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) setNav(false);
  });
}

/* ---------- Header shadow + back to top ---------- */
const siteHeader = document.getElementById("siteHeader");
const backToTop = document.getElementById("backToTop");

function onScroll() {
  const y = window.scrollY;
  if (siteHeader) siteHeader.classList.toggle("scrolled", y > 10);
  if (backToTop) backToTop.classList.toggle("show", y > 520);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* ---------- Reveal sections on scroll ---------- */
const revealEls = Array.from(document.querySelectorAll(".reveal"));

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -70px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ---------- Animate skill bars when visible ---------- */
const bars = Array.from(document.querySelectorAll(".bar span[data-width]"));

function fillBars() {
  bars.forEach((bar) => {
    bar.style.width = bar.dataset.width + "%";
  });
}

if (bars.length) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    fillBars();
  } else {
    const barObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fillBars();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    bars.forEach((bar) => barObserver.observe(bar));
  }
}

/* ---------- Scroll spy for active nav link ---------- */
const sections = Array.from(document.querySelectorAll("main .section[id], main #home[id]"));

if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinkItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => spy.observe(section));
}
