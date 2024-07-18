const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands"
];


document.addEventListener('DOMContentLoaded', (event) => {
    const selectElement = document.getElementById('register-country');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        selectElement.appendChild(option);
    });
});



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


let loggedInUser;


function login() {

    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    let user_records = JSON.parse(localStorage.getItem('users')) || [];

    if (user_records.some((v) => v.email === email && v.password === password)) {
        alert('Login Successful');
        let currentUser = user_records.find((v) => v.email === email && v.password === password);

        // Store user information in localStorage
        localStorage.setItem('fname', currentUser.fname);
        localStorage.setItem('lname', currentUser.lname);
        localStorage.setItem('address', currentUser.address);
        localStorage.setItem('country', currentUser.country);
        localStorage.setItem('pcode', currentUser.pcode);
        localStorage.setItem('email', currentUser.email);
        localStorage.setItem('cafe', currentUser.cafe);

        // Redirect to profile.html
        window.location.href = 'profile.html';

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
