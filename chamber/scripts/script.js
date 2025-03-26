const dateParagraph = document.querySelector(".header-today p");
const directory = document.querySelector(".directory");
const directoryList = document.querySelector(".list");
const gridBtn = document.getElementById("grid")
const listBtn = document.getElementById("list")

gridBtn.addEventListener('click', ()=>{
    if (!gridBtn.classList.contains('btn-active')) {
        gridBtn.classList.add('btn-active');
      }
    if (directory.classList.contains('hidden')) {
        directory.classList.remove('hidden');
      }
      if (!directoryList.classList.contains('hidden')) {
        directoryList.classList.add('hidden');
      }
      if (listBtn.classList.contains('btn-active')) {
        listBtn.classList.remove('btn-active');
      }
})

listBtn.addEventListener('click', ()=>{
    if (gridBtn.classList.contains('btn-active')) {
        gridBtn.classList.remove('btn-active');
      }
    if (!directory.classList.contains('hidden')) {
        directory.classList.add('hidden');
      }
      if (directoryList.classList.contains('hidden')) {
        directoryList.classList.remove('hidden');
      }
      if (!listBtn.classList.contains('btn-active')) {
        listBtn.classList.add('btn-active');
      }
})

document.addEventListener("DOMContentLoaded", () => {
  // Display the current year in the footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Display the last modified date in the footer
  document.getElementById("last-modified").textContent = document.lastModified;

  // Fetch and display member data (example JSON fetch)
  fetch("data/members.json")
    .then((response) => response.json())
    .then((data) => {
      data.members.forEach((member) => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");
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

  fetch("data/members.json")
    .then((response) => response.json())
    .then((data) => {
      data.members.forEach((member) => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-list");
        memberCard.innerHTML = `
                    <p>${member.name}</p>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                    `;
        directoryList.appendChild(memberCard);
      });
    });

  fetch("data/members.json")
    .then((response) => response.json())
    .then((data) => {
      const spotlight = document.querySelector(".spotlight");
      data.members.forEach((member) => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");
        memberCard.innerHTML = `
                    <h2>${member.name}</h2>
                    <img src="images/${member.image}" alt="${member.name}">
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
        if (member.membership === "gold") {
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
