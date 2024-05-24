document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const createItemForm = document.getElementById("create-item-form");
  const cartList = document.getElementById("cart-list");
  const subtotalElement = document.getElementById("subtotal");
  const taxElement = document.getElementById("tax");
  const totalElement = document.getElementById("total");
  const clearCartButton = document.getElementById("clear-cart");
  const placeOrderButton = document.getElementById("place-order");
  const addCheckedToCartButton = document.getElementById("add-checked-to-cart");
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
          <input type="checkbox" class="checkbox" data-product-name="${product.name}" data-product-price="${product.price}"/>
        </div>
      </div>
    </div>
  `;
  }
  addCheckedToCartButton.addEventListener("click", () => {
    const checkedCheckboxes = productList.querySelectorAll(".checkbox:checked");

    checkedCheckboxes.forEach((checkbox) => {
      const productName = checkbox.dataset.productName;
      const productPrice = parseFloat(checkbox.dataset.productPrice);

      const cartItem = document.createElement("li");
      cartItem.className =
        "flex justify-between items-center bg-gray-100 p-2 rounded-md";

      const removeButton = document.createElement("button");
      removeButton.className = "btn btn-xs btn-circle bg-black text-white";
      removeButton.innerHTML = "x";
      removeButton.addEventListener("click", () => {
        cartItem.remove();
        updateTotals();
      });

      const itemText = document.createElement("span");
      itemText.textContent = `${productName} - ${productPrice} ฿`;

      cartItem.appendChild(itemText);
      cartItem.appendChild(removeButton);
      cartList.appendChild(cartItem);
      updateTotals();
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

  function validateForm() {
    const priceRegex = /^\d+(\.\d{0,2})?$/;
    const imageRegex = /\.(png|jpe?g|gif)$/i;

    if (!priceRegex.test(productPriceInput.value)) {
      priceErrorSpan.classList.remove("hidden");
      return false;
    } else {
      priceErrorSpan.classList.add("hidden");
    }

    if (!imageRegex.test(productImageInput.value)) {
      imageErrorSpan.classList.remove("hidden");
      return false;
    } else {
      imageErrorSpan.classList.add("hidden");
    }

    return true;
  }

  placeOrderButton.addEventListener("click", () => {
    const confirmOrder = confirm("Confirm your order?");

    if (confirmOrder) {
      cartList.innerHTML = "";
      updateTotals();
      alert("Order placed successfully!");
    }
  });

  clearCartButton.addEventListener("click", () => {
    cartList.innerHTML = "";
    updateTotals();
  });
  function renderProductList() {
    productList.innerHTML = "";
    userCreatedProducts.forEach((product) => {
      productList.innerHTML += createProductCard(product);
    });
  }
  renderProductList();
  updateTotals();
});
