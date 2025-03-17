document.addEventListener('DOMContentLoaded', () => {
    const nav = document.createElement('nav');
    nav.innerHTML = `
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="discover.html">Discover</a></li>
            <li><a href="directory.html">Directory</a></li>
            <li><a href="join.html">Join</a></li>
        </ul>
    `;
    const header = document.querySelector('header');
    header.appendChild(nav);

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
    });
});