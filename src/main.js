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
   Contact Form → WhatsApp
   ========================================= */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        // Validación básica
        if (!name || !email || !message) {
            showFormFeedback('Por favor completá todos los campos requeridos.', 'error');
            return;
        }

        // Armar el mensaje de WhatsApp
        const waNumber = '5493541614667';
        let text = `Hola Emanuel! Me contacto desde tu sitio web.\n\n`;
        text += `*Nombre:* ${name}\n`;
        text += `*Email:* ${email}\n`;
        if (service) text += `*Servicio:* ${service}\n`;
        text += `\n*Mensaje:*\n${message}`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');

        showFormFeedback('¡Genial! Te dirigimos a WhatsApp para completar el envío.', 'success');
        contactForm.reset();
    });
}

function showFormFeedback(msg, type) {
    // Remover feedback anterior si existe
    const old = document.getElementById('form-feedback');
    if (old) old.remove();

    const el = document.createElement('p');
    el.id = 'form-feedback';
    el.textContent = msg;
    el.style.cssText = `
        margin-top: 12px;
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        text-align: center;
        background: ${type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'};
        color: ${type === 'success' ? '#16a34a' : '#dc2626'};
        border: 1px solid ${type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'};
    `;
    contactForm.appendChild(el);
    setTimeout(() => el.remove(), 5000);
}
