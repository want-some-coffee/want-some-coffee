let a = document.getElementById('login-btn');
let b = document.getElementById('register-btn');
let x = document.getElementById('login');
let y = document.getElementById('register');

function loginBtn() {
    x.style.left = '4px';
    y.style.right = '-520px';

}

function registerBtn() {
    x.style.left = '-510px';
    y.style.right = '5px';
}


function saveData() {
    let firstName = document.getElementById('register-first-name').value;
    let lastName = document.getElementById('register-last-name').value;
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    // localStorage.setItem('name', name);
    // localStorage.setItem('email', email);
    // localStorage.setItem('password', password);

    let user_records = [];
    user_records = JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):[];
    if(user_records.some((v)=> v.email == email)) {
        alert('Duplicate data')
    } else {
        user_records.push({ 'fname':firstName, 'lname':lastName, 'email':email, 'password':password});
    }
    localStorage.setItem('users', JSON.stringify(user_records));

}