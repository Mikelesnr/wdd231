document.addEventListener('DOMContentLoaded', () => {
    // Display the current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Display the last modified date in the footer
    document.getElementById('last-modified').textContent = document.lastModified;

    // Fetch and display member data (example JSON fetch)
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            const directory = document.querySelector('.directory');
            data.members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('member-card');
                memberCard.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
                directory.appendChild(memberCard);
            });
        });
});