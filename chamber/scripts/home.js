const spotlight = document.getElementById('spotlight');

fetch("data/members.json")
    .then((response) => response.json())
    .then((data) => {
        // Filter only Gold and Silver members
        const eligibleMembers = data.members.filter(
            (member) => member.membership === "gold" || member.membership === "silver"
        );

        // Randomly shuffle the eligible members
        const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());

        // Select the first 3 members from the shuffled array
        const selectedMembers = shuffledMembers.slice(0, 3);

        // Create and append cards for the selected members
        selectedMembers.forEach((member) => {
            const card = document.createElement("div");
            card.classList.add("member-card");
            card.innerHTML = `
                <h2>${member.name}</h2>
                <img loading="lazy" src="images/${member.image}" alt="${member.name}">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            spotlight.appendChild(card);
        });
    })
    .catch((error) => console.error("Error fetching members data:", error));
