const getProducts = () => db2.collection('products').get();
const getUser = () => db2.collection('users').get();
var dniUser;
const productName = document.querySelector('#create-name');
const productDescription = document.querySelector('#create-desc');
const productAmount = document.querySelector('#create-amount');
const productPrice = document.querySelector('#create-price');


// User
const productList = document.querySelector('.products');
const productView = document.querySelector('.productView')
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
                        
                        userName.innerHTML = `<h1>${user.businessName}</h1><div><h4>Registro de inventario</h4></div>`;
                        productList.innerHTML += ` 
                            <div class="card my-4 mx-2" style="width: 18rem; border-radius: 15px; border: 0.5px solid lightskyblue;">
                                <div class="card-body">
                                    <h5 class="card-title">${product.data().name}</h5>
                                    <p class="card-text">${product.data().amount} restantes!</p>
                                    <a href="#" class="btn btn-primary btn-view" data-id="${product.id}">Ver producto</a>
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

                        const btnsView = document.querySelectorAll('.btn-view');
                        btnsView.forEach(btn2 => {
                            btn2.addEventListener('click', async (e) => {
                                await viewProduct (e.target.dataset.id);
                                
                            })
                        })
                        
                            
                    }

                });

            }

        });
    } 
}

const deleteProduct = id => db2.collection('products').doc(id).delete();

const viewProduct = async(id) => {

    const querySnapshot3 = await getProducts();

    querySnapshot3.docs.forEach((product2) => {

        if(product2.id == id){
            
            productView.innerHTML = `<div id="principal" class="caja my-2" style="background: white; background-color: white;">
                <h1>Datos del producto</h1>
          <label for="productName" class="form-label">Nombre del producto:</label>
          <input type="text" class="form-control" id="productName" placeholder="${product2.data().name}">
          <label for="description" class="form-label">Descipción:</label>
          <textarea class="form-control" id="description" rows="3"
              placeholder="${product2.data().description}"></textarea>
          <div id="contenedor2" style="background-color: white;">
              <div id="col1" style="background-color: white; width: 48%;">
                  <label for="precio" class="form-label">Precio:</label>
                  <input type="number" class="form-control" id="precio" placeholder="${product2.data().price}">
              </div>
              <div id="col2" style="background-color: white; width: 48%;">
                  <label for="cantidad" class="form-label">Cantidad:</label>
                  <input type="number" class="form-control" id="cantidad" placeholder="${product2.data().amount}">
              </div>
          </div>

          <label for="imagenes" class="form-label">Agrega una imagen de tu producto. (opcional)</label>
          <input class="form-control" type="file" id="imagenes">

          <div id="contenedor" style="background-color: white; margin-top: 2%; margin-left: 14%;">
          </div>
          </div>
            <div id="sidebar" class="caja" style="background: white; background-color: white;">
            <div style="background: white; background-color: white; margin: 0% 17%;">
            <img src="/images/imagend.png">
            <h4 style="text-align: center;">${product2.data().name}</h4>
            <h6 style="text-align: center;">$${product2.data().price}</h6>
            <p style="text-align: center;">${product2.data().description}</p>
            <p style="text-align: center;">Disponibles: ${product2.data().amount}</p>
          </div>
            </div>
            `
          ;
                
        }

    });
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

