/* ===== PRODUCTS DATA (same array) ===== */

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


const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const product = products.find(p => p.id === id);



if (product) {
  document.getElementById("productImg").src = product.image;
  document.getElementById("productName").innerText = product.name;
  document.getElementById("productDesc").innerText = product.desc;
  document.getElementById("productPrice").innerText = product.price + " EGP";
}


const qtyInput = document.getElementById("qtyInput");
const addToCartBtn = document.getElementById("addToCartBtn");

const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

addToCartBtn.addEventListener("click", () => {
  const qty = parseInt(qtyInput.value) || 1;
  let cart = getCart();

  
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  saveCart(cart);
  
});
