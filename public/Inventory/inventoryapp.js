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
                    console.log(product.id)

                    if(user.dni == product.data().dni){
                        
                        userName.innerHTML = `<h1>Inventario ${user.businessName}</h1>`;
                        productList.innerHTML += ` 
                            <div class="card my-4 mx-2" style="width: 18rem; border-radius: 15px; border: 0.5px solid lightskyblue;">
                                <div class="card-body">
                                    <h5 class="card-title">${product.data().name}</h5>
                                    <p class="card-text">${product.data().amount} restantes!</p>
                                    <a href="product.html" class="btn btn-primary btn-view" data-id="${product.id}">Ver producto</a>
                                    <a href="#" class="btn btn-danger btn-delete" data-id="${product.id}">Eliminar</a>
                                </div>
                            </div>
                            `;

                        const btnsDelete = document.querySelectorAll('.btn-delete');
                        btnsDelete.forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                await deleteProduct(e.target.dataset.id)
                                location.reload();
                            })
                        })
                        
                            
                    }

                });

            }

        });
    } 
}

const deleteProduct = id => db2.collection('products').doc(id).delete();

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

