document.getElementById('user_fname').innerText = localStorage.getItem('fname');
document.getElementById('user_lname').innerText = localStorage.getItem('lname');
document.getElementById('user_address').innerText = localStorage.getItem('address');
document.getElementById('user_country').innerText = localStorage.getItem('country');
document.getElementById('user_pcode').innerText = localStorage.getItem('pcode');
document.getElementById('user_email').innerText = localStorage.getItem('email');
document.getElementById('user_favcafe').innerText = localStorage.getItem('cafe');


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


document.addEventListener('DOMContentLoaded', function () {
    let nextButton = document.getElementById('nextButton');
    let saveButton = document.getElementById('saveButton');
    let step1 = document.getElementById('step1');
    let step2 = document.getElementById('step2');
    let currentPasswordInput = document.getElementById('currentPassword');
    let newPasswordInput = document.getElementById('newPassword');
    let changePasswordModalElement = document.getElementById('changePasswordModal');

    nextButton.addEventListener('click', function () {
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

    saveButton.addEventListener('click', function () {
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




document.addEventListener('DOMContentLoaded', () => {
    let email = localStorage.getItem('email');

    console.log("Email from localStorage:", email);

    const currentPath = window.location.pathname;

    if (email) {
        // User is logged in
        document.querySelector('.profile-yes-user').classList.remove('d-none');
        document.querySelector('.profile-btn-container').classList.remove('d-none');
        document.querySelector('.profile-no-user').classList.add('d-none');

        if (currentPath !== '/profile.html' && !currentPath.endsWith('/profile.html')) {
            window.location.href = '/profile.html';
        }
    } else {
        // User is not logged in
        document.querySelector('.profile-yes-user').classList.add('d-none');
        document.querySelector('.profile-btn-container').classList.add('d-none');
        document.querySelector('.profile-no-user').classList.remove('d-none');
    }
});
