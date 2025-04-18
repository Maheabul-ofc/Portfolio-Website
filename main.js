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

  // Force skill bars to start at 0% width
  document.querySelectorAll(".skill-progress").forEach(function (bar) {
    const percentage =
      bar.getAttribute("data-percentage") ||
      bar.parentElement.nextElementSibling.textContent;
    bar.setAttribute("data-target", percentage);
    bar.style.width = "0%";
  });

  function animateSkills() {
    const progressBars = document.querySelectorAll(".skill-progress");

    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    function animateProgressBar(bar) {
      if (!bar.classList.contains("animated")) {
        const targetWidth = bar.getAttribute("data-target");
        bar.classList.add("animated");
        bar.style.transition = "width 1.5s ease-out";
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 100);
      }
    }

    function checkAndAnimateSkills() {
      progressBars.forEach(function (bar) {
        if (isInViewport(bar)) {
          animateProgressBar(bar);
        }
      });
    }

    window.addEventListener("scroll", checkAndAnimateSkills);
    checkAndAnimateSkills();
  }

  function animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count") || "0");
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

  function setupResume() {
    const resumeBtn = document.getElementById("resume-btn");
    const resumeModal = document.getElementById("resumeModal");
    const closeModal = document.querySelector(".close");
    const resumeViewer = document.getElementById("resumeViewer");
    const downloadResumeBtn = document.getElementById("downloadResume");
    const resumeUrl = "assets/resume/Mahea_Bul_Resume.pdf";

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

  // Initialize all features
  animateSkills();
  animateStats();
  setupResume();

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



//////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  // second block (bad)

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      const submitButton = contactForm.querySelector(".btn-primary");
      const inputs = contactForm.querySelectorAll("input, textarea");

      // Basic client-side validation
      if (!name || !email || !message) {
        showError("Please fill in all required fields.");
        return;
      }

      // Clear any previous error messages
      const existingError = contactForm.querySelector(".alert-error");
      if (existingError) existingError.remove();

      // Show loading state
      submitButton.classList.add("loading");
      submitButton.disabled = true;
      submitButton.querySelector("span:not(.spinner)").textContent =
        "Sending...";
      submitButton.setAttribute("aria-busy", "true");
      inputs.forEach((input) => (input.disabled = true));

      try {
        const response = await fetch("/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, subject, message }),
        });

        if (response.ok) {
          const formContainer = contactForm.parentElement;
          const successMessage = document.createElement("div");
          successMessage.className = "alert-success";
          successMessage.innerHTML = `
          <h3>Thank you for your message!</h3>
          <p>We have received your inquiry and will get back to you shortly.</p>
        `;

          formContainer.innerHTML = "";
          formContainer.appendChild(successMessage);
        } else {
          showError("Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        showError("An error occurred. Please try again later.");
      } finally {
        // Remove loading state
        submitButton.classList.remove("loading");
        submitButton.disabled = false;
        submitButton.querySelector("span:not(.spinner)").textContent =
          "Send Message";
        submitButton.setAttribute("aria-busy", "false");
        inputs.forEach((input) => (input.disabled = false));
      }
    });
  }

  // Helper function to show error messages
  function showError(message) {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    const errorMessage = document.createElement("div");
    errorMessage.className = "alert-error";
    errorMessage.innerHTML = `<p>${message}</p>`;
    contactForm.prepend(errorMessage);

    // Auto-remove error after 5 seconds
    setTimeout(() => errorMessage.remove(), 5000);
  }
});
