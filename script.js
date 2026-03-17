
function signup(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const error = document.getElementById("error");
  error.textContent = "";

  if (!name || !email || !password || !confirm) {
    error.textContent = "All fields are required";
    return;
  }
   if (password.length < 6) {
    error.textContent = "Password must be at least 6 characters";
    return;
  }
  
  if (password !== confirm) {
    error.textContent = "Passwords do not match";
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find(u => u.email === email);
  if (exists) {
    error.textContent = "Email already registered";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  
  window.location.href = "login.html";
}

function login(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");
  error.textContent = "";

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    error.textContent = "Invalid email or password";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  
  window.location.href = "home.html";
}

