const productsJSON = `{
  "allProducts": [
    {
      "name": "Black Hoodie",
      "id": "blackhoodie",
      "price": 30
    },
    {
      "name": "White Hoodie",
      "id": "whitehoodie",
      "price": 35
    },
    {
      "name": "Cyan Hoodie",
      "id": "cyanhoodie",
      "price": 40
    },
    {
      "name": "Navy Hoodie",
      "id": "navyhoodie",
      "price": 25
    },
    {
      "name": "Yellow Hoodie",
      "id": "yellowhoodie",
      "price": 15
    },
    {
      "name": "Purple Hoodie",
      "id": "purplehoodie",
      "price": 20
    }
  ]
}`


let products = JSON.parse(productsJSON);
const productList = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", function () {
  // создаём каждый продукт на страница (можно с for)
  products["allProducts"].forEach((product) => {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image");

    const productImage = document.createElement("img");
    productImage.src = `./images/${product.id}.png`;
    productImage.alt = product.name;

    const productName = document.createElement("h3");
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price}`;

    const addButton = document.createElement("div");
    addButton.classList.add("add-cart");
    addButton.textContent = "В корзину";

    imageDiv.onclick = () => addToCart(product);

    imageDiv.appendChild(productImage);
    imageDiv.appendChild(addButton);
    imageDiv.appendChild(productName);
    imageDiv.appendChild(productPrice);

    productList.appendChild(imageDiv);
  });
});

// обработчик добавления в корзину
function addToCart(product) {

  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (cart[product.id]) {
    cart[product.id].amount += 1;
  } else {
    cart[product.id] = { ...product, amount: 1 };
  }
  localStorage.setItem("cart", JSON.stringify(cart));
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

// Initialize cart count
updateCartCount();
