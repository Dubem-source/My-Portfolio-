// ── CUSTOM CURSOR ──
const cursor = document.getElementById("cursor");
let mx = 0,
  my = 0,
  cx = 0,
  cy = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
(function moveCursor() {
  cx += (mx - cx) * 0.15;
  cy += (my - cy) * 0.15;
  cursor.style.left = cx + "px";
  cursor.style.top = cy + "px";
  requestAnimationFrame(moveCursor);
})();

// ── HAMBURGER ──
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ── NAVBAR SCROLL ──
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.style.borderBottomColor =
    window.scrollY > 60 ? "rgba(255,45,120,0.15)" : "rgba(255,255,255,0.07)";
});

// ── ACTIVE NAV ──
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll(".reveal");
const revObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 70);
        revObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);
reveals.forEach((el) => revObs.observe(el));

// ── SKILL BARS ──
const skillObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".skill-fill")
          .forEach((bar) => bar.classList.add("go"));
        skillObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);
const skillsWrap = document.querySelector(".skills-wrap");
if (skillsWrap) skillObs.observe(skillsWrap);

// ── COUNT UP ANIMATION ──
function countUp(el) {
  const target = parseInt(el.getAttribute("data-target"));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
      return;
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const countObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".stat-n").forEach(countUp);
        countObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
const heroStats = document.querySelector(".hero-stats");
if (heroStats) countObs.observe(heroStats);

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth" });
  });
});
