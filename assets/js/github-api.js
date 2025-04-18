// GitHub API Integration for Mahea Bul Portfolio

// GitHub username
const githubUsername = 'Maheabul-ofc';
const apiUrl = `https://api.github.com/users/${githubUsername}/repos`;

// Fetch repositories from GitHub
async function fetchProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    const loadingSpinner = document.getElementById('projects-loading');
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch GitHub repositories');
        const repos = await response.json();

        // Hide loading spinner
        if (loadingSpinner) loadingSpinner.style.display = 'none';

        // Sort repos by last updated
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Convert to portfolioData.projects format
        const projects = repos.map((repo, index) => ({
            id: Date.now() + index, // Unique ID for admin compatibility
            name: repo.name,
            description: repo.description || 'No description provided',
            technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
            repoUrl: repo.html_url,
            liveUrl: repo.homepage || '',
            image: `https://opengraph.githubassets.com/1/${githubUsername}/${repo.name}`,
            featured: false
        }));

        // Update portfolioData in localStorage
        const portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || {};
        portfolioData.projects = projects.slice(0, 6); // Limit to 6 projects
        portfolioData.lastUpdated = new Date().toISOString();
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));

        // Display projects
        displayProjects(projects);
        return projects; // Return the projects for other functions to use
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        throw error; // Re-throw the error for handling in the calling function
    }
}

// Display projects in the container
function displayProjects(projects) {
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) return;
    projectsContainer.innerHTML = ''; // Clear all content

    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects available yet.</p>';
        return;
    }

    projects.slice(0, 6).forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card animate-on-scroll';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image || 'assets/img/default-project.jpg'}" alt="${project.name}" loading="lazy" />
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description.substring(0, 60)}${project.description.length > 60 ? '...' : ''}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.repoUrl}" target="_blank"><i class="fab fa-github"></i> View Code</a>
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

// Expose the function globally
window.fetchGitHubProjects = fetchProjects;

// Initialize on DOMContentLoaded if needed
document.addEventListener('DOMContentLoaded', function() {
    // You can add any initialization code here if needed
});