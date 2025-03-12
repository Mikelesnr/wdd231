// This script dynamically sets the current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;
