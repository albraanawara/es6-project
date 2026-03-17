
const products = [
  { id: 1, name: "Espresso", price: 80, category: "Coffee", image: "/espresso.jpeg", desc: "Strong and rich espresso shot." },
  { id: 2, name: "Latte", price: 95, category: "Coffee", image: "/latte.jpg", desc: "Smooth milk coffee with espresso." },
  { id: 3, name: "Cappuccino", price: 90, category: "Coffee", image: "/cappuccino.jpg", desc: "Perfect balance of foam and coffee." },
  { id: 4, name: "Mocha", price: 100, category: "Coffee", image: "/mocha.jpg", desc: "Coffee with chocolate flavor." },
  { id: 5, name: "Coffee Beans", price: 150, category: "Beans", image: "/beans.webp", desc: "Fresh roasted premium beans." },
  { id: 6, name: "Dark Roast Beans", price: 170, category: "Beans", image: "/dark.jpg", desc: "Strong dark roasted beans." },
  { id: 7, name: "Iced Coffee", price: 85, category: "Coffee", image: "/Iced-Coffee.jpg", desc: "Cold refreshing coffee." },
  { id: 8, name: "Tea", price: 50, category: "tea", image: "/tea.jpg", desc: "Refreshing tea." },
  { id: 9, name: "Tea with Milk", price: 55, category: "tea", image: "/tea-milk.jpg", desc: "Classic milk tea." },
  { id: 10, name: "Green Tea", price: 60, category: "tea", image: "/greentea.webp", desc: "Healthy green tea." },
  { id: 11, name: "Tea with Mint", price: 55, category: "tea", image: "/tea-2.jpg", desc: "Refreshing mint tea." }
];


const grid = document.getElementById("productsGrid");
let selectedProduct = null;


const displayProducts = (list) => {
  grid.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.image}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.price} EGP</p>

        <div class="quantity-wrapper">
          <button class="qty-btn minus" data-id="${p.id}">-</button>
          <input type="number" class="qtyInput" data-id="${p.id}" value="1" min="1">
          <button class="qty-btn plus" data-id="${p.id}">+</button>
        </div>

        <div class="product-actions">
          <i class="fa-solid fa-eye" data-id="${p.id}"></i>
          <i class="fa-solid fa-cart-plus" data-id="${p.id}"></i>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
};


const filterProducts = (cat, btn) => {
  document.querySelectorAll(".product-filters button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const filtered = cat === "All" ? products : products.filter(p => p.category === cat);
  displayProducts(filtered);
};


const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

const addToCart = (id, qty = 1) => {
  let cart = getCart();
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  saveCart(cart);
  updateCartCount();
  showToast(`Added ${qty} x ${product.name} 🛒`);
};


const updateCartCount = () => {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").innerText = `(${count})`;
};


const showToast = (msg) => {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
};

grid.addEventListener("click", (e) => {
  const id = +e.target.dataset.id;

 
  if (e.target.classList.contains("fa-eye")) {
    window.location.href = `product-details.html?id=${id}`;
  }

  
  if (e.target.classList.contains("plus")) {
    const input = document.querySelector(`.qtyInput[data-id="${id}"]`);
    input.value = +input.value + 1;
  }

  
  if (e.target.classList.contains("minus")) {
    const input = document.querySelector(`.qtyInput[data-id="${id}"]`);
    if (+input.value > 1) input.value = +input.value - 1;
  }

  
  if (e.target.classList.contains("fa-cart-plus")) {
    const input = document.querySelector(`.qtyInput[data-id="${id}"]`);
    const qty = +input.value || 1;
    addToCart(id, qty);
  }
});


displayProducts(products);
updateCartCount();
