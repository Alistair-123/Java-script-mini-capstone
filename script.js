let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  showPage("home");

  document.getElementById("product-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct();
  });

  renderProducts();
  renderCart();
});

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.style.display = "none";
  });
  document.getElementById(pageId).style.display = "block";
}

function addProduct() {
  const name = document.getElementById("product-name").value;
  const description = document.getElementById("product-description").value;
  const price = document.getElementById("product-price").value;
  const imageFile = document.getElementById("product-image").files[0];

  const reader = new FileReader();
  reader.onload = () => {
    products.push({ name, description, price, image: reader.result });
    localStorage.setItem("products", JSON.stringify(products)); // Save to local storage
    renderProducts();
    showPage("home");
  };
  reader.readAsDataURL(imageFile);
}

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>$${product.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(productCard);
  });
}

function addToCart(index) {
  cart.push(products[index]);
  localStorage.setItem("cart", JSON.stringify(cart)); // Save to local storage
  alert("Product added to the cart!");
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "product-card";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <div class="cart-buttons">
        <button onclick="removeFromCart(${index})">Remove</button>
        <button onclick="buyNow(${index})">Buy Now</button>
      </div>
    `;
    cartList.appendChild(cartItem);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
  renderCart();
}

function buyNow(index) {
  alert(`You have bought "${cart[index].name}" for $${cart[index].price}.`);
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
  renderCart();
}
function addProduct() {
    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const price = document.getElementById("product-price").value;
    const imageFile = document.getElementById("product-image").files[0];
  
    const reader = new FileReader();
    reader.onload = () => {
      products.push({ name, description, price, image: reader.result });
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
      renderProductTable(); // Update table
      document.getElementById("product-form").reset();
    };
    reader.readAsDataURL(imageFile);
  }
  
  function renderProductTable() {
    const tableBody = document.getElementById("product-table-body");
    tableBody.innerHTML = "";
    products.forEach((product, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>$${product.price}</td>
        <td>
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function editProduct(index) {
    const product = products[index];
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-description").value = product.description;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-image").value = "";
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProductTable();
  }
  
  function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProductTable();
  }
  
  // Initial rendering of the product table
  document.addEventListener("DOMContentLoaded", () => {
    renderProductTable();
  });
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      const pageId = this.getAttribute("data-page");
      showPage(pageId);
      document.querySelector(".nav-links a.active")?.classList.remove("active");
      this.classList.add("active");
    });
  });
  