


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

        // window.location.href = 'profile.html';

    } else {
        alert('Login Failed. Please check your credentials.');
    }
}







/* profile page */


document.getElementById('user_fname').innerText = localStorage.getItem('fname');
document.getElementById('user_lname').innerText = localStorage.getItem('lname');
document.getElementById('user_address').innerText = localStorage.getItem('address');
document.getElementById('user_country').innerText = localStorage.getItem('country');
document.getElementById('user_pcode').innerText = localStorage.getItem('pcode');
document.getElementById('user_email').innerText = localStorage.getItem('email');
document.getElementById('user_favcafe').innerText = localStorage.getItem('cafe');



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



function openEditModal() {
    document.getElementById('editAddress').value = document.getElementById('user_address').textContent;
    document.getElementById('editPostalCode').value = document.getElementById('user_pcode').textContent;
    document.getElementById('editCountry').value = document.getElementById('user_country').textContent;
    document.getElementById('editFavCafe').value = document.getElementById('user_favcafe').textContent;

    let editModal = new bootstrap.Modal(document.getElementById('editProfileModal'));
    editModal.show();
}


function saveProfile() {

    let updatedAddress = document.getElementById('editAddress').value;
    let updatedPostalCode = document.getElementById('editPostalCode').value;
    let updatedCountry = document.getElementById('editCountry').value;
    let updatedFavCafe = document.getElementById('editFavCafe').value;


    document.getElementById('user_address').textContent = updatedAddress;
    document.getElementById('user_pcode').textContent = updatedPostalCode;
    document.getElementById('user_country').textContent = updatedCountry;
    document.getElementById('user_favcafe').textContent = updatedFavCafe;

    let currentUserEmail = localStorage.getItem('email');

    let user_records = JSON.parse(localStorage.getItem('users')) || [];

    let currentUser = user_records.find(user => user.email === currentUserEmail);

    if (currentUser) {
        currentUser.address = updatedAddress;
        currentUser.pcode = updatedPostalCode;
        currentUser.country = updatedCountry;
        currentUser.cafe = updatedFavCafe;

        localStorage.setItem('users', JSON.stringify(user_records));
    }


    let editModal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
    editModal.hide();
}


function openChangePasswordModal() {
    document.getElementById('step1').classList.remove('d-none');
    document.getElementById('step2').classList.add('d-none');
    document.getElementById('nextButton').classList.remove('d-none');
    document.getElementById('saveButton').classList.add('d-none');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';

    let changePasswordModal = new bootstrap.Modal(document.getElementById('changePasswordModal'));
    changePasswordModal.show();
  }


  document.addEventListener('DOMContentLoaded', function() {
    let nextButton = document.getElementById('nextButton');
    let saveButton = document.getElementById('saveButton');
    let step1 = document.getElementById('step1');
    let step2 = document.getElementById('step2');
    let currentPasswordInput = document.getElementById('currentPassword');
    let newPasswordInput = document.getElementById('newPassword');
    let changePasswordModalElement = document.getElementById('changePasswordModal');

    nextButton.addEventListener('click', function() {
      let currentPassword = currentPasswordInput.value;

      let currentUserEmail = localStorage.getItem('email');
      let user_records = JSON.parse(localStorage.getItem('users')) || [];
      let currentUser = user_records.find(user => user.email === currentUserEmail);

      if (currentUser && currentUser.password === currentPassword) {
        step1.classList.add('d-none');
        step2.classList.remove('d-none');
        nextButton.classList.add('d-none');
        saveButton.classList.remove('d-none');
      } else {
        alert('Current password is incorrect.');
      }
    });

    saveButton.addEventListener('click', function() {
      let newPassword = newPasswordInput.value;

      if (newPassword) { 
        let currentUserEmail = localStorage.getItem('email');
        let user_records = JSON.parse(localStorage.getItem('users')) || [];
        let currentUser = user_records.find(user => user.email === currentUserEmail);

        if (currentUser) {
          currentUser.password = newPassword;
          localStorage.setItem('users', JSON.stringify(user_records));
          alert('Password changed successfully!');
          let changePasswordModal = bootstrap.Modal.getInstance(changePasswordModalElement);
          changePasswordModal.hide();
        }
      } else {
        alert('Please enter a new password.');
      }
    });
  });


  function checkLogin() {

    if (localStorage.getItem('email') === undefined || localStorage.getItem('email') === null) {
      document.getElementById('profile-yes-user').classList.add('d-none');
      document.getElementById('profile-no-user').classList.remove('d-none');
    } else {
      document.getElementById('profile-yes-user').classList.remove('d-none');
      document.getElementById('profile-btn-container').classList.remove('d-none');
      document.getElementById('profile-no-user').classList.add('d-none');
    }

    window.location.href = 'profile.html';

  }

  document.addEventListener('DOMContentLoaded', (event) => {
    checkLogin(); // Call the function when the DOM is fully loaded
});
