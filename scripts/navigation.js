document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav ul');
    
    menuIcon.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
});
