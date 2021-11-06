const getProducts = () => db2.collection('products').get();
const getUser = () => db2.collection('users').get();
var dniUser;
const productName = document.querySelector('#create-name');
const productDescription = document.querySelector('#create-desc');
const productAmount = document.querySelector('#create-amount');
const productPrice = document.querySelector('#create-price');

import {ID} from "./inventoryapp.js"
// User
const productList = document.querySelector('.products');
const userName = document.querySelector('.user');

const productView = e => {
    console.log(ID);
}

// Create Product
const productForm = document.querySelector('#create-product-form');
var productModal = new bootstrap.Modal(document.getElementById('productModal'), {
    keyboard: false
  })

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db2.collection('products').add({
        name: productName.value,
        description: productDescription.value,
        amount: productAmount.value,
        price: productPrice.value,
        dni: dniUser
        
    }).then(() => {
        location.reload()
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    productForm.reset();

    productModal.hide();


})

// Events
// List for auth state changes
auth.onAuthStateChanged(user => {
    if(user){
        loginCheck(user);
    }else{
        loginCheck(user);
    }
})