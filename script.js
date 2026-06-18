const heroSlides = [
  {
    eyebrow: "New Arrivals — Winter Collection",
    titleHtml: 'Capture every moment <em>worth</em> keeping.',
    description:
      "Pakistan's trusted name in cameras, lenses & studio equipment — now with a full-service photo studio for portraits, events & product shoots.",
    primary: "Shop Cameras",
    primaryHref: "#categories",
    secondary: "Book a Studio Session",
    secondaryHref: "#studio"
  },
  {
    eyebrow: "Al-Hafeez Studio — Now Booking",
    titleHtml: 'Step in front of the camera, <em>for once</em>.',
    description:
      "Portraits, passport photos, event coverage and product shoots designed with the same attention we give to every camera on the shelf.",
    primary: "Book a Studio Session",
    primaryHref: "#studio",
    secondary: "See Studio Services",
    secondaryHref: "#studio"
  },
  {
    eyebrow: "Since 1998 — Lahore's Camera Shop",
    titleHtml: 'Trusted behind <em>every lens</em> in the city.',
    description:
      "A local home for camera advice, reliable gear, and honest service. We help creators, families, and professionals find the right setup.",
    primary: "Our Story",
    primaryHref: "#footer",
    secondary: "Talk to Us",
    secondaryHref: "#footer"
  }
];

const products = [
  {
    badge: "Best Seller",
    badgeTone: "gold",
    category: "Gimbals",
    title: "DJI OM 4 Handheld Gimbal",
    image: "https://unsplash.com/photos/IVaKksEZmZA/download?force=true",
    rating: 4.8,
    reviews: 64,
    price: 24500,
    action: "cart"
  },
  {
    badge: "New",
    badgeTone: "dark",
    category: "Instant Cameras",
    title: "Fujifilm Instax Mini 11",
    image: "https://images.unsplash.com/photo-1517445297835-99352d12c747?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fDRrJTIwY2FtZXJhfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000",
    rating: 4.7,
    reviews: 112,
    price: 13900,
    action: "cart"
  },
  {
    category: "Mirrorless",
    title: "Sony Alpha A7 III Body",
    image: "https://images.unsplash.com/photo-1617468264185-e6535390e9a4?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fDRrJTIwY2FtZXJhfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000",
    rating: 4.9,
    reviews: 38,
    inquireOnly: true,
    action: "inquire"
  },
  {
    badge: "-15%",
    badgeTone: "gold",
    category: "Tripods",
    title: "Manfrotto MT190XPRO4",
    image: "https://images.unsplash.com/photo-1532381872557-b370482876a3?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fDRrJTIwY2FtZXJhfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000",
    rating: 4.6,
    reviews: 61,
    price: 18200,
    oldPrice: 21490,
    action: "cart"
  }
];

const whatsappNumber = "923124766248";
const whatsappBase = `https://wa.me/${whatsappNumber}`;

const heroEyebrow = document.querySelector("[data-hero-eyebrow]");
const heroTitle = document.querySelector("[data-hero-title]");
const heroDescription = document.querySelector("[data-hero-description]");
const heroPrimary = document.querySelector("[data-hero-primary]");
const heroSecondary = document.querySelector("[data-hero-secondary]");
const heroContent = document.querySelector(".hero__content");
const heroDots = Array.from(document.querySelectorAll("[data-slide-dot]"));
const productGrid = document.querySelector("[data-product-grid]");
const toast = document.querySelector(".toast");
const cartCounters = Array.from(document.querySelectorAll("[data-cart-count], [data-cart-count-mobile]"));
const footerGroups = Array.from(document.querySelectorAll("[data-footer-group]"));
const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");
const mobileMenuIcon = document.querySelector("[data-mobile-menu-icon]");
const mobileMenuPanel = document.querySelector("[data-mobile-menu-panel]");
const mobileMenuBackdrop = document.querySelector("[data-mobile-menu-backdrop]");
const mobileMenuClose = document.querySelector("[data-mobile-menu-close]");
const mobileMenuLinks = Array.from(document.querySelectorAll(".mobile-menu-panel__nav a"));

let activeSlide = 0;
let cartCount = 2;
let slideTimer;
let heroTransitionTimer;
let mobileMenuOpen = false;

function formatPrice(value) {
  return new Intl.NumberFormat("en-PK").format(value);
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.hideTimer);
  showToast.hideTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

function syncCartCount() {
  cartCounters.forEach((counter) => {
    counter.textContent = cartCount;
  });
}

function setMobileMenu(open) {
  mobileMenuOpen = open;
  if (mobileMenuToggle) {
    mobileMenuToggle.setAttribute("aria-expanded", String(open));
  }
  if (mobileMenuIcon) {
    mobileMenuIcon.className = open ? "bi bi-x-lg" : "bi bi-list";
  }
  if (mobileMenuPanel) {
    mobileMenuPanel.setAttribute("aria-hidden", String(!open));
  }
  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.hidden = !open;
  }
  document.body.classList.toggle("menu-open", open);
}

function renderProducts() {
  if (!productGrid) return;

  productGrid.innerHTML = products
    .map((product, index) => {
      const badgeClass = product.badgeTone === "gold" ? "product-card__badge--gold" : "";
      const ratingStars = "★★★★★".slice(0, Math.round(product.rating)).padEnd(5, "☆");
      const actionButton =
        product.action === "inquire"
          ? `<button class="product-action product-action--inquire" type="button" data-inquire="${index}" aria-label="Inquire for ${product.title}">
              <i class="bi bi-chat-dots" aria-hidden="true"></i>
            </button>`
          : `<button class="product-action" type="button" data-add-to-cart="${index}" aria-label="Add ${product.title} to cart">
              <i class="bi bi-plus-lg" aria-hidden="true"></i>
            </button>`;

      return `
        <article class="product-card reveal">
          <div class="product-card__media" style="--product-image: url('${product.image}')">
            ${product.badge ? `<span class="product-card__badge ${badgeClass}">${product.badge}</span>` : ""}
            <button class="product-card__wish" type="button" aria-label="Toggle wishlist">
              <i class="bi bi-heart" aria-hidden="true"></i>
            </button>
          </div>
          <div class="product-card__body">
            <span class="product-card__category">${product.category}</span>
            <h3 class="product-card__title">${product.title}</h3>
            <div class="rating">
              <span class="rating__stars">${ratingStars}</span>
              <span>(${product.reviews})</span>
            </div>
            <div class="product-card__footer">
              ${
                product.inquireOnly
                  ? `<div class="price-row"><span class="price-row__inquire">Inquire for Price</span></div>`
                  : `<div class="price-row">
                      <span class="price-row__current">Rs ${formatPrice(product.price)}${product.oldPrice ? ` <span class="label">now</span>` : ""}</span>
                      ${product.oldPrice ? `<span class="price-row__old">Rs ${formatPrice(product.oldPrice)}</span>` : ""}
                    </div>`
              }
              ${actionButton}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function setHeroSlide(index, direction = "right") {
  const slide = heroSlides[index];
  if (!slide) return;

  activeSlide = index;
  heroPrimary.textContent = slide.primary;
  heroSecondary.textContent = slide.secondary;
  heroPrimary.href = slide.primaryHref;
  heroSecondary.href = slide.secondaryHref;

  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });

  if (!heroContent) return;
  heroContent.dataset.slideDirection = direction;
  heroContent.classList.remove("is-sliding-left", "is-sliding-right");
  void heroContent.offsetWidth;
  heroContent.classList.add(direction === "left" ? "is-sliding-left" : "is-sliding-right");

  heroEyebrow.innerHTML = `<span class="iris-icon" aria-hidden="true"></span><span>${slide.eyebrow}</span>`;
  heroTitle.innerHTML = slide.titleHtml;
  heroDescription.textContent = slide.description;

  window.clearTimeout(heroTransitionTimer);
  heroTransitionTimer = window.setTimeout(() => {
    heroContent.classList.remove("is-sliding-left", "is-sliding-right");
  }, 650);
}

function startHeroRotation() {
  stopHeroRotation();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  slideTimer = window.setInterval(() => {
    const nextIndex = (activeSlide + 1) % heroSlides.length;
    setHeroSlide(nextIndex, "right");
  }, 5000);
}

function stopHeroRotation() {
  if (slideTimer) {
    window.clearInterval(slideTimer);
    slideTimer = null;
  }
}

function attachCardHandlers() {
  document.addEventListener("click", (event) => {
    const wishButton = event.target.closest(".product-card__wish");
    const addButton = event.target.closest("[data-add-to-cart]");
    const inquireButton = event.target.closest("[data-inquire]");
    const productCard = event.target.closest(".product-card");

    if (wishButton) {
      wishButton.classList.toggle("is-active");
      wishButton.setAttribute("aria-pressed", String(wishButton.classList.contains("is-active")));
      return;
    }

    if (addButton) {
      cartCount += 1;
      syncCartCount();
      showToast("Added to cart");
      return;
    }

    if (inquireButton) {
      const product = products[Number(inquireButton.getAttribute("data-inquire"))];
      const message = `Hi Al-Hafeez, I want to ask about ${product.title}.`;
      window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
      return;
    }

    if (productCard && !event.target.closest("button")) {
      showToast("Product details coming soon");
    }

    const heroDot = event.target.closest("[data-slide-dot]");
    if (heroDot) {
      const nextIndex = Number(heroDot.getAttribute("data-slide-dot"));
      const direction = nextIndex > activeSlide ? "right" : "left";
      setHeroSlide(nextIndex, direction);
      startHeroRotation();
    }
  });
}

function attachMobileMenuHandlers() {
  if (!mobileMenuToggle) return;

  mobileMenuToggle.addEventListener("click", () => {
    setMobileMenu(!mobileMenuOpen);
  });

  mobileMenuClose?.addEventListener("click", () => {
    setMobileMenu(false);
  });

  mobileMenuBackdrop?.addEventListener("click", () => {
    setMobileMenu(false);
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMobileMenu(false);
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenu(false);
    }
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 900px)").matches) {
      setMobileMenu(false);
    }
  });
}

function syncFooterAccordions() {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  footerGroups.forEach((group) => {
    group.open = !isMobile;
  });
}

function initRevealAnimations() {
  const revealTargets = document.querySelectorAll(".section-block, .product-card, .newsletter-banner, .studio-banner, .category-card");
  revealTargets.forEach((node) => node.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

function initNewsletterForm() {
  const form = document.querySelector(".newsletter-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    if (input && input.value.trim()) {
      showToast("Thanks, we'll reach out soon");
      input.value = "";
    }
  });
}

renderProducts();
syncCartCount();
setHeroSlide(0);
attachCardHandlers();
attachMobileMenuHandlers();
syncFooterAccordions();
initRevealAnimations();
initNewsletterForm();
startHeroRotation();

window.addEventListener("resize", syncFooterAccordions);
