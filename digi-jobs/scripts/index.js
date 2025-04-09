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
        
        totalPages = Math.ceil(data.count / data.results.length);
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
