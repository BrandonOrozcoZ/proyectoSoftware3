const getSales = () => db2.collection('sales').get();
const getUser = () => db2.collection('users').get();
var dniUser;
const saleName = document.querySelector('#create-name');
const clientName = document.querySelector('#create-nameClient')
const saleDescription = document.querySelector('#create-desc');
const product = document.querySelector('#create-sale-product')
const productAmount = document.querySelector('#create-amount');
const salePrice = document.querySelector('#create-price');


// User
const saleList = document.querySelector('.sales');
const saleView = document.querySelector('.saleView')
const userName = document.querySelector('.user');

const loginCheck = async (user) => {
    if(user){
        
        const querySnapshot = await getUser();

        querySnapshot.docs.forEach( async (doc) => {

            if(user.email.toUpperCase() == doc.data().email.toUpperCase()){

                user = doc.data()

                dniUser = user.dni;

                const querySnapshot2 = await getSales();
                
                querySnapshot2.docs.forEach((sale) => {
                    console.log(sale.id)

                    if(user.dni == sale.data().dni){
                        
                        userName.innerHTML = `<h1>${user.businessName}</h1><div><h4>Registro de ventas</h4></div>`;
                        saleList.innerHTML += `
                            <div id="venta" class="card my-2 mx-2" style="width: 18rem; border: 0.5px solid rgb(255, 180, 41);">
                                <div class="card-body">
                                    <h4 class="card-title">${sale.data().title}</h4>
                                    <h5 class="card-title">${sale.data().clientName}</h5>
                                    <p class="card-text">${sale.data().product}</p>
                                    <p class="card-text precio">${sale.data().amount} unidades</p>
                                    <h5>${sale.data().price}</h5>
                                </div>
                                <div class="card-footer" style="Background: white"></div>
                                <a href="#" class="btn btn-primary btn-view my-1" data-id="${sale.id}">Ver venta</a>
                                    <a href="#" class="btn btn-danger btn-delete my-1" data-id="${sale.id}">Eliminar</a>
                            </div>
                            `;

                        const btnsDelete = document.querySelectorAll('.btn-delete');
                        btnsDelete.forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                await deleteSale(e.target.dataset.id)
                                location.reload();
                            })
                        })

                        const btnsView = document.querySelectorAll('.btn-view');
                        btnsView.forEach(btn2 => {
                            btn2.addEventListener('click', async (e) => {
                                await viewSale (e.target.dataset.id);
                                
                            })
                        })
                        
                            
                    }

                });

            }

        });
    } 
}

const deleteSale = id => db2.collection('sales').doc(id).delete();

const viewSale = async(id) => {

    const querySnapshot3 = await getSales();

    querySnapshot3.docs.forEach((sale2) => {

        if(sale2.id == id){
            
            saleView.innerHTML = `<div id="principal" class="caja my-2" style="background: white; background-color: white;">
                <h1>Datos de la venta</h1>
          <label for="saleName" class="form-label">Título de la venta:</label>
          <input type="text" class="form-control" id="saleName" placeholder="${sale2.data().title}">
          <label for="clientName" class="form-label">Nombre del cliente:</label>
          <input type="text" class="form-control" id="saleName" placeholder="${sale2.data().clientName}">
          <label for="clientName" class="form-label">Producto:</label>
          <input type="text" class="form-control" id="saleName" placeholder="${sale2.data().product}">
          <div id="contenedor2" style="background-color: white;">
              <div id="col1" style="background-color: white; width: 48%;">
                  <label for="precio" class="form-label">Precio:</label>
                  <input type="number" class="form-control" id="precio" placeholder="${sale2.data().price}">
              </div>
              <div id="col2" style="background-color: white; width: 48%;">
                  <label for="cantidad" class="form-label">Cantidad:</label>
                  <input type="number" class="form-control" id="cantidad" placeholder="${sale2.data().amount}">
              </div>
          </div>
          <label for="description" class="form-label">Descipción:</label>
          <textarea class="form-control" id="description" rows="3"
              placeholder="${sale2.data().description}"></textarea>
          <div id="contenedor" style="background-color: white; margin-top: 2%; margin-left: 14%;">
          </div>
          </div>
            <div id="sidebar" class="caja" style="background: white; background-color: white;">
            <div style="background: white; background-color: white; margin: 0% 17%;">
            <h4 style="text-align: center;">${sale2.data().title}</h4>
            <h6 style="text-align: center;">${sale2.data().clientName}</h6>
            <h10 style="text-align: center;">$${sale2.data().product}</h6>
            <h10 style="text-align: center;">$${sale2.data().price}</h6>
            <p style="text-align: center;">Disponibles: ${sale2.data().amount}</p>
            <p style="text-align: center;">${sale2.data().description}</p>
          </div>
            </div>
            `
          ;
                
        }

    });
} 

// Create Sale
const saleForm = document.querySelector('#create-sale-form');
var saleModal = new bootstrap.Modal(document.getElementById('saleModal'), {
    keyboard: false
  })

saleForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db2.collection('sales').add({
        title: saleName.value,
        clientName: clientName.value,
        description: saleDescription.value,
        product: product.value,
        amount: productAmount.value,
        price: salePrice.value,
        dni: dniUser
        
    }).then(() => {
        location.reload()
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    saleForm.reset();

    saleModal.hide();


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

