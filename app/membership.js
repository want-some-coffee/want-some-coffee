function register() {
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


function login() {
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    let user_records = JSON.parse(localStorage.getItem('users')) || [];

    if (user_records.some((v) => v.email === email && v.password === password)) {
        alert('Login Successful');
        let current_user = user_records.find((v) => v.email === email && v.password === password);

        // Store user information in localStorage
        localStorage.setItem('name', current_user.name);
        localStorage.setItem('email', current_user.email);

        // Redirect to profile.html
        window.location.href = '../index.html';
    } else {
        alert('Login Failed. Please check your credentials.');
    }
}