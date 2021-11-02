const getProducts = () => db.collection('products').get();
const email = document.querySelector('#signup-email');
const password = document.querySelector('#signup-password');
const userName = document.querySelector('#signup-name');
const bName = document.querySelector('#signup-business');
const dni = document.querySelector('#signup-dni');


// Login check
const loggedOut = document.querySelectorAll('.logged-out')
const loggedIn = document.querySelectorAll('.logged-in')
const loginCheck = user => {
    if (user) {
        loggedIn.forEach(link => link.style.display = 'block');
        loggedOut.forEach(link => link.style.display = 'none');
    } else {
        loggedIn.forEach(link => link.style.display = 'none');
        loggedOut.forEach(link => link.style.display = 'block');
    }
}

// Register
const signupForm = document.querySelector('#signup-form');
var signupModal = new bootstrap.Modal(document.getElementById('signUpModal'), {
    keyboard: false
})

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(userCredential => {

            db.collection('users').add({
                name: userName.value,
                email: email.value,
                password: password.value,
                businessName: bName.value,
                dni: dni.value
            });

            signupForm.reset();

            signupModal.hide();

        })


})

// Login
const loginForm = document.querySelector('#login-form')
var loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {
    keyboard: false
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;


    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {

            loginForm.reset();

            loginModal.hide();

        })

})


// Logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut().then(() => {
        console.log('sign out')
    })

})



// Events
// List for auth state changes
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('users')
            .get()
            .then((snapshot) => {
                loginCheck(user);
            })

    } else {
        loginCheck(user);
    }
})


// Diseño

const typed = new Typed('.typed', {
    strings: [
        '<i id="tipo" style="font-weight: bold; color: #c99806; font-style: normal;">Tienda</i>',
        '<i id="tipo" style="font-weight: bold; color: #c99806; font-style: normal;">Fábrica</i>',
        '<i id="tipo" style="font-weight: bold; color: #c99806; font-style: normal;">Negocio</i>'
    ],
    typeSpeed: 75,
    startDelay: 100,
    backSpeed: 75,
    smartBackspace: true,
    shuffle: false,
    backDelay: 700,
    fadeOut: false,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 500,
    loop: true,
    loopCount: Infinity,
    showCursor: true,
    cursorChar: '|',
    autoInsertCss: true,

});