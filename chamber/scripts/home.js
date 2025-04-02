const spotlight = document.getElementById('spotlight');

fetch("data/members.json")
    .then((response) => response.json())
    .then((data) => {
      data.members.forEach((member) => {
        const card = document.createElement("div");
        card.classList.add("member-card");
       card.innerHTML = `
                    <h2>${member.name}</h2>
                    <img src="images/${member.image}" alt="${member.name}">
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
        if (member.membership === "gold") {
          spotlight.appendChild(card);
        }
      });
    });