const directory = document.querySelector(".directory");
const directoryList = document.querySelector(".list");
const gridBtn = document.getElementById("grid")
const listBtn = document.getElementById("list")

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
     const memberList = document.createElement("div");
     memberList.classList.add("member-list");
     memberList.innerHTML = `
                 <p>${member.name}</p>
                 <p>${member.address}</p>
                 <p>${member.phone}</p>
                 <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                 `;

     if(data){
     directoryList.appendChild(memberList);
     }
   });
 });

 
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
});