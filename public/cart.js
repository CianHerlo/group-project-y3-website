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
}
//=================== HANDLE EVENTS FUNCTIONS ======================
function handle_removeCartItem(){
    this.parentElement.remove();

    update();
}
//=================== UPDATE & RERENDER FUCNTIONS ======================
function update(){
    addEvents();

}