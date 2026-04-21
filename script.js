/* Mouse Follower Blob */
const blob = document.getElementById("blob");

window.onpointermove = event => { 
    const { clientX, clientY } = event;
    
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });
}

/* Navbar Scroll Effect */
const navbar = document.getElementById('navbar');
window.onscroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
};

/* Scroll Reveal Animation */
const revealElements = document.querySelectorAll('.reveal, .skill-category, .project-card, .edu-item, .contact-item');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.85) {
            el.classList.add('active');
            // For items without the reveal class initially
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
};

// Initial call and event listener
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
    revealOnScroll();
    // Special reveal for hero elements
    document.querySelectorAll('.hero .reveal').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, 200 * (index + 1));
    });
});

/* Mobile Menu (Simplified) */
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(5, 5, 5, 0.95)';
        navLinks.style.padding = '2rem';
        navLinks.style.backdropFilter = 'blur(10px)';
    });
}

// Add smooth reveal transition styles via JS if not in CSS
revealElements.forEach(el => {
    if (!el.classList.contains('reveal')) {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    }
});

/* Typewriter Effect */
const typewriter = (selector, words, speed = 100) => {
    const el = document.querySelector(selector);
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentWord = words[wordIndex];
        const displayText = isDeleting 
            ? currentWord.substring(0, charIndex - 1)
            : currentWord.substring(0, charIndex + 1);
        
        el.innerHTML = displayText;
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

        let typeSpeed = speed;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Wait at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    };

    type();
};

window.addEventListener('DOMContentLoaded', () => {
    typewriter('#typewriter-role', ['Front-End Developer', 'Programmer', 'UI/UX Enthusiast', 'Python Developer']);
});
