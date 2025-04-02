const dateParagraph = document.querySelector(".header-today p");

document.addEventListener("DOMContentLoaded", () => {
  // Display the current year in the footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Display the last modified date in the footer
  document.getElementById("last-modified").textContent = document.lastModified;

})

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

// modal management
// Function to open the dialog modal
function openDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.showModal(); // Opens the <dialog> element as a modal
}

// Function to close the dialog modal
function closeDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.close(); // Closes the <dialog> element
}
