//OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', ()=>{
    cart.classList.add('active');
});

closeCart.addEventListener('click', ()=>{
    cart.classList.remove('active');
});

//Start when the document is ready 
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start)
}else{
    start();
}


//=================== START ================================
function start(){
    addEvents();
    updateTotal();

}
//=================== UPDATE & RERENDER======================
function update(){
    addEvents();
    updateTotal();

}
//=================== ADD EVENTS ======================
function addEvents(){
    // Remove items from cart
    let cartRemove_btns = document.querySelectorAll('#cart-remove');
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    // Change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    // Add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn =>{
        btn.addEventListener("click", handle_addCartItem);
    });
}
//=================== HANDLE EVENTS FUNCTIONS ======================
function handle_addCartItem(){
    let stock = this.parentElement;
    let title = stock.querySelector(".stock-title").innerHTML;
    let price = stock.querySelector(".stock-price").innerHTML;
    let imgSrc = stock.querySelector(".image").src;

    let newToAdd = {
        title, 
        price, 
        imgSrc,
    };

    // Add product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);

}


function handle_removeCartItem(){
    this.parentElement.remove();

    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); // To keep it integer

    update();
}


//=================== UPDATE & RERENDER FUCNTIONS ======================
function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("€", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    totalElement.innerHTML = "€" + total;
}


//=================== HTML COMPONENTS ======================
function CartBoxComponent(title, price, imgSrc){
    return <>
    <div class="cart-box">
    <img src="./stocks/adobe.PNG" class="cart-img">
    <div class="detail-box">
      <div class="cart-stock-title">Adobe</div>
      <div class="cart-price">€700</div>
      <input type="number" value="1" class="cart-quantity">
  </div>
  <i class='bx bxs-trash-alt ' id="cart-remove"></i>
</div></>