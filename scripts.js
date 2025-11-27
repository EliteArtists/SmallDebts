document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');
            
            // Close any open dropdowns when the main menu is closed
            if (!mainNav.classList.contains('is-open')) {
                mainNav.querySelectorAll('.has-dropdown.is-open').forEach(dropdown => {
                    dropdown.classList.remove('is-open');
                });
            }
        });
        
        // Close menu when a link is clicked (mobile experience)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Only close the main navigation if the screen is small AND the link is not a dropdown trigger
                const parentLi = link.closest('li');
                if (window.innerWidth < 768 && !parentLi.classList.contains('has-dropdown')) {
                    mainNav.classList.remove('is-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // NEW: Mobile Dropdown Toggle Logic
        mainNav.querySelectorAll('.dropdown-trigger').forEach(trigger => {
            trigger.addEventListener('click', (event) => {
                const parentLi = trigger.closest('.has-dropdown');
                
                if (window.innerWidth < 768) {
                    // Only prevent the default link action if the screen is small (mobile/iPad)
                    // This allows the first tap to open the menu, and the second tap to navigate to the link.
                    event.preventDefault(); 
                    
                    // Toggle the 'is-open' class on the parent list item
                    parentLi.classList.toggle('is-open');

                    // Optional: Close other open mobile dropdowns
                    mainNav.querySelectorAll('.has-dropdown.is-open').forEach(openDropdown => {
                        if (openDropdown !== parentLi) {
                            openDropdown.classList.remove('is-open');
                        }
                    });
                }
            });
        });
    }
});

// --- Dynamic Form Logic for Onboarding Page (UNCHANGED) ---

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
    // Check if the service interest element exists (i.e., we are on the onboarding page)
    if (document.getElementById('service-interest')) {
        // Run toggle on load to handle back-button states or refresh
        toggleTierVisibility(); 
    }
});

// --- Dynamic Header Shrink Logic (UNCHANGED) ---

const header = document.querySelector('.site-header');
// Set the scroll point (e.g., 100 pixels down) where the shrink effect begins
const scrollOffset = 100; 

function handleScroll() {
    if (window.scrollY >= scrollOffset) {
        // User has scrolled past the threshold: apply the scrolled classes
        if (!header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
        }
    } else {
        // User is back at the top: remove the scrolled classes
        if (header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
        }
    }
}

// Add the event listener to trigger the function when the user scrolls
window.addEventListener('scroll', handleScroll);

// Also run once on page load to handle initial position 
document.addEventListener('DOMContentLoaded', handleScroll);
