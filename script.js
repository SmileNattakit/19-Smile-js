document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const createItemForm = document.getElementById("create-item-form");
  const cartList = document.getElementById("cart-list");
  const subtotalElement = document.getElementById("subtotal");
  const taxElement = document.getElementById("tax");
  const totalElement = document.getElementById("total");
  const clearCartButton = document.getElementById("clear-cart");
  const placeOrderButton = document.getElementById("place-order");
  const addCheckedToCartButton = document.getElementById("add-checked-to-cart"); // เพิ่มปุ่มใหม่
  const productNameInput = document.getElementById("productName");
  const productPriceInput = document.getElementById("productPrice");
  const productImageInput = document.getElementById("productImage");
  const priceErrorSpan = document.getElementById("price-error");
  const imageErrorSpan = document.getElementById("image-error");

  let userCreatedProducts = [
    { name: "Americano", price: 45, image: "/img/ICED_AMERICANO.jpg" },
    { name: "Vanilla Latte", price: 55, image: "/img/VANILLA-LATTE.jpg" },
    { name: "Cappuccino", price: 60, image: "/img/ICED_CAPPUCCINO.jpg" },
  ];
  function createProductCard(product) {
    return `
      <div class="card">
        <figure class="w-full h-56 bg-cover bg-center" style="background-image: url(${product.image});"></figure>
        <div class="card-body bg-white p-4">
          <h3 class="card-title">${product.name}</h3>
          <div><span>Product Price: </span><span class="card-price">${product.price} ฿</span> </div>
          <div class="flex justify-between items-center">
            <input type="checkbox" class="checkbox" />
            <button class="btn bg-black text-white add-to-cart-btn" data-product-name="${product.name}" data-product-price="${product.price}">Add to cart</button>
          </div>
        </div>
      </div>
    `;
  }
  function addToCart(name, price) {
    const cartItem = document.createElement("li");
    cartItem.className =
      "flex justify-between items-center bg-gray-100 p-2 rounded-md";
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-xs btn-circle bg-black text-white";
    removeButton.innerHTML = "x";

    const itemText = document.createElement("span");
    itemText.textContent = `${name} - ${price} ฿`;

    cartItem.appendChild(itemText);
    cartItem.appendChild(removeButton);

    cartList.appendChild(cartItem);
    updateTotals();

    removeButton.addEventListener("click", () => {
      cartItem.remove();
      updateTotals();
    });
  }

  productList.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart-btn");
    if (button) {
      const card = button.closest(".card");
      addToCart(
        card.querySelector(".card-title").textContent,
        parseFloat(card.querySelector(".card-price").textContent)
      );
    }
  });

  addCheckedToCartButton.addEventListener("click", () => {
    const checkedCheckboxes = productList.querySelectorAll(".checkbox:checked");

    checkedCheckboxes.forEach((checkbox) => {
      const card = checkbox.closest(".card");
      const button = card.querySelector(".add-to-cart-btn");
      addToCart(
        button.dataset.productName,
        parseFloat(button.dataset.productPrice)
      );
    });
  });

  createItemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (validateForm()) {
      const product = {
        name: productNameInput.value,
        price: parseFloat(productPriceInput.value),
        image: productImageInput.value,
      };

      userCreatedProducts.push(product);
      renderProductList();
      createItemForm.reset();
    }
  });

  function updateTotals() {
    const cartItems = cartList.querySelectorAll("li");
    const subtotal = Array.from(cartItems).reduce((sum, item) => {
      const priceString = item.textContent.split(" - ")[1];
      return sum + parseFloat(priceString);
    }, 0);

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    subtotalElement.textContent = subtotal.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalElement.textContent = total.toFixed(2);
  }
