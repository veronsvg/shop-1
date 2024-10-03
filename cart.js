const productData = JSON.parse(localStorage.getItem("cart"));
const productsContainer = document.querySelector(".products");

updateCartCount();

productsContainer.innerHTML = "";
for (const key in productData) {
  const product = productData[key];
  const productElement = document.createElement("div");
  productElement.className = `product ${product.id}`;

  productElement.innerHTML = `
                        <div class="product-info">
                            <ion-icon name="close-circle" class="delete"></ion-icon>
                            <img src="images/${product.id}.png">
                            <div class="product-name">${product.name}</div>
                        </div>
                        <div class="product_price">$${product.price}</div>
                        <div class="product_quantity">
                            <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                            <span>${product.amount}</span>
                            <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
                        </div>
                        <div class="product_total">$${
                          product.price * product.amount
                        }</div>
                    `;

  productsContainer.appendChild(productElement);

  productElement.addEventListener("click", (event) =>
    cartButtons(event, product)
  );
  
  productElement.addEventListener("mousedown", (event) => {
    // Если есть дополнительные нажатия, например, при двойном клике, предотвратим выделение текста
    if (event.detail > 1) {
      event.preventDefault();
    }
  });
}

function updateProductQuantity(product) {
  const span = document.querySelector(`.${product.id} .product_quantity span`);
  span.textContent = `${product.amount}`;
}

function deleteProduct(product) {
  const deleting = document.querySelector(`.product.${product.id}`);
  deleting.remove();
}

function cartButtons(event, product) {
  if (event.target.classList.contains("delete")) {
    delete productData[product.id];
    deleteProduct(product);
  } else if (event.target.classList.contains("increase")) {
    productData[product.id].amount += 1;
    updateProductQuantity(product);
  } else if (event.target.classList.contains("decrease")) {
    if (productData[product.id].amount > 1) {
      productData[product.id].amount -= 1;
      updateProductQuantity(product);
    } else {
      delete productData[product.id];
      deleteProduct(product);
    }
  }

  localStorage.setItem("cart", JSON.stringify(productData));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let itemCount = 0;

  for (const key in cart) {
      itemCount += cart[key].amount;
  }

  document.querySelector(".cart span").textContent = itemCount;
}
