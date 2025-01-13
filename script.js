// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu functionality
const mobileMenu = document.querySelector(".mobile-menu");
const mobileNav = document.querySelector(".mobile-nav");
const body = document.body;

// Create backdrop element
const backdrop = document.createElement("div");
backdrop.classList.add("mobile-nav-backdrop");
document.body.appendChild(backdrop);

mobileMenu.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  backdrop.classList.toggle("active");
  body.classList.toggle("menu-open");
});

// Close menu when clicking backdrop
backdrop.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  backdrop.classList.remove("active");
  body.classList.remove("menu-open");
});

// Close menu when clicking a link
const mobileLinks = document.querySelectorAll(".mobile-nav a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    backdrop.classList.remove("active");
    body.classList.remove("menu-open");
  });
});

// WhatsApp Buy Now functionality
document.querySelectorAll(".buy-now").forEach((button) => {
  button.addEventListener("click", function () {
    const product = this.dataset.product;
    const price = this.dataset.price;
    const image = this.dataset.image;

    // Create WhatsApp message
    const message =
      `Hi! I'm interested in buying:\n\n` +
      `Product: ${product}\n` +
      `Price: ₹${price}\n\n` +
      `Product Link: ${image}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Redirect to WhatsApp
    window.open(`https://wa.me/919509264338?text=${encodedMessage}`, "_blank");
  });
});

// Product filtering functionality with See More
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const seeMoreBtn = document.querySelector(".see-more-btn");
const ITEMS_PER_PAGE = 6;

function showProducts(category) {
  let visibleCount = 0;
  let totalInCategory = 0;

  productCards.forEach((card) => {
    // Reset classes
    card.classList.add("hidden-product");
    card.classList.remove("hide");

    // Check if card belongs to selected category
    if (category === "all" || card.dataset.category === category) {
      totalInCategory++;
      if (visibleCount < ITEMS_PER_PAGE) {
        card.classList.remove("hidden-product");
        visibleCount++;
      }
    } else {
      card.classList.add("hide");
    }
  });

  // Show/Hide See More button
  if (totalInCategory > ITEMS_PER_PAGE) {
    seeMoreBtn.style.display = "inline-block";
  } else {
    seeMoreBtn.style.display = "none";
  }

  // Update See More button text
  seeMoreBtn.textContent = `See More (${visibleCount}/${totalInCategory})`;

  // Store current category
  seeMoreBtn.dataset.currentCategory = category;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.category;
    showProducts(category);
  });
});

// See More button functionality
seeMoreBtn.addEventListener("click", () => {
  const currentCategory = seeMoreBtn.dataset.currentCategory;
  let visibleCount = 0;
  let totalInCategory = 0;

  productCards.forEach((card) => {
    if (
      currentCategory === "all" ||
      card.dataset.category === currentCategory
    ) {
      totalInCategory++;
      if (!card.classList.contains("hide")) {
        visibleCount++;
      }

      if (
        visibleCount >= ITEMS_PER_PAGE &&
        card.classList.contains("hidden-product")
      ) {
        card.classList.remove("hidden-product");
        visibleCount++;
      }
    }
  });

  // Update button text
  seeMoreBtn.textContent = `See More (${visibleCount}/${totalInCategory})`;

  // Hide button if all items are shown
  if (visibleCount >= totalInCategory) {
    seeMoreBtn.style.display = "none";
  }
});

// Initial load
showProducts("all");
