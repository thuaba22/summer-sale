const applyButton = document.getElementById('apply-coupon');
const sell200Btn = document.getElementById('sell20-btn');
const purchaseBtn = document.getElementById('purchase-btn');
const couponInput = document.getElementById('coupon-input');
const productNameElement = document.getElementById('product-name');
const totalElement = document.getElementById('total-price');
const discountElement = document.getElementById('discount');
const totalAmountElement = document.getElementById('total-amount');
let totalPrice = 0;
let discount = 0;
let total = 0;
let isCouponApply = false;
let selectProductNames = [];

// function for updating and calculate total price
function updateProductInfo(productName, price){
    selectProductNames.push(productName);
    totalPrice += price;
    total = totalPrice - discount;
    totalElement.innerText = totalPrice.toFixed(2) + " Tk";
    purchaseBtn.disabled = false;
    if(!isCouponApply && total >=200){
        applyButton.disabled = false;
        sell200Btn.disabled = false;
    }
    let productList = '';
    for (let i = 0; i<selectProductNames.length; i++){
        productList += `${i + 1}. ${selectProductNames[i]}<br>`;
    }
    productNameElement.innerHTML = productList;
    totalAmountElement.textContent = total.toFixed(2) + " Tk";

}

// event listener for applying coupon
applyButton.addEventListener('click',function(){
  const inputCode = couponInput.value.trim();
  if(!isCouponApply && inputCode === 'SELL200'){
    discount = total*0.2;
    discountElement.textContent = `${discount.toFixed(2)} Tk`;
    total = totalPrice - discount;
    totalAmountElement.textContent = total.toFixed(2) + ' Tk';
    isCouponApply = true;
    // disabling but after coupon apply
    applyButton.disabled = true;
    // disabling the coupon input
    couponInput.disabled = true;
    // disabling the sell200 btn
    sell200Btn.disabled = true;
    // clear the input field after first time use
    couponInput.value = '';

  } 
  else{
    alert('Please type valid coupon code');
    couponInput.value = '';
  }  

});

// event listener for sell200 btn
sell200Btn.addEventListener('click',function(){
    couponInput.value = 'SELL200';
    // resetting the coupon status
    isCouponApply = false;
    applyButton.disabled = false;
    couponInput.disabled = false;
    // disabling the sell200 button after clicking
    sell200Btn.disabled = true;
});
// function to go back to the home page
function goHome(){
    location.reload();
}