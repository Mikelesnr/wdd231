

// Hero Section
const heroSection = document.getElementById('hero');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Helper functions
function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;',
        '"': '&quot;', "'": '&#39;'
    }[m]));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
// Footer functions
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
}

// Initialize current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
});
