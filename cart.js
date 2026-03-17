const cartItemsContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const clearCartBtn = document.querySelector(".clear-cart");
const checkoutBtn = document.querySelector(".checkout");
const flyBox = document.getElementById("flyBox");

const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));



const displayCart = () => {
  const cart = getCart();
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.innerText = "0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>Price: ${item.price} EGP</p>
        <div class="quantity-wrapper">
          <button class="qty-btn minus" data-id="${item.id}">-</button>
          <input type="number" class="qtyInput" data-id="${item.id}" value="${item.qty}" min="1">
          <button class="qty-btn plus" data-id="${item.id}">+</button>
        </div>
        <p>Subtotal: <span class="subtotal">${subtotal}</span> EGP</p>
      </div>
      <button class="remove-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
    `;

    cartItemsContainer.appendChild(div);
  });

  totalPriceEl.innerText = total;
};



cartItemsContainer.addEventListener("click", (e) => {
  const cart = getCart();


  if (e.target.classList.contains("plus") || e.target.classList.contains("minus")) {
    const id = +e.target.dataset.id;
    const item = cart.find(p => p.id === id);
    if (!item) return;

    if (e.target.classList.contains("plus")) item.qty++;
    if (e.target.classList.contains("minus") && item.qty > 1) item.qty--;
  }

  if (e.target.classList.contains("remove-btn") || e.target.closest(".remove-btn")) {
    const removeBtn = e.target.closest(".remove-btn");
    const id = +removeBtn.dataset.id;
    const index = cart.findIndex(p => p.id === id);
    if (index !== -1) cart.splice(index, 1);
  }

  saveCart(cart);
  displayCart();
});


/* ================= QUANTITY INPUT CHANGE ================= */
cartItemsContainer.addEventListener("input", (e) => {
  if (e.target.classList.contains("qtyInput")) {
    const id = +e.target.dataset.id;
    const cart = getCart();
    const item = cart.find(p => p.id === id);
    const value = +e.target.value;
    if (value >= 1) item.qty = value;
    saveCart(cart);
    displayCart();
  }
});

/* ================= CLEAR CART ================= */
clearCartBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
  displayCart();
});

/* ================= CHECKOUT ANIMATION & LOGIC ================= */
checkoutBtn.addEventListener("click", () => {
  const rect = checkoutBtn.getBoundingClientRect();

  flyBox.style.display = "block";
  flyBox.style.top = rect.top + "px";
  flyBox.style.left = rect.left + "px";
  flyBox.style.opacity = 1;

  // Animate flyBox to top-right corner (cart icon)
  const endX = window.innerWidth - 50;
  const endY = 20;

  requestAnimationFrame(() => {
    flyBox.style.transform = `translate(${endX - rect.left}px, ${endY - rect.top}px) scale(0.2)`;
    flyBox.style.opacity = 0;
  });

  // After animation
  setTimeout(() => {
    flyBox.style.display = "none";
    flyBox.style.transform = "none";
    flyBox.style.opacity = 1;

    // Clear cart and show message
    localStorage.removeItem("cart");
    displayCart();
  }, 800);
});

/* ================= INIT ================= */
displayCart();
