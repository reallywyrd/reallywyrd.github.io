document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const desktopAccessibilityBtn = document.getElementById('accessibility-btn');
    const mobileAccessibilityBtn = document.getElementById('accessibility-btn-mobile');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const navOverlay = document.getElementById('nav-overlay');
    const closeBtn = document.getElementById('close-btn');
    const cards = document.querySelectorAll('.card');

    // Accessibility feature: Check for saved state in localStorage
    const savedContrast = localStorage.getItem('high-contrast-mode');
    if (savedContrast === 'enabled') {
        body.classList.add('high-contrast');
    }

    // Function to toggle high-contrast mode and save state to localStorage
    const toggleHighContrast = () => {
        body.classList.toggle('high-contrast');
        if (body.classList.contains('high-contrast')) {
            localStorage.setItem('high-contrast-mode', 'enabled');
        } else {
            localStorage.setItem('high-contrast-mode', 'disabled');
        }
    };

    // Attach event listeners to both desktop and mobile buttons
    if (desktopAccessibilityBtn) {
        desktopAccessibilityBtn.addEventListener('click', toggleHighContrast);
    }
    if (mobileAccessibilityBtn) {
        mobileAccessibilityBtn.addEventListener('click', toggleHighContrast);
    }

    // Mobile menu toggle
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', () => {
            navOverlay.classList.add('active');
        });
    }

    // Close mobile menu
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navOverlay.classList.remove('active');
        });
    }

    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });
});
