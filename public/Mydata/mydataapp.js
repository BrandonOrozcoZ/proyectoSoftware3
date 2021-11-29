const getUsers = () => db2.collection('users').get();
const card = document.getElementById("info-card");
const cardPer = document.getElementById("infoPer-card");
const cardUser = document.getElementById("user-card");

// User

const loginCheck = async (user) => {
    if(user){
        
        const querySnapshot = await getUsers();

        querySnapshot.docs.forEach( async (doc) => {    

            if(user.email.toUpperCase() == doc.data().email.toUpperCase()){

                user = doc.data()

                cardUser.innerHTML += `<h1>Hola ${user.name}!</h1>`;
                card.innerHTML += `
                            <ul class="list-group list-group-flush"> 
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Organización : </h7><h7>${user.businessName}</h7> </li>
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Descripción : </h7><h7>${user.description}</h7> </li>
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Mercado : </h7><h7>${user.market}</h7> </li>
                            </ul>`;
                        
                cardPer.innerHTML += `
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Cedula : </h7><h7>${user.dni}</h7> </li>
                            <li class="list-group-item"><h7 style="font-weight: bold;"> Correo : </h7><h7>${user.email}</h7> </li>
                            </ul>`;

            }

        });
    } 
}

// Events
// List for auth state changes
auth.onAuthStateChanged(user => {
    if(user){
        loginCheck(user);
    }else{
        loginCheck(user);
    }
})

