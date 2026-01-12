// Smooth Scroll Animations and Interactive Effects

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate service cards on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const serviceCards = document.querySelectorAll('.service-card');
    const whyCards = document.querySelectorAll('.why-card');
    const statItems = document.querySelectorAll('.stat-item');
    
    // Set initial state for service cards
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Set initial state for why cards
    whyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate stats with counter effect
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.15}s`;
        observer.observe(item);
        
        // Number animation
        const numberElement = item.querySelector('.stat-number');
        if (numberElement) {
            const finalValue = numberElement.textContent;
            const isNumber = /^\d+$/.test(finalValue);
            
            if (isNumber) {
                numberElement.textContent = '0';
                
                const animateNumber = () => {
                    const target = parseInt(finalValue);
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            numberElement.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            numberElement.textContent = Math.floor(current).toString();
                        }
                    }, 16);
                };
                
                const numObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateNumber();
                            numObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                numObserver.observe(item);
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .schedule-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Parallax effect for hero section (subtle)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.backgroundPositionY = `${rate}px`;
        });
    }
    
    // Add ripple effect to cards
    function createRipple(event, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - element.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - element.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = element.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        element.appendChild(circle);
    }
    
    // Add stagger animation to testimonials when visible
    const testimonialSection = document.querySelector('.testimonials');
    if (testimonialSection) {
        const testimonialsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const testimonials = entry.target.querySelectorAll('.testimonial');
                    testimonials.forEach((testimonial, index) => {
                        setTimeout(() => {
                            testimonial.style.opacity = '1';
                            testimonial.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    testimonialsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        testimonialSection.querySelectorAll('.testimonial').forEach(testimonial => {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateY(30px)';
            testimonial.style.transition = 'all 0.6s ease';
        });
        
        testimonialsObserver.observe(testimonialSection);
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
