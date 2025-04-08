// API Configuration
const API_BASE = 'https://michaelmwanza.site/api';
let currentPage = 1;
let totalPages = 1;
let selectedJobId = null;
const jobTypes = ["Engineering", "Marketing", "Finance", "Sales", "Human Resources","Web Designer","Backend","Frontend","Devops","Teaching"];

// DOM Elements
const jobsContainer = document.getElementById('jobsContainer');
const searchInput = document.getElementById('searchInput');
const experienceFilter = document.getElementById('experienceFilter');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const jobModal = document.getElementById('jobModal');
const applicationModal = document.getElementById('applicationModal');
const jobDetails = document.getElementById('jobDetails');
const jobTitle = document.getElementById('jobTitle');
const applicationForm = document.getElementById('applicationForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchJobs();
    setupEventListeners();
});

// Fetch jobs from API with filters
async function fetchJobs(page = 1) {
    try {
        const experienceLevel = experienceFilter.value.toLowerCase();
        let url = `${API_BASE}/jobs/?page=${page}`;
        
        if (experienceLevel) {
            url += `&experience_level=${experienceLevel}`;
        }
        
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            url += `&search=${encodeURIComponent(searchTerm)}`;
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
            <p class="type">${jobTypes[job.category]}</p>
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
        <p><strong>Experience:</strong> <span class="${job.experience_level.toLowerCase()}">${job.experience_level} Level</span></p>
        <p><strong>Posted:</strong> ${formatDate(job.posted_at)}</p>
        <div class="job-description">${escapeHtml(job.description)}</div>
    `;
    jobModal.style.display = 'block';
}

// Handle application form submission
applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('job_post_id', selectedJobId);
    formData.append('name', applicationForm.elements.name.value);
    formData.append('email', applicationForm.elements.email.value);
    formData.append('cover_letter', applicationForm.elements.cover_letter.value);
    formData.append('cv', applicationForm.elements.cv.files[0]);

    try {
        const response = await fetch(`${API_BASE}/apply/`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Application submitted successfully!');
            applicationModal.style.display = 'none';
            applicationForm.reset();
        } else {
            const error = await response.json();
            alert(`Error: ${error.message || 'Application failed'}`);
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        alert('Failed to submit application. Please try again.');
    }
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

function updatePagination() {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

function setupEventListeners() {
    // Close modals when clicking X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            jobModal.style.display = 'none';
            applicationModal.style.display = 'none';
        });
    });

    // Apply button in job modal
    document.getElementById('applyBtn').addEventListener('click', () => {
        jobModal.style.display = 'none';
        jobTitle.textContent = document.querySelector('#jobDetails h2').textContent;
        applicationModal.style.display = 'block';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === jobModal) jobModal.style.display = 'none';
        if (e.target === applicationModal) applicationModal.style.display = 'none';
    });

    // Pagination buttons
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) fetchJobs(currentPage - 1);
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) fetchJobs(currentPage + 1);
    });

    // Search and filter functionality
    searchInput.addEventListener('input', () => fetchJobs(1));
    experienceFilter.addEventListener('change', () => fetchJobs(1));
}