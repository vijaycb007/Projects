//! To dislpay items in Carts page
function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cartItems");
  //? to calculate Total value of the cart
  let total = 0;
  //? Cart value should be 0 if no items found
  if (cart.length === 0) {
    cartItems.innerHTML = `
    <div id="empty">
    <h2>Your cart is empty</h2>
    </div>
    `
    document.getElementById("total").innerHTML = "Total value ₹ 0/-";
    return;
  }
  //? Create a container for every cart item
  cartItems.innerHTML = cart.map((item, index) => {
    item.quantity = item.quantity || 1;
    total += item.price*item.quantity;
    return `
        <div class="cartItems">
            <img src=${item.image} height="170px" width="150px" alt="product image">
            <h2>${item.name}</h2>
            <div class="content">
            <h3>₹${item.price}</h3>
            <div class="counting">
            <button class="count" id="dec" onclick="decrease(${index})">-</button>
            <h4>${item.quantity}</h4>
            <button class="count" id="inc" onclick="increase(${index})">+</button>
            </div>
            <button class="remove" onclick="removeCartItems(${index})">Remove</button>
            </div>
        </div>
        `;
  });
  //? Display the total value of the cart
  document.getElementById("total").innerHTML =
 `
 <div id="totalValue">
 Total value ₹ ${total}/-
 </div>
 `;
}
displayCartItems();

//! To remove items from cart
function removeCartItems(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(item, 1);
  //? reset the local storage after removing element
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}

//! To clear all items from the cart
function clearCart() {
  let ans = confirm("You are going to empty your Cart....");
  if (ans) {
    localStorage.setItem("cart", JSON.stringify([]));
    displayCartItems();
  }
}

//! To checkout after adding the cart items
function checkout() {
  alert("Thank you for shopping!");
  localStorage.setItem("cart", JSON.stringify([]));
  window.location.href = "./HomePage.html";
}

//! To increase the count of the item
function increase(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}

//! To decrease the count of the item
function decrease(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}