document.addEventListener('DOMContentLoaded', function () {
    const sideMenu = document.querySelector('.side-menu');


    window.openNav = function() {
        sideMenu.style.width = '250px';
    };


    window.closeNav = function() {
        sideMenu.style.width = '0';
    };
});