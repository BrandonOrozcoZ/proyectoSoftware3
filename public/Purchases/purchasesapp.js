const getPurchases = () => db2.collection('purchases').get();
const getUser = () => db2.collection('users').get();
var dniUser;
const purchaseName = document.querySelector('#create-name');
const nameProvider = document.querySelector('#create-nameProvider')
const purchaseDescription = document.querySelector('#create-desc');
const product = document.querySelector('#create-purchase-product')
const productAmount = document.querySelector('#create-amount');
const purchasePrice = document.querySelector('#create-price');


// User
const purchaseList = document.querySelector('.purchases');
const purchaseView = document.querySelector('.purchaseView')
const userName = document.querySelector('.user');

const loginCheck = async (user) => {
    if(user){
        
        const querySnapshot = await getUser();

        querySnapshot.docs.forEach( async (doc) => {

            if(user.email.toUpperCase() == doc.data().email.toUpperCase()){

                user = doc.data()

                dniUser = user.dni;

                const querySnapshot2 = await getPurchases();
                
                querySnapshot2.docs.forEach((purchase) => {
                    console.log(purchase.id)

                    if(user.dni == purchase.data().dni){
                        
                        userName.innerHTML = `<h1>${user.businessName}</h1><div><h4>Registro de compras</h4></div>`;
                        purchaseList.innerHTML += `
                            <div id="compra" class="card my-2 mx-2" style="width: 18rem; border: 0.5px solid rgb(255, 180, 41);">
                                <div class="card-body">
                                    <h4 class="card-title">${purchase.data().title}</h4>
                                    <h5 class="card-title">${purchase.data().providerName}</h5>
                                    <p class="card-text">${purchase.data().product}</p>
                                    <p class="card-text precio">${purchase.data().amount} unidades</p>
                                    <h5>${purchase.data().price}</h5>
                                </div>
                                <div class="card-footer" style="Background: white"></div>
                                <a href="#" class="btn btn-primary btn-view my-1" data-id="${purchase.id}">Ver compra</a>
                                    <a href="#" class="btn btn-danger btn-delete my-1" data-id="${purchase.id}">Eliminar</a>
                            </div>
                            `;

                        const btnsDelete = document.querySelectorAll('.btn-delete');
                        btnsDelete.forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                await deletePurchase(e.target.dataset.id)
                                location.reload();
                            })
                        })

                        const btnsView = document.querySelectorAll('.btn-view');
                        btnsView.forEach(btn2 => {
                            btn2.addEventListener('click', async (e) => {
                                await viewPurchase (e.target.dataset.id);
                                
                            })
                        })
                        
                            
                    }

                });

            }

        });
    } 
}

const deletePurchase = id => db2.collection('purchases').doc(id).delete();

const viewPurchase = async(id) => {

    const querySnapshot3 = await getPurchases();

    querySnapshot3.docs.forEach((purchase2) => {

        if(purchase2.id == id){
            
            purchaseView.innerHTML = `<div id="principal" class="caja my-2" style="background: white; background-color: white;">
                <h1>Datos de la compra</h1>
          <label for="purchaseName" class="form-label">Título de la compra:</label>
          <input type="text" class="form-control" id="purchaseName" placeholder="${purchase2.data().title}">
          <label for="nameProvider" class="form-label">Nombre del proveedor:</label>
          <input type="text" class="form-control" id="nameProvider" placeholder="${purchase2.data().providerName}">
          <label for="purchaseProduct" class="form-label">Producto:</label>
          <input type="text" class="form-control" id="purchaseProduct" placeholder="${purchase2.data().product}">
          <div id="contenedor2" style="background-color: white;">
              <div id="col1" style="background-color: white; width: 48%;">
                  <label for="precio" class="form-label">Precio:</label>
                  <input type="number" class="form-control" id="precio" placeholder="${purchase2.data().price}">
              </div>
              <div id="col2" style="background-color: white; width: 48%;">
                  <label for="cantidad" class="form-label">Cantidad:</label>
                  <input type="number" class="form-control" id="cantidad" placeholder="${purchase2.data().amount}">
              </div>
          </div>
          <label for="description" class="form-label">Descipción:</label>
          <textarea class="form-control" id="description" rows="3"
              placeholder="${purchase2.data().description}"></textarea>
          <div id="contenedor" style="background-color: white; margin-top: 2%; margin-left: 14%;">
          </div>
          </div>
            <div id="sidebar" class="caja" style="background: white; background-color: white;">
            <div style="background: white; background-color: white; margin: 0% 17%;">
            <h4 style="text-align: center;">${purchase2.data().title}</h4>
            <h6 style="text-align: center;">${purchase2.data().clientName}</h6>
            <h10 style="text-align: center;">$${purchase2.data().product}</h6>
            <h10 style="text-align: center;">$${purchase2.data().price}</h6>
            <p style="text-align: center;">Disponibles: ${purchase2.data().amount}</p>
            <p style="text-align: center;">${purchase2.data().description}</p>
          </div>
            </div>
            `
          ;
                
        }

    });
} 

// Create purchase
const purchaseForm = document.querySelector('#create-purchase-form');
var purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'), {
    keyboard: false
  })

  purchaseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db2.collection('purchases').add({
        title: purchaseName.value,
        providerName: nameProvider.value,
        description: purchaseDescription.value,
        product: product.value,
        amount: productAmount.value,
        price: purchasePrice.value,
        dni: dniUser
        
    }).then(() => {
        location.reload()
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    purchaseForm.reset();

    purchaseModal.hide();


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

