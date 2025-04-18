/**
 * Dashboard.js
 * Main JavaScript file for the admin dashboard functionality
 * Handles authentication, data storage, and manipulation for the portfolio website
 */

// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    // Simple authentication check (in a real app, you would use proper authentication)
    if (!localStorage.getItem('portfolioAuth')) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
    } else {
        // Load data
        loadAllData();
    }

    // Setup event listeners
    setupEventListeners();
});

/**
 * Sets up all event listeners for the dashboard
 */
function setupEventListeners() {
    // Skills section
    document.getElementById('addSkillBtn').addEventListener('click', addNewSkill);
    document.getElementById('skillsForm').addEventListener('submit', saveSkill);
    
    // Projects section 
    document.getElementById('addProjectBtn').addEventListener('click', addNewProject);
    document.getElementById('projectsForm').addEventListener('submit', saveProject);
    
    // Certifications section
    document.getElementById('addCertBtn').addEventListener('click', addNewCertification);
    document.getElementById('certificationsForm').addEventListener('submit', saveCertification);
    
    // Resume upload
    document.getElementById('resumeUploadForm').addEventListener('submit', uploadResume);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // GitHub fetch button
    document.getElementById('fetchGithubBtn').addEventListener('click', fetchGithubProjects);
}

/**
 * Loads all data for the dashboard from localStorage
 */
function loadAllData() {
    loadSkills();
    loadProjects();
    loadCertifications();
    checkResumeStatus();
}

/**
 * Skills Management
 */
function loadSkills() {
    const skillsTable = document.getElementById('skillsTable').getElementsByTagName('tbody')[0];
    skillsTable.innerHTML = '';
    
    const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || [];
    
    skills.forEach((skill, index) => {
        const row = skillsTable.insertRow();
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${skill.name}</td>
            <td>${skill.level}%</td>
            <td>${skill.icon}</td>
            <td>
                <button class="edit-btn" data-type="skill" data-id="${index}">Edit</button>
                <button class="delete-btn" data-type="skill" data-id="${index}">Delete</button>
            </td>
        `;
    });
    
    // Add event listeners to the edit and delete buttons
    document.querySelectorAll('.edit-btn[data-type="skill"]').forEach(btn => {
        btn.addEventListener('click', () => editSkill(parseInt(btn.dataset.id)));
    });
    
    document.querySelectorAll('.delete-btn[data-type="skill"]').forEach(btn => {
        btn.addEventListener('click', () => deleteSkill(parseInt(btn.dataset.id)));
    });
}

function addNewSkill() {
    // Reset form and show the form
    document.getElementById('skillsForm').reset();
    document.getElementById('skillId').value = '';
    document.getElementById('skillFormTitle').textContent = 'Add New Skill';
    document.getElementById('skillsFormContainer').style.display = 'block';
}

function editSkill(id) {
    const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || [];
    const skill = skills[id];
    
    document.getElementById('skillId').value = id;
    document.getElementById('skillName').value = skill.name;
    document.getElementById('skillLevel').value = skill.level;
    document.getElementById('skillIcon').value = skill.icon;
    
    document.getElementById('skillFormTitle').textContent = 'Edit Skill';
    document.getElementById('skillsFormContainer').style.display = 'block';
}

function saveSkill(e) {
    e.preventDefault();
    
    const skillId = document.getElementById('skillId').value;
    const name = document.getElementById('skillName').value;
    const level = document.getElementById('skillLevel').value;
    const icon = document.getElementById('skillIcon').value;
    
    const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || [];
    
    const newSkill = {
        name,
        level,
        icon
    };
    
    if (skillId === '') {
        // Add new skill
        skills.push(newSkill);
    } else {
        // Update existing skill
        skills[parseInt(skillId)] = newSkill;
    }
    
    localStorage.setItem('portfolioSkills', JSON.stringify(skills));
    
    // Hide form and reload skills
    document.getElementById('skillsFormContainer').style.display = 'none';
    loadSkills();
    
    // Show success notification
    showNotification('Skill saved successfully!', 'success');
}

function deleteSkill(id) {
    if (confirm('Are you sure you want to delete this skill?')) {
        const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || [];
        skills.splice(id, 1);
        localStorage.setItem('portfolioSkills', JSON.stringify(skills));
        loadSkills();
        showNotification('Skill deleted successfully!', 'success');
    }
}

/**
 * Projects Management
 */
function loadProjects() {
    const projectsTable = document.getElementById('projectsTable').getElementsByTagName('tbody')[0];
    projectsTable.innerHTML = '';
    
    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    
    projects.forEach((project, index) => {
        const row = projectsTable.insertRow();
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${project.title}</td>
            <td>${project.description.substring(0, 50)}...</td>
            <td>${project.technologies.join(', ')}</td>
            <td>
                <button class="edit-btn" data-type="project" data-id="${index}">Edit</button>
                <button class="delete-btn" data-type="project" data-id="${index}">Delete</button>
            </td>
        `;
    });
    
    // Add event listeners to the edit and delete buttons
    document.querySelectorAll('.edit-btn[data-type="project"]').forEach(btn => {
        btn.addEventListener('click', () => editProject(parseInt(btn.dataset.id)));
    });
    
    document.querySelectorAll('.delete-btn[data-type="project"]').forEach(btn => {
        btn.addEventListener('click', () => deleteProject(parseInt(btn.dataset.id)));
    });
}

function addNewProject() {
    // Reset form and show the form
    document.getElementById('projectsForm').reset();
    document.getElementById('projectId').value = '';
    document.getElementById('projectFormTitle').textContent = 'Add New Project';
    document.getElementById('projectsFormContainer').style.display = 'block';
}

function editProject(id) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    const project = projects[id];
    
    document.getElementById('projectId').value = id;
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectTechnologies').value = project.technologies.join(', ');
    document.getElementById('projectImage').value = project.image;
    document.getElementById('projectDemoLink').value = project.demoLink || '';
    document.getElementById('projectGithubLink').value = project.githubLink || '';
    
    document.getElementById('projectFormTitle').textContent = 'Edit Project';
    document.getElementById('projectsFormContainer').style.display = 'block';
}

function saveProject(e) {
    e.preventDefault();
    
    const projectId = document.getElementById('projectId').value;
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const technologies = document.getElementById('projectTechnologies').value.split(',').map(item => item.trim());
    const image = document.getElementById('projectImage').value;
    const demoLink = document.getElementById('projectDemoLink').value;
    const githubLink = document.getElementById('projectGithubLink').value;
    
    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    
    const newProject = {
        title,
        description,
        technologies,
        image,
        demoLink,
        githubLink
    };
    
    if (projectId === '') {
        // Add new project
        projects.push(newProject);
    } else {
        // Update existing project
        projects[parseInt(projectId)] = newProject;
    }
    
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    
    // Hide form and reload projects
    document.getElementById('projectsFormContainer').style.display = 'none';
    loadProjects();
    
    // Show success notification
    showNotification('Project saved successfully!', 'success');
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
        projects.splice(id, 1);
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        loadProjects();
        showNotification('Project deleted successfully!', 'success');
    }
}

/**
 * Fetch projects from GitHub
 */
function fetchGithubProjects() {
    const username = document.getElementById('githubUsername').value;
    
    if (!username) {
        showNotification('Please enter a GitHub username', 'error');
        return;
    }
    
    document.getElementById('fetchGithubBtn').textContent = 'Fetching...';
    document.getElementById('fetchGithubBtn').disabled = true;
    
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch repositories');
            }
            return response.json();
        })
        .then(data => {
            const projects = data.map(repo => {
                return {
                    title: repo.name,
                    description: repo.description || 'No description available',
                    technologies: [repo.language].filter(Boolean),
                    image: 'assets/img/project-placeholder.jpg',
                    demoLink: '',
                    githubLink: repo.html_url
                };
            });
            
            // Save to localStorage
            localStorage.setItem('portfolioProjects', JSON.stringify(projects));
            
            // Reload projects
            loadProjects();
            
            // Reset button
            document.getElementById('fetchGithubBtn').textContent = 'Fetch GitHub Projects';
            document.getElementById('fetchGithubBtn').disabled = false;
            
            // Show success notification
            showNotification(`Successfully imported ${projects.length} projects from GitHub!`, 'success');
        })
        .catch(error => {
            console.error('Error fetching GitHub projects:', error);
            showNotification('Error fetching GitHub projects. Please try again.', 'error');
            
            // Reset button
            document.getElementById('fetchGithubBtn').textContent = 'Fetch GitHub Projects';
            document.getElementById('fetchGithubBtn').disabled = false;
        });
}

/**
 * Certifications Management
 */
function loadCertifications() {
    const certificationsTable = document.getElementById('certificationsTable').getElementsByTagName('tbody')[0];
    certificationsTable.innerHTML = '';
    
    const certifications = JSON.parse(localStorage.getItem('portfolioCertifications')) || [];
    
    certifications.forEach((cert, index) => {
        const row = certificationsTable.insertRow();
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${cert.title}</td>
            <td>${cert.issuer}</td>
            <td>${cert.date}</td>
            <td>
                <button class="edit-btn" data-type="cert" data-id="${index}">Edit</button>
                <button class="delete-btn" data-type="cert" data-id="${index}">Delete</button>
            </td>
        `;
    });
    
    // Add event listeners to the edit and delete buttons
    document.querySelectorAll('.edit-btn[data-type="cert"]').forEach(btn => {
        btn.addEventListener('click', () => editCertification(parseInt(btn.dataset.id)));
    });
    
    document.querySelectorAll('.delete-btn[data-type="cert"]').forEach(btn => {
        btn.addEventListener('click', () => deleteCertification(parseInt(btn.dataset.id)));
    });
}

function addNewCertification() {
    // Reset form and show the form
    document.getElementById('certificationsForm').reset();
    document.getElementById('certId').value = '';
    document.getElementById('certFormTitle').textContent = 'Add New Certification';
    document.getElementById('certificationsFormContainer').style.display = 'block';
}

function editCertification(id) {
    const certifications = JSON.parse(localStorage.getItem('portfolioCertifications')) || [];
    const cert = certifications[id];
    
    document.getElementById('certId').value = id;
    document.getElementById('certTitle').value = cert.title;
    document.getElementById('certIssuer').value = cert.issuer;
    document.getElementById('certDate').value = cert.date;
    document.getElementById('certLink').value = cert.link || '';
    
    document.getElementById('certFormTitle').textContent = 'Edit Certification';
    document.getElementById('certificationsFormContainer').style.display = 'block';
}

function saveCertification(e) {
    e.preventDefault();
    
    const certId = document.getElementById('certId').value;
    const title = document.getElementById('certTitle').value;
    const issuer = document.getElementById('certIssuer').value;
    const date = document.getElementById('certDate').value;
    const link = document.getElementById('certLink').value;
    
    const certifications = JSON.parse(localStorage.getItem('portfolioCertifications')) || [];
    
    const newCert = {
        title,
        issuer,
        date,
        link
    };
    
    if (certId === '') {
        // Add new certification
        certifications.push(newCert);
    } else {
        // Update existing certification
        certifications[parseInt(certId)] = newCert;
    }
    
    localStorage.setItem('portfolioCertifications', JSON.stringify(certifications));
    
    // Hide form and reload certifications
    document.getElementById('certificationsFormContainer').style.display = 'none';
    loadCertifications();
    
    // Show success notification
    showNotification('Certification saved successfully!', 'success');
}

function deleteCertification(id) {
    if (confirm('Are you sure you want to delete this certification?')) {
        const certifications = JSON.parse(localStorage.getItem('portfolioCertifications')) || [];
        certifications.splice(id, 1);
        localStorage.setItem('portfolioCertifications', JSON.stringify(certifications));
        loadCertifications();
        showNotification('Certification deleted successfully!', 'success');
    }
}

/**
 * Resume Management
 */
function uploadResume(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('resumeFile');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('Please select a file', 'error');
        return;
    }
    
    // In a real application, you would upload the file to a server
    // For this example, we'll simulate it with localStorage
    
    // Read the file as data URL
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const resumeData = {
            name: file.name,
            type: file.type,
            size: file.size,
            dataUrl: e.target.result,
            uploadDate: new Date().toISOString()
        };
        
        localStorage.setItem('portfolioResume', JSON.stringify(resumeData));
        
        // Update resume status
        checkResumeStatus();
        
        // Show success notification
        showNotification('Resume uploaded successfully!', 'success');
    };
    
    reader.readAsDataURL(file);
}

function checkResumeStatus() {
    const resumeStatusDiv = document.getElementById('resumeStatus');
    const resumeData = JSON.parse(localStorage.getItem('portfolioResume'));
    
    if (resumeData) {
        const date = new Date(resumeData.uploadDate);
        resumeStatusDiv.innerHTML = `
            <div class="resume-info">
                <p><strong>Current Resume:</strong> ${resumeData.name}</p>
                <p><strong>Size:</strong> ${Math.round(resumeData.size / 1024)} KB</p>
                <p><strong>Uploaded:</strong> ${date.toLocaleDateString()}</p>
                <button id="viewResumeBtn" class="btn">View Resume</button>
                <button id="deleteResumeBtn" class="btn delete-btn">Delete Resume</button>
            </div>
        `;
        
        // Add event listeners
        document.getElementById('viewResumeBtn').addEventListener('click', viewResume);
        document.getElementById('deleteResumeBtn').addEventListener('click', deleteResume);
    } else {
        resumeStatusDiv.innerHTML = '<p>No resume uploaded yet.</p>';
    }
}

function viewResume() {
    const resumeData = JSON.parse(localStorage.getItem('portfolioResume'));
    
    if (resumeData) {
        // Open the resume in a new tab
        const newTab = window.open();
        newTab.document.write(`
            <iframe src="${resumeData.dataUrl}" style="width: 100%; height: 100vh; border: none;"></iframe>
        `);
    }
}

function deleteResume() {
    if (confirm('Are you sure you want to delete the current resume?')) {
        localStorage.removeItem('portfolioResume');
        checkResumeStatus();
        showNotification('Resume deleted successfully!', 'success');
    }
}

/**
 * Authentication
 */
function logout() {
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('portfolioAuth');
        window.location.href = 'login.html';
    }
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}