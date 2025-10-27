document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');
        });
        
        // Close menu when a link is clicked (mobile experience)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    mainNav.classList.remove('is-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
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

    // Get the selected value
    const selectedService = serviceSelect.value;

    // Define the value that should hide the tiers
    const oneOffService = 'Action Email'; 

    if (selectedService === oneOffService) {
        // Hide the tier group
        tierGroup.style.display = 'none';
        
        // Remove 'required' attribute when hidden, so the form can submit
        tierSelect.removeAttribute('required');
        
        // Ensure Netlify still captures a value for this field if hidden
        tierSelect.value = 'N/A - One-Off Service';
        
    } else {
        // Show the tier group for subscription services
        tierGroup.style.display = 'block';
        
        // Restore 'required' attribute
        tierSelect.setAttribute('required', 'required');
    }
}

// Ensure the function runs once the page loads to check for initial state
document.addEventListener('DOMContentLoaded', () => {
    // Existing menu toggle logic remains here...
    
    // Check if the service interest element exists (i.e., we are on the onboarding page)
    if (document.getElementById('service-interest')) {
        // Run toggle on load to handle back-button states or refresh
        toggleTierVisibility(); 
    }
});

// --- Dynamic Header Shrink Logic ---

const header = document.querySelector('.site-header');
const scrollOffset = 100; // Point in pixels where the shrink effect begins

function handleScroll() {
    if (window.scrollY >= scrollOffset) {
        // User has scrolled past the threshold
        if (!header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
        }
    } else {
        // User is back at the top
        if (header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
        }
    }
}

// Add the scroll event listener globally
window.addEventListener('scroll', handleScroll);

// Also run once on page load to handle initial position if starting mid-page
document.addEventListener('DOMContentLoaded', handleScroll);

// Note: Ensure this runs AFTER your other DOMContentLoaded listeners.
