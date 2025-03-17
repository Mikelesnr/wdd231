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
});