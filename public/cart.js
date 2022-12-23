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
    let addCart_btns = document.querySelectorAll("#add-cart");
    addCart_btns.forEach(btn =>{
        btn.addEventListener("click", handle_addCartItem);
    });

    // Buy Order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}
//=================== HANDLE EVENTS FUNCTIONS ======================
let itemsAdded = []

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

    // handle item is already exist
    if(itemsAdded.find(el => el.title == newToAdd.title)) {
        alert("This stock has already been added to cart!");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }


    // Add stock to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();

}


function handle_removeCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        el=>el.title != 
        this.parentElement.querySelector('.cart-stock-title').innerHTML
    );

    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); // To keep it integer

    update();
}

function handle_buyOrder(){
    if(itemsAdded.length <= 0){
        alert("There is nothing to buy yet! \n Please add some stocks to your cart first.");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = '';
    alert("Your order has been placed");
    itemsAdded = [];

    update();
}


//=================== UPDATE & RERENDER FUCNTIONS ======================
function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox =>{
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    totalElement.innerHTML = "$" + total;
}


//=================== HTML COMPONENTS ======================
function CartBoxComponent(title, price, imgSrc){
    return `
    <div class="cart-box">
        <img src=${imgSrc} class="cart-img">
        <div class="detail-box">
            <div class="cart-stock-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
    </div>
    <!--Remove-->
    <i class='bx bxs-trash-alt ' id="cart-remove"></i>
</div>`;
}