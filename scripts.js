document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');
            
            if (!mainNav.classList.contains('is-open')) {
                mainNav.querySelectorAll('.has-dropdown.is-open').forEach(el => {
                    el.classList.remove('is-open');
                });
            }
        });
        
        mainNav.querySelectorAll('.dropdown-trigger').forEach(trigger => {
            trigger.addEventListener('click', (event) => {
                if (window.innerWidth < 768) {
                    const parentLi = trigger.closest('.has-dropdown');
                    if (!parentLi.classList.contains('is-open')) {
                        event.preventDefault();
                        parentLi.classList.add('is-open');
                    } else {
                        event.preventDefault();
                        parentLi.classList.remove('is-open');
                    }
                }
            });
        });
    }
});

// --- Dynamic Form Logic for Onboarding Page ---

function toggleTierVisibility() {
    const serviceSelect = document.getElementById('service-interest');
    const tierGroup = document.getElementById('tier-selection-group');
    const tierSelect = document.getElementById('tier-interest');

    if(!serviceSelect || !tierGroup || !tierSelect) return;

    const selectedService = serviceSelect.value;
    const oneOffService = 'Action Email'; 

    if (selectedService === oneOffService) {
        tierGroup.style.display = 'none';
        tierSelect.removeAttribute('required');
        tierSelect.value = 'N/A - One-Off Service';
    } else {
        tierGroup.style.display = 'block';
        tierSelect.setAttribute('required', 'required');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('service-interest')) {
        toggleTierVisibility(); 
    }
});

// --- Dynamic Header Shrink Logic ---

const header = document.querySelector('.site-header');
const scrollOffset = 100; 

function handleScroll() {
    if(!header) return;
    
    if (window.scrollY >= scrollOffset) {
        if (!header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
        }
    } else {
        if (header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
        }
    }
}

window.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll);

// --- HERO SLIDER LOGIC (NEW) ---
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        
        setInterval(() => {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active-slide');
            
            // Increment index (loop back to 0 if at end)
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add active class to next slide
            slides[currentSlide].classList.add('active-slide');
        }, 7000); // 7000ms = 7 seconds
    }
});