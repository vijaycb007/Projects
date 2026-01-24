let products = [
  {
    id: 1,
    name: "Rice 5 KG bag",
    price: 250,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTLxnU5MdikkoUb8guZLVeIXhMhVjnR7D8TRcwPUoQgidIVzH8Vx7_-WmnO292GtckTi64grOgcK4G-jPMPGsN88K0NvLGebjqB4dMGP6Pll7z5QZNYIZ2k3g",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 2,
    name: "Mens T-Shirt",
    price: 599,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTsXWw8Yzw-0wO8uS3blJn-piNxNMpUsB5St2rvi2aP4l9_oQ5fv1cMK2fpZq-9xs3W_0d9yCoLAihvBNCASzwBIi4OgY2kruwjzVOrWmtu0lgwEDYwfMBd6Q",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 3,
    name: "Refregirator",
    price: 14999,
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSI7t2LNJ-lB-uVDw94kJP0LwB_TFoXMN_iMd9anfQ8nAf3aUEvf9-8-yfK8l4yRWuIoDWmruqDLICP1rygsNIFJHsKemsOM0r8kjNvIc54fcy6dTOHOSsJAg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 4,
    name: "Latex Matress",
    price: 12249,
    image:
      "https://m.media-amazon.com/images/I/91dYsJ3WL+L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 5,
    name: "Saffola Oil",
    price: 250,
    image:
      "https://m.media-amazon.com/images/I/615YIcRM3hL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 6,
    name: "Tata Salt",
    price: 25,
    image:
      "https://m.media-amazon.com/images/I/614mm2hYHyL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 7,
    name: "Fresh Onion 1 kg",
    price: 29,
    image:
      "https://m.media-amazon.com/images/I/51DJ-9xkuQL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 8,
    name: "Maggie Noodles 4",
    price: 60,
    image:
      "https://m.media-amazon.com/images/I/71R+kuYnovL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 9,
    name: "Roasted Pistachio 250gm",
    price: 299,
    image:
      "https://m.media-amazon.com/images/I/61JhQcWaosL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 10,
    name: "Harpic Disinfectant",
    price: 100,
    image:
      "https://m.media-amazon.com/images/I/71CeVuD+yIL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 11,
    name: "Basmati Rice",
    price: 199,
    image:
      "https://m.media-amazon.com/images/I/61gxfiurxZL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 12,
    name: "Dettol Skincare",
    price: 149,
    image:
      "https://m.media-amazon.com/images/I/61cT-uFfHOL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 13,
    name: "Vim 500ml",
    price: 99,
    image:
      "https://m.media-amazon.com/images/I/610DprJKeRL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 14,
    name: "Colgate",
    price: 49,
    image:
      "https://m.media-amazon.com/images/I/71EJjIYiAiL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 15,
    name: "Pears",
    price: 39,
    image:
      "https://m.media-amazon.com/images/I/51hE0ECac6L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 16,
    name: "Parachute Coconut Oil",
    price: 129,
    image:
      "https://m.media-amazon.com/images/I/71UAbfo2kjL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 17,
    name: "Eggs 1 dozen",
    price: 70,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvOVt-jbznzVr9MiaghVDR1NBQaq0GXFAO3A&s",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 18,
    name: "Ginger Powder",
    price: 199,
    image:
      "https://m.media-amazon.com/images/I/510fzfr6FvL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 19,
    name: "Patanjali Honey",
    price: 249,
    image:
      "https://m.media-amazon.com/images/I/71AIWPEpcrL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Groceries",
    quantity:1,
  },
  {
    id: 20,
    name: "Mens Blue T-Shirt",
    price: 399,
    image:
      "https://m.media-amazon.com/images/I/713n+TxyfCL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 21,
    name: "Mens Full sleeve Shirt",
    price: 799,
    image:
      "https://m.media-amazon.com/images/I/518l5mQG-kL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 22,
    name: "Women's Pant",
    price: 999,
    image:
      "https://m.media-amazon.com/images/I/61IQxUFTl1L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 23,
    name: "Mens Cotton Shirt",
    price: 549,
    image:
      "https://m.media-amazon.com/images/I/71nEy2iSx-L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 24,
    name: "Mens Sweatshirt",
    price: 899,
    image:
      "https://m.media-amazon.com/images/I/41XXiwXboSL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 25,
    name: "Mens Baggy Pant",
    price: 550,
    image:
      "https://m.media-amazon.com/images/I/41vimVyBlUL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 26,
    name: "Women's collar kurta",
    price: 569,
    image:
      "https://m.media-amazon.com/images/I/51Z2ZOzNnKL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 27,
    name: "Women's Kurta",
    price: 999,
    image:
      "https://m.media-amazon.com/images/I/61y8oCHRMiL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 28,
    name: "Mens Clothing Set",
    price: 799,
    image:
      "https://m.media-amazon.com/images/I/61JxTwwj-5L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 29,
    name: "Women's Top and Trouser",
    price: 600,
    image:
      "https://m.media-amazon.com/images/I/51JzzjLSJzL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 30,
    name: "Women's Ethnic wear",
    price: 799,
    image:
      "https://m.media-amazon.com/images/I/51yquppLtaL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 31,
    name: "Women's Sport Wear",
    price: 869,
    image:
      "https://m.media-amazon.com/images/I/61-NpQakjsL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 32,
    name: "Women's Gym T-Shirt",
    price: 599,
    image:
      "https://m.media-amazon.com/images/I/51jm2qZcGeL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 33,
    name: "Bike Riding Gloves",
    price: 399,
    image:
      "https://m.media-amazon.com/images/I/51qPeNQiiKL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Clothing",
    quantity:1,
  },
  {
    id: 34,
    name: "Smart Ring",
    price: 499,
    image:
      "https://m.media-amazon.com/images/I/61hK5QTdINL._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 35,
    name: "Redmi Pad 2",
    price: 9499,
    image:
      "https://m.media-amazon.com/images/I/71cXQm1s52L._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 36,
    name: "Power bank",
    price: 1499,
    image:
      "https://m.media-amazon.com/images/I/61-LzFrwl5L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 37,
    name: "OnePlus Earbuds",
    price: 3499,
    image:
      "https://m.media-amazon.com/images/I/51nBTTG3hNL._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 38,
    name: "Jio Router",
    price: 2499,
    image:
      "https://m.media-amazon.com/images/I/316sdRiF3ML._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 39,
    name: "One Plus Pad Lite",
    price: 12499,
    image:
      "https://m.media-amazon.com/images/I/61NmETUvDiL._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 40,
    name: "IPhone 17 Pro",
    price: 125499,
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSyk_JGRedq4wUogPs0C_n0eK-4Fg-PGwifCkVu5iWo9iEhCxLsFLY3T1BukS5VXVyngPneEu5i-RU6jRvyO2UtxQKgKAgfQDC4syg-dvkMFO2LVaD83z2vpA",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 41,
    name: "Gaming Console",
    price: 499,
    image:
      "https://m.media-amazon.com/images/I/511gYPs6+QL._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 42,
    name: "Bajaj Mini Fan",
    price: 1999,
    image:
      "https://m.media-amazon.com/images/I/71QKvLOpH8L._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 43,
    name: "Canon Camera",
    price: 61999,
    image:
      "https://m.media-amazon.com/images/I/81LskAU5h1L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 44,
    name: "Bluetooth Headphones",
    price: 7999,
    image:
      "https://m.media-amazon.com/images/I/41lArSiD5hL._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 45,
    name: "Casio Vintage Watch",
    price: 5499,
    image:
      "https://m.media-amazon.com/images/I/61ybeKQto8L._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 46,
    name: "Lenovo Laptop",
    price: 50499,
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpDzJOQAnyOpnAfUm_IeQEKLQwkPYn7KplWHsxbHsuyy_ANfsLclitf5CYG2mvYmtC9Ec9d-uAropRzoQFG2e24tM95_EOc1sXxvQM0d-IPwJnrjKzqWlC_Q",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 47,
    name: "Smart LED Projector",
    price: 7499,
    image:
      "https://m.media-amazon.com/images/I/51y0XkrgaGL._AC_UY327_FMwebp_QL65_.jpg",
    category: "Electronics",
    quantity:1,
  },
  {
    id: 48,
    name: "Book Self",
    price: 1900,
    image:
      "https://m.media-amazon.com/images/I/716qqO69xPL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 49,
    name: "4 piece Sofa Set",
    price: 10249,
    image:
      "https://m.media-amazon.com/images/I/71BQIundnmL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 50,
    name: "Side table",
    price: 499,
    image:
      "https://m.media-amazon.com/images/I/51eoKWxpEQL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 51,
    name: "Wood Wall Self",
    price: 549,
    image:
      "https://m.media-amazon.com/images/I/710id8okAyL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 52,
    name: "Coffee Table",
    price: 1249,
    image:
      "https://m.media-amazon.com/images/I/71jnPeAzR5L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 53,
    name: "Door mat",
    price: 249,
    image:
      "https://m.media-amazon.com/images/I/91dYsJ3WL+L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 54,
    name: "King Size Bed",
    price: 15000,
    image:
      "https://m.media-amazon.com/images/I/71hI+XoAYPL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 55,
    name: "TV Stand",
    price: 5549,
    image:
      "https://m.media-amazon.com/images/I/91dYsJ3WL+L._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 56,
    name: "Swing Chair",
    price: 7449,
    image:
      "https://m.media-amazon.com/images/I/61dxpSytoiL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 57,
    name: "Shoe Rack",
    price: 2299,
    image:
      "https://m.media-amazon.com/images/I/61jBQnj2wNL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 58,
    name: "5 seater sofa",
    price: 12249,
    image:
      "https://m.media-amazon.com/images/I/71ydNvojJoL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 59,
    name: "Set up Box Stand",
    price: 12249,
    image:
      "https://m.media-amazon.com/images/I/71bVGOak2eL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
  {
    id: 60,
    name: "Sofa cum bed",
    price: 10999,
    image:
      "https://m.media-amazon.com/images/I/51PF1LE46nL._AC_UL480_FMwebp_QL65_.jpg",
    category: "Furniture",
    quantity:1,
  },
];

//! Displaying the products on UI dynamically
function displayProducts(data) {
  let item = document.getElementById("productList");
  item.innerHTML = data.map(
    (products) =>
      `<div class="productsCard">
    <img src=${products.image} alt="product image" height="230px" width="190px">
        <p>${products.name}</p>
        <h4>₹ ${products.price}</h4>
        <button onclick="addToCart(${products.id})">Add to Cart</button>
      </div>`,
  );
}
displayProducts(products);

//? addToCart() function is called for on clicking the cart button
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = products.find((p) => p.id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${item.name} added to Cart`);
}

//! Get username beside Cart
let userData = JSON.parse(localStorage.getItem("userData"));
console.log(userData);

let h3 = (document.getElementById("username").innerText =
  `Hi! ${userData.Username}`);

//! To update the count of the Cart
function updateCartCount() {
  let cartCount = document.getElementById("cartCount");
  let cart = JSON.parse(localStorage.getItem("cart"));
  cartCount.innerText = `${cart.length}`;
}

//! To implement search function
let searchInput = document.getElementById('searchBox')
//? Trigger on input for the search box
searchInput.oninput=()=>{
  //? Convert to lowercase if upper case is present
  let value = searchInput.value.toLowerCase()
  let filterProducts = products.filter(p=>p.name.toLowerCase().includes(value))
  //? If product is present display that product
  displayProducts(filterProducts)
}