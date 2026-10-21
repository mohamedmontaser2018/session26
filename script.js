// ===========================================================
// Henna landing page — interactivity & data-driven rendering
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  renderPhotographyStrip();
  renderProviders();
  renderServices();
  renderJoinGallery();

  setupMobileNav();
  setupBackToTop();
  setupNewsletterForm();
  setupButtons();
  setupScrollSpy();
});

/* ---------- Data ---------- */

const photographyItems = [1, 2, 3, 4, 5].map((n) => ({
  image: `assets/gallery-${n}.jpg`,
  label: "photography",
}));

const providerItems = [1, 2, 3, 4, 5].map((n) => ({
  image: `assets/provider-${n}.jpg`,
  name: "Hala Makeup Artist",
}));

const serviceItems = [
  { image: "assets/service-1.jpg", title: "Photographer", category: "Category Name", rating: 4, reviews: 29 },
  { image: "assets/service-2.jpg", title: "Photographer", category: "Category Name", rating: 4, reviews: 29 },
  { image: "assets/service-3.jpg", title: "Photographer", category: "Category Name", rating: 4, reviews: 29 },
  { image: "assets/service-4.jpg", title: "Photographer", category: "Category Name", rating: 4, reviews: 29 },
  { image: "assets/service-5.jpg", title: "Photographer", category: "Category Name", rating: 4, reviews: 29 },
];

const joinGalleryItems = [
  { image: "assets/provider-1.jpg", label: "Hala MakeUp Artist" },
  { image: "assets/provider-2.jpg", label: "Hala MakeUp Artist" },
  { image: "assets/provider-3.jpg", label: "Hala MakeUp Artist" },
  { image: "assets/provider-4.jpg", label: "Hala MakeUp Artist" },
  { image: "assets/provider-5.jpg", label: "Hala MakeUp Artist" },
  { image: "assets/provider-6.jpg", label: "Hala MakeUp Artist" },
];

/* ---------- Renderers ---------- */

function renderPhotographyStrip() {
  const grid = document.getElementById("photoGrid");
  grid.innerHTML = photographyItems
    .map(
      (item) => `
      <div class="photo-card">
        <img src="${item.image}" alt="${item.label}" loading="lazy" />
        <div class="tag">${item.label}</div>
      </div>`
    )
    .join("");
}

function renderProviders() {
  const grid = document.getElementById("providerGrid");
  grid.innerHTML = providerItems
    .map(
      (item) => `
      <div class="provider-card">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="pill">${item.name}</div>
      </div>`
    )
    .join("");
}

function renderServices() {
  const grid = document.getElementById("serviceGrid");
  grid.innerHTML = serviceItems
    .map(
      (item) => `
      <div class="service-card">
        <div class="service-thumb">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <span class="fav"><i class="fa-regular fa-heart"></i></span>
          <span class="available">AVAILABLE</span>
        </div>
        <div class="service-body">
          <h3>${item.title}</h3>
          <div class="category">${item.category}</div>
          <div class="service-rating">${starRating(item.rating)}<span class="count">(${item.reviews})</span></div>
          <button class="btn-view">View</button>
        </div>
      </div>`
    )
    .join("");
}

function renderJoinGallery() {
  const grid = document.getElementById("joinGallery");
  grid.innerHTML = joinGalleryItems
    .map(
      (item) => `
      <div class="jcard">
        <img src="${item.image}" alt="${item.label}" loading="lazy" />
        <div class="pill">${item.label}</div>
      </div>`
    )
    .join("");
}

function starRating(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += `<i class="fa-${i <= rating ? "solid" : "regular"} fa-star"></i> `;
  }
  return html;
}

/* ---------- Mobile nav ---------- */

function setupMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("mainNav");
  hamburger.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => nav.classList.remove("open"))
  );
}

/* ---------- Back to top ---------- */

function setupBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Newsletter ---------- */

function setupNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  const msg = document.getElementById("newsletterMsg");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.querySelector("input[type='email']").value.trim();
    if (!email) return;
    msg.textContent = `Thanks! A confirmation link was "sent" to ${email}.`;
    form.reset();
    setTimeout(() => (msg.textContent = ""), 5000);
  });
}

/* ---------- Buttons that just need a friendly response ---------- */

function setupButtons() {
  const toast = (text) => {
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.style.cssText = `
        position: fixed; left: 50%; bottom: 90px; transform: translateX(-50%);
        background: #16403e; color: #fff; padding: 12px 22px; border-radius: 30px;
        font-size: 13.5px; box-shadow: 0 10px 30px rgba(0,0,0,.25); z-index: 100;
        opacity: 0; transition: opacity .25s ease;`;
      document.body.appendChild(el);
    }
    el.textContent = text;
    requestAnimationFrame(() => (el.style.opacity = "1"));
    clearTimeout(el._timer);
    el._timer = setTimeout(() => (el.style.opacity = "0"), 2200);
  };

  document.getElementById("getStartedBtn").addEventListener("click", () =>
    document.getElementById("services").scrollIntoView({ behavior: "smooth" })
  );
  document.getElementById("createAccountBtn").addEventListener("click", () =>
    toast("Create Account form coming soon ✨")
  );
  document.getElementById("loginBtn").addEventListener("click", () => toast("Login form coming soon 🔑"));
  document.getElementById("joinBtn").addEventListener("click", () => toast("Provider application coming soon 💼"));

  document.querySelectorAll(".service-body .btn-view").forEach((btn) =>
    btn.addEventListener("click", () => toast("Full service details coming soon 📋"))
  );
}

/* ---------- Active nav link on scroll ---------- */

function setupScrollSpy() {
  const sections = ["home", "services", "providers", "about", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const links = document.querySelectorAll(".main-nav a");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 120;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) current = section;
    });
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
    });
  });
}
