// Nexus Corporation Landing Page JavaScript
// All interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Smooth Scrolling for Navigation Links
    initSmoothScrolling();
    
    // FAQ Accordion
    initFAQAccordion();
    
    // Scroll Progress Indicator
    initScrollProgress();
    
    // Intersection Observer for Animations
    initScrollAnimations();
    
    // Floating Elements Animation
    initFloatingElements();
    
    // CTA Button Interactions
    initCTAButtons();
    
    // Navbar Background on Scroll
    initNavbarScroll();
    
    // Testimonials Auto-scroll (optional)
    // initTestimonialsCarousel();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuButton.querySelector('[data-lucide="menu"]');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    mobileMenuButton.addEventListener('click', function() {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            // Change icon to X
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            mobileMenu.style.maxHeight = '0px';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            // Change icon back to menu
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        
        // Recreate icons after changing
        lucide.createIcons();
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.maxHeight = '0px';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ Accordion Functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('[data-lucide="chevron-down"]');
        
        if (!question || !answer || !icon) return;
        
        // Initialize all answers as closed
        answer.style.maxHeight = '0px';
        answer.style.opacity = '0';
        
        question.addEventListener('click', function() {
            const isCurrentlyOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
            
            // Close all FAQ items first
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('[data-lucide="chevron-down"]');
                
                if (otherAnswer && otherIcon) {
                    otherAnswer.style.maxHeight = '0px';
                    otherAnswer.style.opacity = '0';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // If this item wasn't open, open it
            if (!isCurrentlyOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        progressBar.style.transform = `scaleX(${scrollPercent})`;
    });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card-hover, .testimonial-card, h2, h3');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Floating Elements Animation
function initFloatingElements() {
    // Create floating elements dynamically
    const hero = document.querySelector('section');
    
    for (let i = 0; i < 3; i++) {
        const floatingElement = document.createElement('div');
        floatingElement.className = 'floating-element absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-20';
        floatingElement.style.left = Math.random() * 100 + '%';
        floatingElement.style.top = Math.random() * 100 + '%';
        floatingElement.style.animationDelay = (i * 2) + 's';
        
        hero.appendChild(floatingElement);
    }
}

// CTA Button Interactions
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover sound effect (optional - can be enabled with user permission)
        button.addEventListener('mouseenter', function() {
            // Could add subtle sound effect here
            this.style.transform = 'scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Navbar Background Change on Scroll
function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-blur');
            navbar.style.backgroundColor = 'rgba(13, 14, 21, 0.95)';
        } else {
            navbar.classList.remove('nav-blur');
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        }
    });
}

// Testimonials Carousel (Optional - Auto-scroll)
function initTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    if (testimonials.length === 0) return;
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        testimonials[currentIndex].style.opacity = '0.7';
        testimonials[currentIndex].style.transform = 'scale(0.95)';
        
        currentIndex = (currentIndex + 1) % testimonials.length;
        
        testimonials[currentIndex].style.opacity = '1';
        testimonials[currentIndex].style.transform = 'scale(1)';
    }, 5000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Any additional scroll-based functionality can go here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        const menuButton = document.getElementById('mobile-menu-button');
        
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const menuIcon = menuButton.querySelector('[data-lucide]');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
        
        // Close any open FAQ items
        const activeFAQs = document.querySelectorAll('.faq-answer.active');
        activeFAQs.forEach(faq => {
            faq.classList.remove('active');
            faq.style.maxHeight = '0px';
            const icon = faq.parentElement.querySelector('[data-lucide="chevron-down"]');
            if (icon) icon.style.transform = 'rotate(0deg)';
        });
    }
});

// Accessibility: Focus management
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trapping for mobile menu
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenu) {
    trapFocus(mobileMenu);
}

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        'https://unpkg.com/lucide@latest/dist/umd/lucide.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.includes('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Error handling for failed resource loads
window.addEventListener('error', function(e) {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
    
    // Fallback for Lucide icons if CDN fails
    if (e.target.src && e.target.src.includes('lucide')) {
        console.warn('Lucide icons failed to load, using fallback');
        // Could implement fallback icon system here
    }
});

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

