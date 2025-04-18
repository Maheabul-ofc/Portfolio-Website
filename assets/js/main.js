// Main JavaScript for Mahea Bul Portfolio
document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    setTimeout(() => (preloader.style.display = "none"), 500);
  });

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("#navbar ul");
  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
  document.querySelectorAll("#navbar ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Active menu item on scroll
  function highlightMenu() {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navbar ul li a");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId)
            link.classList.add("active");
        });
      }
    });
  }
  window.addEventListener("scroll", highlightMenu);

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) backToTopBtn.classList.add("active");
    else backToTopBtn.classList.remove("active");
  });
  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Load portfolio data from localStorage
  function loadPortfolioData() {
    const portfolioData = JSON.parse(localStorage.getItem("portfolioData")) || {
      skills: [
        { name: "HTML", icon: "fa-html5", proficiency: 90, color: "#E44D26" },
        { name: "CSS", icon: "fa-css3-alt", proficiency: 85, color: "#264DE4" },
        { name: "JavaScript", icon: "fa-js", proficiency: 80, color: "#F7DF1E",},
        { name: "React", icon: "fa-react", proficiency: 75, color: "#61DAFB" },
      ],
      projects: [],
      certifications: [
        {
          name: "HTML and CSS in Depth",
          issuer: "Coursera",
          date: "2024-12-01",
          link: "https://coursera.org/share/cbf0c387a879ce03d42b3b72c15fd82b",
        },
        {
          name: "Programming with JavaScript",
          issuer: "Coursera",
          date: "2024-12-01",
          link: "https://coursera.org/share/86e083792726297cc943ac9d38358132",
        },
        {
          name: "Introduction to Java",
          issuer: "Coursera",
          date: "2024-12-01",
          link: "https://www.coursera.org/account/accomplishments/verify/39JQA6PT3AQK",
        }
      ],
      profile: {
        fullName: "Mahea Bul",
        title: "B.Tech Student & Web Developer",
        email: "maheabulwork@gmail.com",
        location: "Assam, India",
        about:
          "I am Mahea Bul, a B.Tech student passionate about web development and programming. With expertise in various technologies including HTML, CSS, JavaScript, React, C Programming, and Java, I strive to create innovative solutions to complex problems.",
        github: "https://github.com/Maheabul-ofc",
        linkedin: "https://www.linkedin.com/in/mahea-bul-030a6b331/",
        image: "assets/img/default-profile.jpg",
      },
      resume: null,
    };
    return portfolioData;
  }

  // Animate stat numbers
  function animateStats() {
    const portfolioData = loadPortfolioData();
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => {
      const key = stat.parentElement
        .querySelector("p")
        .textContent.toLowerCase()
        .includes("projects")
        ? "projects"
        : "technologies";
      const target =
        key === "projects"
          ? portfolioData.projects.length
          : portfolioData.skills.length;
      stat.setAttribute("data-count", target);
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        stat.textContent = Math.ceil(current);
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        }
      }, 30);
    });
  }

  // Load profile data
  function loadProfile() {
    const portfolioData = loadPortfolioData();
    const profile = portfolioData.profile;
    document.querySelector(
      ".text-content h1"
    ).innerHTML = `Hi, I'm <span>${profile.fullName}</span>`;
    document.querySelector(".text-content h2").textContent = profile.title;
    document.querySelector(".text-content p").textContent =
      "Specializing in web development and programming";
    document.querySelector('.social-icons a[href*="github"]').href =
      profile.github;
    document.querySelector('.social-icons a[href*="linkedin"]').href =
      profile.linkedin;
    document.querySelector(
      '.social-icons a[href*="mailto"]'
    ).href = `mailto:${profile.email}`;
    document.querySelector(".about-text p:first-child").textContent =
      profile.about;
    document.querySelector(".footer-logo h2").innerHTML = `${
      profile.fullName.split(" ")[0]
    }<span>${profile.fullName.split(" ")[1]}</span>`;
    document.querySelector(
      ".contact-info .info-item:nth-child(1) p a"
    ).textContent = profile.email;
    document.querySelector(
      ".contact-info .info-item:nth-child(1) p a"
    ).href = `mailto:${profile.email}`;
    document.querySelector(".contact-info .info-item:nth-child(2) p a").href =
      profile.github;
    document.querySelector(".contact-info .info-item:nth-child(3) p a").href =
      profile.linkedin;
    const imageContainer = document.querySelector(".image-container");
    imageContainer.innerHTML = `<img src="${profile.image}" alt="${profile.fullName}">`;
  }

  // Load skills
  function loadSkills() {
    const portfolioData = loadPortfolioData();
    const skillsContainer = document.querySelector(".skills-container");
    skillsContainer.innerHTML = "";
    portfolioData.skills.forEach((skill) => {
      const skillItem = document.createElement("div");
      skillItem.className = "skill-item animate-on-scroll";
      skillItem.innerHTML = `
                <div class="skill-icon">
                    <i class="fab ${skill.icon}" style="color: ${
        skill.color || "#4361ee"
      }"></i>
                </div>
                <h3 class="skill-name">${skill.name}</h3>
                <div class="skill-level">
                    <div class="skill-progress" style="width: 0%;"></div>
                </div>
                <div class="skill-percentage">${
                  skill.proficiency || skill.level
                }%</div>
            `;
      skillsContainer.appendChild(skillItem);
    });
    animateSkillProgress();
  }

  // Animate skill progress bars
  function animateSkillProgress() {
    const progressBars = document.querySelectorAll(".skill-progress");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target;
            const percentage =
              progressBar.parentElement.nextElementSibling.textContent;
            progressBar.style.width = percentage;
            observer.unobserve(progressBar);
          }
        });
      },
      { threshold: 0.5 }
    );
    progressBars.forEach((bar) => observer.observe(bar));
  }

  // Load projects with improved GitHub sync functionality
  function loadProjects() {
    const portfolioData = loadPortfolioData();
    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.innerHTML = "";
    const projects = portfolioData.projects;

    if (projects.length === 0) {
      projectsContainer.innerHTML = `
                <p>No projects available yet. <a href="#" id="sync-github">Sync with GitHub</a></p>
            `;

      // Add event listener for sync button
      document
        .getElementById("sync-github")
        ?.addEventListener("click", async (e) => {
          e.preventDefault();
          try {
            // Show loading state
            projectsContainer.innerHTML =
              "<p>Loading projects from GitHub...</p>";

            // Call the global GitHub fetch function
            if (typeof window.fetchGitHubProjects === "function") {
              await window.fetchGitHubProjects();
              // The localStorage change event will trigger a refresh
            } else {
              throw new Error("GitHub sync function not available");
            }
          } catch (error) {
            console.error("GitHub sync failed:", error);
            projectsContainer.innerHTML = `
            <div class="error-message">
              <p>Failed to sync with GitHub. <a href="#" id="sync-github">Try again</a></p>
              <p>${error.message}</p>
            </div>
          `;
          }
        });
      return;
    }

    // Display projects
    projects.slice(0, 6).forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card animate-on-scroll";
      projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${
                      project.image || "assets/img/default-project.jpg"
                    }" alt="${project.name}" loading="lazy" />
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description.substring(
                      0,
                      60
                    )}${project.description.length > 60 ? "..." : ""}</p>
                    <div class="project-tags">
                        ${project.technologies
                          .map(
                            (tech) => `<span class="project-tag">${tech}</span>`
                          )
                          .join("")}
                    </div>
                    <div class="project-links">
                        <a href="${
                          project.repoUrl
                        }" target="_blank"><i class="fab fa-github"></i> View Code</a>
                        ${
                          project.liveUrl
                            ? `<a href="${project.liveUrl}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
                            : ""
                        }
                    </div>
                </div>
            `;
      projectsContainer.appendChild(projectCard);
    });
  }

  // Load certifications
  function loadCertifications() {
    const portfolioData = loadPortfolioData();
    const certificationsContainer = document.querySelector(
      ".certifications-container"
    );
    certificationsContainer.innerHTML = "";
    portfolioData.certifications.forEach((cert) => {
      const certItem = document.createElement("div");
      certItem.className = "certification-item animate-on-scroll";
      certItem.innerHTML = `
                <h3 class="certification-title">${cert.name}</h3>
                <p class="certification-issuer">Issued by ${cert.issuer}</p>
                <p class="certification-date">${new Date(
                  cert.date
                ).toLocaleDateString()}</p>
                <a href="${
                  cert.link
                }" class="certification-link" target="_blank">View Certificate</a>
            `;
      certificationsContainer.appendChild(certItem);
    });
  }

  // Handle resume
  function setupResume() {
    const portfolioData = loadPortfolioData();
    const resumeBtn = document.getElementById("resume-btn");
    const resumeModal = document.getElementById("resumeModal");
    const closeModal = document.querySelector(".close");
    const resumeViewer = document.getElementById("resumeViewer");
    const downloadResumeBtn = document.getElementById("downloadResume");
    const resumeUrl =
      portfolioData.resume || "assets/resume/default-resume.pdf";

    if (resumeBtn && resumeModal) {
      resumeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        resumeViewer.innerHTML = `<iframe src="${resumeUrl}"></iframe>`;
        downloadResumeBtn.href = resumeUrl;
        downloadResumeBtn.download = "Mahea_Bul_Resume.pdf";
        resumeModal.style.display = "block";
      });
      closeModal.addEventListener(
        "click",
        () => (resumeModal.style.display = "none")
      );
      window.addEventListener("click", (e) => {
        if (e.target === resumeModal) resumeModal.style.display = "none";
      });
    }
  }

  // Handle contact form submission
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
      console.log({ name, email, subject, message });
      formStatus.innerHTML =
        "Message sent successfully! I will get back to you soon.";
      formStatus.className = "success";
      formStatus.style.display = "block";
      contactForm.reset();
      setTimeout(() => (formStatus.style.display = "none"), 3000);
    });
  }

  // Listen for storage changes to refresh content
  window.addEventListener("storage", function (e) {
    if (e.key === "portfolioData") {
      loadProfile();
      loadSkills();
      loadProjects();
      loadCertifications();
      animateStats();
      setupResume();
    }
  });

  // Also listen for storage changes within the same window
  window.addEventListener("portfolioDataUpdated", function () {
    loadProfile();
    loadSkills();
    loadProjects();
    loadCertifications();
    animateStats();
    setupResume();
  });

  // Initialize everything
  loadProfile();
  loadSkills();
  loadProjects();
  loadCertifications();
  animateStats();
  setupResume();

  // Animation observer
  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.add("slide-up");
          animateObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document
    .querySelectorAll(".animate-on-scroll")
    .forEach((element) => animateObserver.observe(element));
});

// Helper function to trigger portfolio data refresh
function refreshPortfolioData() {
  localStorage.setItem("portfolioData", localStorage.getItem("portfolioData"));
  window.dispatchEvent(new Event("portfolioDataUpdated"));
}
