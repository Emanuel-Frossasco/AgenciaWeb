import './style.css';

/* =========================================
   Menu Show Y Hidden
   ========================================= */
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* =========================================
   Remove Menu Mobile
   ========================================= */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* =========================================
   Scroll Reveal Animation
   ========================================= */
const sr = {
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
}

const sections = document.querySelectorAll('section');

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-section');
            // Animate children possibly? 
            // For now, let's just use a simple fade-in class approach if needed
            // But I'll use a simpler IntersectionObserver for fade-ins
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

sections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('fade-in-section');
});


/* =========================================
   Change Background Header
   ========================================= */
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class
    if (this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* =========================================
   Contact Form Simulate
   ========================================= */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        const formData = new FormData(contactForm);

        button.textContent = 'Enviando...';
        button.disabled = true;

        try {
            const response = await fetch(contactForm.getAttribute('action'), {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('¡Gracias! Tu mensaje ha sido enviado correctamente.');
                contactForm.reset();
            } else {
                alert('Oops! Hubo un problema enviando tu formulario. Por favor intenta de nuevo.');
            }
        } catch (error) {
            alert('Oops! Hubo un problema conectando al servidor. Revisa tu conexión.');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}
