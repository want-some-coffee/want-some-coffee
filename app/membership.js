


function register() {
    let firstName = document.getElementById('register-first-name').value;
    let lastName = document.getElementById('register-last-name').value;
    let address = document.getElementById('register-address').value;
    let country = document.getElementById('register-country').value;
    let postalCode = document.getElementById('register-postalcode').value;
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let favoriteCafe = document.getElementById('register-favcafe').value;

    let user_records = [];
    user_records = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];

    if (!firstName || !lastName || !address || !country || !postalCode || !email || !password) {
        alert('Please fill all the required fields');
        return;
    }

    if (user_records.some(v => v.email === email)) {
        alert('Email already registered');
        return;
    }


    user_records.push({ 'fname': firstName, 'lname': lastName, 'address': address, 'country': country, 'pcode': postalCode, 'email': email, 'password': password, 'cafe': favoriteCafe });

    localStorage.setItem('users', JSON.stringify(user_records));

    alert('Registration successful!');

    clearForm();
}

function clearForm() {
    document.getElementById('register-first-name').value = '';
    document.getElementById('register-last-name').value = '';
    document.getElementById('register-address').value = '';
    document.getElementById('register-country').value = '';
    document.getElementById('register-postalcode').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-favcafe').value = '';
}


function login() {

    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    let user_records = JSON.parse(localStorage.getItem('users')) || [];

    if (email === '' || password === '') {
        alert('Email and password are required.');
        return;
    }


    if (user_records.some((v) => v.email === email && v.password === password)) {
        alert('Login Successful');
        let currentUser = user_records.find((v) => v.email === email && v.password === password);

        localStorage.setItem('fname', currentUser.fname);
        localStorage.setItem('lname', currentUser.lname);
        localStorage.setItem('address', currentUser.address);
        localStorage.setItem('country', currentUser.country);
        localStorage.setItem('pcode', currentUser.pcode);
        localStorage.setItem('email', currentUser.email);
        localStorage.setItem('cafe', currentUser.cafe);

        window.location.href = 'profile.html';

    } else {
        alert('Login Failed. Please check your credentials.');
    }
}




function logout() {
    localStorage.removeItem('fname');
    localStorage.removeItem('lname');
    localStorage.removeItem('address');
    localStorage.removeItem('country');
    localStorage.removeItem('pcode');
    localStorage.removeItem('email');
    localStorage.removeItem('cafe');
    window.location.href = 'login.html';
}


let registerInputs = document.querySelectorAll('.register-input');

registerInputs.forEach(input => {
    input.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) { 
            register();
        }
    });
});


let loginInputs = document.querySelectorAll('.login-input');

loginInputs.forEach(input => {
    input.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            login();
        }
    })
})