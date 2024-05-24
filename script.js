document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const createItemForm = document.getElementById("create-item-form");
  const cartList = document.getElementById("cart-list");
  const subtotalElement = document.getElementById("subtotal");
  const taxElement = document.getElementById("tax");
  const totalElement = document.getElementById("total");
  const clearCartButton = document.getElementById("clear-cart");
  const placeOrderButton = document.getElementById("place-order");
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
                <button class="btn bg-black text-white add-to-cart-btn">Add to cart</button>
            </div>
        </div>
    `;
  }
});
