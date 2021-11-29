const getOrders= () => db2.collection('orders').get();
const getUser = () => db2.collection('users').get();
var dniUser;
const orderName = document.querySelector('#create-name');
const clientName = document.querySelector('#create-nameClient')
const orderDescription = document.querySelector('#create-desc');
const product = document.querySelector('#create-order-product')
const productAmount = document.querySelector('#create-amount');
const orderPrice = document.querySelector('#create-price');


// User
const orderList = document.querySelector('.orders');
const orderView = document.querySelector('.orderView')
const userName = document.querySelector('.user');

const loginCheck = async (user) => {
    if(user){
        
        const querySnapshot = await getUser();

        querySnapshot.docs.forEach( async (doc) => {

            if(user.email.toUpperCase() == doc.data().email.toUpperCase()){

                user = doc.data()

                dniUser = user.dni;

                const querySnapshot2 = await getOrders();
                
                querySnapshot2.docs.forEach((order) => {
                    console.log(order.id)

                    if(user.dni == order.data().dni){
                        
                        userName.innerHTML = `<h1>${user.businessName}</h1><div><h4>Registro de pedidos</h4></div>`;
                        orderList.innerHTML += `
                            <div id="pedido" class="card my-2 mx-2" style="width: 18rem; border: 0.5px solid rgb(255, 180, 41);">
                                <div class="card-body">
                                    <h4 class="card-title">${order.data().title}</h4>
                                    <h5 class="card-title">${order.data().clientName}</h5>
                                    <p class="card-text">${order.data().product}</p>
                                    <p class="card-text precio">${order.data().amount} unidades</p>
                                    <h5>${order.data().price}</h5>
                                </div>
                                <div class="card-footer" style="Background: white"></div>
                                <a href="#" class="btn btn-primary btn-view my-1" data-id="${order.id}">Ver Pedido</a>
                                    <a href="#" class="btn btn-danger btn-delete my-1" data-id="${order.id}">Eliminar</a>
                            </div>
                            `;

                        const btnsDelete = document.querySelectorAll('.btn-delete');
                        btnsDelete.forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                await deleteOrder(e.target.dataset.id)
                                location.reload();
                            })
                        })

                        const btnsView = document.querySelectorAll('.btn-view');
                        btnsView.forEach(btn2 => {
                            btn2.addEventListener('click', async (e) => {
                                await viewOrder (e.target.dataset.id);
                                
                            })
                        })
                        
                            
                    }

                });

            }

        });
    } 
}

const deleteOrder = id => db2.collection('orders').doc(id).delete();

const viewOrder = async(id) => {

    const querySnapshot3 = await getOrders();

    querySnapshot3.docs.forEach((order2) => {

        if(order2.id == id){
            
            orderView.innerHTML = `<div id="principal" class="caja my-2" style="background: white; background-color: white;">
                <h1>Datos del pedido</h1>
          <label for="orderName" class="form-label">Título del pedido:</label>
          <input type="text" class="form-control" id="orderName" placeholder="${order2.data().title}">
          <label for="clientName" class="form-label">Nombre del cliente:</label>
          <input type="text" class="form-control" id="orderName" placeholder="${order2.data().clientName}">
          <label for="clientName" class="form-label">Producto:</label>
          <input type="text" class="form-control" id="orderName" placeholder="${order2.data().product}">
          <div id="contenedor2" style="background-color: white;">
              <div id="col1" style="background-color: white; width: 48%;">
                  <label for="precio" class="form-label">Precio:</label>
                  <input type="number" class="form-control" id="precio" placeholder="${order2.data().price}">
              </div>
              <div id="col2" style="background-color: white; width: 48%;">
                  <label for="cantidad" class="form-label">Cantidad:</label>
                  <input type="number" class="form-control" id="cantidad" placeholder="${order2.data().amount}">
              </div>
          </div>
          <label for="description" class="form-label">Descipción:</label>
          <textarea class="form-control" id="description" rows="3"
              placeholder="${order2.data().description}"></textarea>
          <div id="contenedor" style="background-color: white; margin-top: 2%; margin-left: 14%;">
          </div>
          </div>
            <div id="sidebar" class="caja" style="background: white; background-color: white;">
            <div style="background: white; background-color: white; margin: 0% 17%;">
            <h4 style="text-align: center;">${order2.data().title}</h4>
            <h6 style="text-align: center;">${order2.data().clientName}</h6>
            <h10 style="text-align: center;">$${order2.data().product}</h6>
            <h10 style="text-align: center;">$${order2.data().price}</h6>
            <p style="text-align: center;">Disponibles: ${order2.data().amount}</p>
            <p style="text-align: center;">${order2.data().description}</p>
          </div>
            </div>
            `
          ;
                
        }

    });
} 

// Create order
const orderForm = document.querySelector('#create-order-form');
var orderModal = new bootstrap.Modal(document.getElementById('orderModal'), {
    keyboard: false
  })

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db2.collection('orders').add({
        title: orderName.value,
        clientName: clientName.value,
        description: orderDescription.value,
        product: product.value,
        amount: productAmount.value,
        price: orderPrice.value,
        dni: dniUser
        
    }).then(() => {
        location.reload()
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    orderForm.reset();

    orderModal.hide();


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

