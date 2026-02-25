// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Contact form alert
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! (Demo)');
        contactForm.reset();
    });
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== SCROLL TIMELINE EFFECTS =====
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with scroll-timeline class
document.querySelectorAll('.scroll-timeline').forEach(el => {
    observer.observe(el);
});

// Also observe section titles for animation
document.querySelectorAll('.section-title').forEach(el => {
    observer.observe(el);
});

// Parallax effect for background (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Timeline icon rotation on hover
document.querySelectorAll('.timeline-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1) rotate(360deg)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Progressive loading animation for cards
window.addEventListener('load', () => {
    // Trigger animations for elements already in view
    document.querySelectorAll('.scroll-timeline').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.classList.add('visible');
        }
    });
});

// ===== IMAGE POP-UP FUNCTIONALITY =====
// Array of image sources
const popupImages = [
    'images/658b0366-d45f-4a41-ac05-7e4067dd907f.jfif',
    'images/99cc74b3-c64b-4d09-9e6e-854c603c8169.jfif',
    'images/dfde6304-c2dc-4748-a92a-94b4f4ec7bae.jfif'
];

// Array of image captions
const popupCaptions = [
    'Municipality of Binangonan - Computer Setup and Maintenance',
    'Municipality of Binangonan - Hardware Troubleshooting',
    'Municipality of Binangonan - IT Support and Documentation'
];

let currentPopupIndex = 0;

// Open pop-up with specific image
function openPopup(index) {
    currentPopupIndex = index;
    const popup = document.getElementById('imagePopup');
    const popupImg = document.getElementById('popupImage');
    const caption = document.getElementById('popupCaption');
    
    popupImg.src = popupImages[index];
    caption.textContent = popupCaptions[index];
    popup.style.display = 'flex';
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

// Close pop-up
function closePopup(event) {
    // Don't close if clicking on the image or navigation arrows
    if (event.target.classList.contains('popup-content') || 
        event.target.id === 'popupImage' ||
        event.target.classList.contains('popup-prev') ||
        event.target.classList.contains('popup-next')) {
        return;
    }
    
    const popup = document.getElementById('imagePopup');
    popup.style.display = 'none';
    
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

// Change image in pop-up
function changeImage(direction) {
    currentPopupIndex += direction;
    
    // Loop around
    if (currentPopupIndex >= popupImages.length) {
        currentPopupIndex = 0;
    } else if (currentPopupIndex < 0) {
        currentPopupIndex = popupImages.length - 1;
    }
    
    const popupImg = document.getElementById('popupImage');
    const caption = document.getElementById('popupCaption');
    
    // Add fade effect
    popupImg.style.animation = 'none';
    popupImg.offsetHeight; // Trigger reflow
    popupImg.style.animation = 'scaleIn 0.3s';
    
    popupImg.src = popupImages[currentPopupIndex];
    caption.textContent = popupCaptions[currentPopupIndex];
}

// Keyboard navigation for pop-up
document.addEventListener('keydown', function(e) {
    const popup = document.getElementById('imagePopup');
    if (popup.style.display === 'flex') {
        if (e.key === 'Escape') {
            closePopup(e);
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// Make functions globally available
window.openPopup = openPopup;
window.closePopup = closePopup;
window.changeImage = changeImage;