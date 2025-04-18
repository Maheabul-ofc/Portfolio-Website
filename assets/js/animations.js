// Animations for Mahea Bul Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        if (!elements.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Add visible class when element enters viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Determine animation type from data attributes if present
                    if (entry.target.dataset.animation) {
                        entry.target.classList.add(entry.target.dataset.animation);
                    } else {
                        // Default animation
                        entry.target.classList.add('slide-up');
                    }
                    
                    // Stop observing after animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Negative margin to trigger earlier
        });
        
        // Observe each element
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Parallax effect for hero section
    const parallaxEffect = function() {
        const heroSection = document.querySelector('.hero');
        
        if (!heroSection) return;
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition < 600) {
                const translateY = scrollPosition * 0.3;
                heroSection.style.backgroundPositionY = `${translateY}px`;
            }
        });
    };
    
    // Initialize parallax effect
    parallaxEffect();
    
    // Smooth scrolling for anchor links
    const smoothScroll = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                // Skip if the href is just "#"
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80; // Adjust based on your header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Initialize smooth scrolling
    smoothScroll();
    
    // Animate header on scroll (change styles when scrolling down)
    const animateHeader = function() {
        const header = document.getElementById('header');
        
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };
    
    // Initialize header animation
    animateHeader();
    
    // Typewriter effect for hero section
    // Typewriter effect for hero section with infinite loop
const typewriterEffect = function() {
    const element = document.querySelector('.hero-content .text-content h2');
    
    if (!element) return;
    
    const originalText = element.textContent;
    element.textContent = '';
    element.classList.add('typewriter');
    
    let isDeleting = false;
    let text = '';
    let i = 0;
    const typingSpeed = 100; // typing speed in ms
    const deletingSpeed = 90; // faster when deleting
    const pauseBetween = 150; // pause before deleting
    
    function typeWriter() {
        const currentText = originalText;
        
        if (!isDeleting && i < currentText.length) {
            // Typing phase
            text = currentText.substring(0, i + 1);
            element.textContent = text;
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else if (isDeleting && i > 0) {
            // Deleting phase
            text = currentText.substring(0, i + 1 );
            element.textContent = text;
            i--;
            setTimeout(typeWriter, deletingSpeed);
        } else {
            // Switch between typing and deleting
            isDeleting = !isDeleting;
            
            // Only pause if we've just finished typing (not deleting)
            if (!isDeleting) {
                setTimeout(typeWriter, pauseBetween);
            } else {
                setTimeout(typeWriter, typingSpeed);
            }
        }
    }
    
    // Start the typewriter effect
    setTimeout(() => {
        typeWriter();
    }, 1000); // Initial delay before starting
};
    
    // Initialize typewriter effect
    typewriterEffect();
});