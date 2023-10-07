// main ideas of java script
// save the data
// generate the html
// make it interactive.

// save the Data.(info about our products).

import { cart,addToCart,calculateCartQuantity,removeProduct } from "../data/cart.js";
import { products } from "../data/products.js";
import{formatCurrency} from "./utils/money.js";

let productsHTML='';

products.forEach((product) => {
    productsHTML=productsHTML+ `
<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container ">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary
          js-add-to-cart" 
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`;


});
// console.log(productsHTML);

document.querySelector('.js-products-grid')
.innerHTML=productsHTML;



function updateCartQuantity(){
  // let cartQuantity=0;

  // cart.forEach((cartItem)=>{
  //   cartQuantity+=cartItem.quantity;
  // });
  const cartQuantity=calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
  .innerHTML=cartQuantity;
}

updateCartQuantity();
const addedMessageTimeouts={};

document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
  button.addEventListener('click',()=>{
    // const productId=button.dataset.productId;
    const {productId}=button.dataset;

    // already product undho ledho chudali ga daniki
    addToCart(productId);

    // to store the quantity;
    updateCartQuantity();
    // console.log(cartQuantity);
    // console.log(cart);

    const addedMessage=document.querySelector(`.js-added-to-cart-${productId}`);
  
    addedMessage.classList.add('added-to-cart-visible');

    setTimeout(()=>{
      const previoudTimeoutId=addedMessageTimeouts[productId];
      if(previoudTimeoutId){
        clearInterval(previoudTimeoutId);
      }
      const timeoutId=setInterval(()=>{
        addedMessage.classList.remove('added-to-cart-visible');

      },2000);

      addedMessageTimeouts[productId]=timeoutId;
    })
  });


});


// data attribute: data-product-name="${product.name}"
// it iis just an html attribute,have to start with "data-",then give it any name
// cart.push({
//   productName:'Basketball',
//   quantity:1
// })
