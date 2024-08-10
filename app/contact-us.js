const yourName = document.getElementById("contactus-yourname");
const yourEmail = document.getElementById("contactus-youremail");
const yourMessage = document.getElementById("contactus-yourmessage");

btnInsert.onclick = function() {
    const name = yourName.value;
    const email = yourEmail.value; 
    const message = yourMessage.value;

    console.log(name);
    console.log(email);
    console.log(message);
   
    if(name && email && message){
        localStorage.setItem("name",  name);
        localStorage.setItem("email",  email);
        localStorage.setItem("message",  message);
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const themeToggleButton = document.getElementById('bd-theme-toggle');
  
    function setTheme(theme) {
      document.documentElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem('theme', theme);
      themeToggleButton.classList.toggle('dark-mode', theme === 'dark');
    }
  
    themeToggleButton.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme');
      if (currentTheme === 'dark') {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    });
  
    // Load theme from local storage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  });
  

