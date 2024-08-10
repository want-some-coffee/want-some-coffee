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



