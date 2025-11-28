document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');
            
            // Optional: Close dropdowns when main menu is closed
            if (!mainNav.classList.contains('is-open')) {
                mainNav.querySelectorAll('.has-dropdown.is-open').forEach(el => {
                    el.classList.remove('is-open');
                });
            }
        });
        
        // Mobile Dropdown Toggle Logic
        // We select the actual link that says "Dispute Service" or "Contact"
        mainNav.querySelectorAll('.dropdown-trigger').forEach(trigger => {
            trigger.addEventListener('click', (event) => {
                // Check if we are on mobile (screen width < 768px)
                if (window.innerWidth < 768) {
                    const parentLi = trigger.closest('.has-dropdown');
                    
                    // If the menu is NOT open, prevent the link from going to the page
                    // and instead open the dropdown.
                    if (!parentLi.classList.contains('is-open')) {
                        event.preventDefault();
                        parentLi.classList.add('is-open');
                    } 
                    // If it IS open, the second click will naturally go to the link href
                    // OR you can force it to close by adding an else { parentLi.classList.remove('is-open'); event.preventDefault(); }
                    // But usually, clicking again to navigate is standard behavior.
                    
                    // Let's implement toggle behavior (Open/Close) and rely on the sub-link for navigation
                    else {
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
    // Check if elements exist before accessing them to avoid errors on other pages
    const serviceSelect = document.getElementById('service-interest');
    const tierGroup = document.getElementById('tier-selection-group');
    const tierSelect = document.getElementById('tier-interest');

    if(!serviceSelect || !tierGroup || !tierSelect) return;

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
