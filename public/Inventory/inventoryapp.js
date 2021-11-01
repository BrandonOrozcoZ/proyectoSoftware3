const getProducts = () => db2.collection('products').get();
const getUser = () => db2.collection('users').get();
var dniUser;
const productName = document.querySelector('#create-name');
const productDescription = document.querySelector('#create-desc');
const productAmount = document.querySelector('#create-amount');
const productPrice = document.querySelector('#create-price');


// User
const productList = document.querySelector('.products');
const userName = document.querySelector('.user');

const loginCheck = async (user) => {
    if(user){
        
        const querySnapshot = await getUser();

        querySnapshot.docs.forEach( async (doc) => {

            if(user.email.toUpperCase() == doc.data().email.toUpperCase()){

                user = doc.data()

                dniUser = user.dni;

                const querySnapshot2 = await getProducts();
                
                querySnapshot2.docs.forEach((product) => {

                    if(user.dni == product.data().dni){
                        
                        userName.innerHTML = `<h1>${user.businessName} Inventory</h1>`;
                        productList.innerHTML += ` 
                            <div class="card my-4 mx-2" style="width: 18rem;">
                                <div class="card-body">
                                    <h5 class="card-title">${product.data().name}</h5>
                                    <p class="card-text">${product.data().amount} remaining</p>
                                    <a href="product.html" class="btn btn-primary">Product view</a>
                                </div>
                            </div>
                            `;
                        
                            
                    }

                });

            }

        });
    } 
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

// Logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut().then(() =>{
        console.log('sign out')
    })

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

