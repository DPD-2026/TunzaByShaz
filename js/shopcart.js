const STORAGE_KEY = "tunza_cart";
let toastTimeout;

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  const totalItems = getCart().reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = totalItems;
}

function showPopup(message = "added to cart") {
  const toast = document.getElementById("cart-toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartBadge();
  showPopup("added to cart");
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: Number(btn.dataset.price) || 0,
      });
    });
  });
});