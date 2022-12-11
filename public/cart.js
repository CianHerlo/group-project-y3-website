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
    })
}
//=================== HANDLE EVENTS FUNCTIONS ======================
function handle_removeCartItem(){
    this.parentElement.remove();

    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); // To keep it integer
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