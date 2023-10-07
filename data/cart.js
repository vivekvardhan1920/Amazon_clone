export let cart= JSON.parse(localStorage.getItem('cart'));
 if(!cart){
  cart=[
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2
        // image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        // name: "Black and Gray Athletic Cotton Socks - 6 Pairs",

      },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1
      }
];
 }

// when we refresh the added items should remain the same but here it is getting back to the example one
// so we store the items in local storage for that 
function saveToStorage(){
localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId) {
    let matchingItem; 
  
      cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem=cartItem;
        }
      });
      const quantitySelector=document.querySelector(`.js-quantity-selector-${productId}`);
      // const quantity=quantitySelector.value;
      const quantity=Number(quantitySelector.value);
      
  
  
      if(matchingItem){
        // matchingItem.quantity+=1;
        matchingItem.quantity+=quantity;
      }else{
        cart.push({
          // productId:productId,
          
          // quantity:quantity
          productId,
          quantity
        });
      }
      saveToStorage();
  }

  export function calculateCartQuantity(){
    let cartQuantity=0;
    cart.forEach((cartItem)=>{
      cartQuantity+=cartItem.quantity;
    });

    return cartQuantity;
  }
  export function updateQuantity(productId,newQuantity){
    let matchingItem;
    cart.forEach((cartItem)=>{
      if(productId===cartItem.productId){
        matchingItem=cartItem;
      }
    });
    matchingItem.quantity=newQuantity;
    saveToStorage();
  }

  export function removeProduct(productId){
    // how to delete the product from the cart?
    // here are the steps;
    // s1:Create a new array;
    // s2:loop through the cart;
    // s3:Add each product to the new array,except for this productid;
    const newCart=[];
    
    cart.forEach((cartItem)=>{
      if(cartItem.productId!=productId){
        newCart.push(cartItem);
      }
    });

    cart=newCart;

    saveToStorage();
  }