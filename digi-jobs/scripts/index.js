// API Configuration
const API_BASE = 'https://michaelmwanza.site/api';
let currentPage = 1;
let totalPages = 1;
let selectedJobId = null;
const jobTypes = ["Engineering", "Marketing", "Finance", "Sales", "Human Resources", "Web Designer", "Backend", "Frontend", "Devops", "Teaching"];

// DOM Elements
const jobsContainer = document.getElementById('jobsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const experienceFilter = document.getElementById('experienceFilter');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const jobModal = document.getElementById('jobModal');
const applicationModal = document.getElementById('applicationModal');
const jobDetails = document.getElementById('jobDetails');
const jobTitle = document.getElementById('jobTitle');
const applicationForm = document.getElementById('applicationForm');
const applicationStatus = document.getElementById('applicationStatus');

// Auth Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const heroBtn = document.getElementById('hero-button');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');

// Hero Section
const heroSection = document.getElementById('hero');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchJobs();
    setupEventListeners();
    setupAuthEventListeners();
    updateAuthUI();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Fetch jobs from API with search and filters
async function fetchJobs(page = 1) {
    try {
        const searchTerm = searchInput.value.trim();
        const experienceLevel = experienceFilter.value.toLowerCase();
        
        let url;
        if (searchTerm) {
            url = `${API_BASE}/jobs/?title=${encodeURIComponent(searchTerm)}&page=${page}`;
        } else {
            url = `${API_BASE}/jobs/?page=${page}`;
        }
        
        if (experienceLevel) {
            url += searchTerm ? `&experience_level=${experienceLevel}` : `&experience_level=${experienceLevel}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        const itemsPerPage = 10; 
        totalPages = Math.ceil(data.count / itemsPerPage);
        console.log(data.count, data.results.length);
        currentPage = page;
        updatePagination();
        renderJobs(data.results);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        jobsContainer.innerHTML = '<p class="error-message">Error loading jobs. Please try again later.</p>';
    }
}

// Render jobs to the page
function renderJobs(jobs) {
    jobsContainer.innerHTML = '';
    
    if (jobs.length === 0) {
        jobsContainer.innerHTML = '<p class="no-jobs">No jobs found matching your criteria.</p>';
        return;
    }

    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <h3>${escapeHtml(job.title)}</h3>
            <p class="company">${escapeHtml(job.company_name)}</p>
            <p class="location">${escapeHtml(job.location)}</p>
            <p class="experience ${job.experience_level.toLowerCase()}">${job.experience_level} Level</p>
            <p class="posted-date">Posted: ${formatDate(job.posted_at)}</p>
            <p class="type">${jobTypes[job.category] || 'Other'}</p>
        `;
        jobCard.addEventListener('click', () => showJobDetails(job));
        jobsContainer.appendChild(jobCard);
    });
}

// Show job details modal
function showJobDetails(job) {
    selectedJobId = job.id;
    jobDetails.innerHTML = `
        <h2>${escapeHtml(job.title)}</h2>
        <p><strong>Company:</strong> ${escapeHtml(job.company_name)}</p>
        <p><strong>Location:</strong> ${escapeHtml(job.location)}</p>
        <p><strong>Experience:</strong> ${job.experience_level} Level</p>
        <p><strong>Posted:</strong> ${formatDate(job.posted_at)}</p>
        <div class="job-description">${escapeHtml(job.description)}</div>
    `;
    jobModal.style.display = 'block';
}

// Handle application form submission
applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const application = {
        job_id: selectedJobId,
        name: applicationForm.elements.name.value,
        email: applicationForm.elements.email.value,
        cv_link: applicationForm.elements.cv_link.value,
        cover_letter: applicationForm.elements.cover_letter.value,
        applied_at: new Date().toISOString()
    };

    saveApplication(application);
    
    applicationStatus.textContent = 'Application submitted successfully!';
    applicationStatus.className = 'success';
    
    setTimeout(() => {
        applicationModal.style.display = 'none';
        applicationForm.reset();
        applicationStatus.textContent = '';
    }, 2000);
});

// Save application to localStorage
function saveApplication(application) {
    let applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    applications.push(application);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
}

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

function updatePagination() {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function setupEventListeners() {
    // Modals
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', () => {
            jobModal.style.display = 'none';
            applicationModal.style.display = 'none';
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    // Apply button
    document.getElementById('applyBtn').addEventListener('click', () => {
        jobModal.style.display = 'none';
        jobTitle.textContent = document.querySelector('#jobDetails h2').textContent;
        applicationModal.style.display = 'block';
    });

    // Window clicks
    window.addEventListener('click', (e) => {
        if (e.target === jobModal) jobModal.style.display = 'none';
        if (e.target === applicationModal) applicationModal.style.display = 'none';
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === registerModal) registerModal.style.display = 'none';
    });

    // Pagination
    prevPageBtn.addEventListener('click', () => currentPage > 1 && fetchJobs(currentPage - 1));
    nextPageBtn.addEventListener('click', () => currentPage < totalPages && fetchJobs(currentPage + 1));

    // Search/filter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchJobs(1);
    });
    searchBtn.addEventListener('click', () => fetchJobs(1));
    experienceFilter.addEventListener('change', () => fetchJobs(1));
}

// Auth Functions
let users = JSON.parse(localStorage.getItem('jobBoardUsers')) || [];

function updateAuthUI() {
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    const body = document.body;
    
    if (loggedInUser) {
        loginBtn.textContent = 'Logout';
        registerBtn.classList.add('hidden');
        body.classList.add('hide-hero');
    } else {
        loginBtn.textContent = 'Login';
        registerBtn.classList.remove('hidden');
        body.classList.remove('hide-hero');
    }
}

function setupAuthEventListeners() {
    // Auth buttons
    loginBtn.addEventListener('click', () => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            localStorage.removeItem('currentUser');
            updateAuthUI();
            alert('Logged out successfully');
        } else {
            loginModal.style.display = 'block';
        }
    });

    registerBtn.addEventListener('click', () => registerModal.style.display = 'block');

    heroBtn.addEventListener('click', () => registerModal.style.display = 'block');

    // Forms
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        loginModal.style.display = 'none';
        loginForm.reset();
        loginError.textContent = '';
        updateAuthUI();
        alert('Login successful!');
    } else {
        loginError.textContent = 'Invalid email or password';
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const experience = document.getElementById('registerExperience').value;

    if (users.some(u => u.email === email)) {
        registerError.textContent = 'Email already registered';
        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        experience,
        registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('jobBoardUsers', JSON.stringify(users));
    
    registerModal.style.display = 'none';
    registerForm.reset();
    registerError.textContent = '';
    alert('Registration successful! Please login.');
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
