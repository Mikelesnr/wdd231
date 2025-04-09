// Auth Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const heroBtn = document.getElementById('cta-button');
const downloadUsersBtn = document.getElementById('downloadUsersBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');


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

// Auth Functions
let users = JSON.parse(localStorage.getItem('jobBoardUsers')) || [];

function updateAuthUI() {
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    const body = document.body;
    
    if (loggedInUser) {
        loginBtn.textContent = 'Logout';
        registerBtn.classList.add('hidden');
        downloadUsersBtn.classList.remove('hidden');
        body.classList.add('hide-hero');
    } else {
        loginBtn.textContent = 'Login';
        registerBtn.classList.remove('hidden');
        downloadUsersBtn.classList.add('hidden');
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
    downloadUsersBtn.addEventListener('click', downloadUsersCSV);

    heroBtn.addEventListener('click', () => registerModal.style.display = 'block');
    downloadUsersBtn.addEventListener('click', downloadUsersCSV);

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

function downloadUsersCSV() {
    if (users.length === 0) {
        alert('No users registered yet');
        return;
    }

    let csv = 'ID,Name,Email,Experience Level,Registration Date\n';
    users.forEach(user => {
        csv += `${user.id},"${user.name}","${user.email}",${user.experience},${user.registeredAt}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });registerBtn
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'job_board_users.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
