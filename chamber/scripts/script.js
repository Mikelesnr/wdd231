const dateParagraph = document.querySelector(".header-today p");

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

        fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            const spotlight = document.querySelector('.spotlight');
            data.members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('member-card');
                memberCard.innerHTML = `
                    <h2>${member.name}</h2>
                    <img src="images/${member.image}" alt="${member.name}">
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
                if(member.membership==='gold'){
                spotlight.appendChild(memberCard);
                }
            });
        });
});

// Get the current date
const currentDate = new Date();

// Format the date 
const formattedDate = currentDate.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

// Insert the formatted date into the <p> tag
dateParagraph.textContent = formattedDate;
