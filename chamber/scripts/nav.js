document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav ul li');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove 'active' class from all nav links
            navLinks.forEach(navLink => navLink.classList.remove('btn-active'));
            // Add 'active' class to the clicked link
            link.classList.add('btn-active');
        });
    });
});
