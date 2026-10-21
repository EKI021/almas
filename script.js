// ===== Preloader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 1500);
});

// Fallback: Force hide preloader after 3 seconds even if there's an error
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        console.warn('Preloader force-hidden after timeout');
    }
}, 3000);

// ===== Network Canvas Animation (Business Development Theme) =====
const canvas = document.getElementById('networkCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let nodes = [];

if (canvas && ctx) {
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 3 + 2;
        this.color = Math.random() > 0.5 ? '#e8a838' : '#3282b8';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

for (let i = 0; i < 50; i++) {
    nodes.push(new Node());
}

function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(232, 168, 56, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    requestAnimationFrame(animate);
}

animate();
} // End of canvas animation block

// ===== Typewriter Effect =====
const typewriterText = document.getElementById('typewriter');
const phrases = [
    'Business Development Officer',
    'B2B Partnership Specialist',
    'Strategic Growth Driver',
    'Market Expansion Expert',
    'Client Relationship Builder'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    let typeSpeed = 100;
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    setTimeout(typeWriter, typeSpeed);
}

typeWriter();

// ===== Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        updateCounter();
    });
    countersAnimated = true;
}

// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    const heroSection = document.getElementById('home');
    const heroRect = heroSection.getBoundingClientRect();
    if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
        animateCounters();
    }
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== Timeline Animation =====
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ===== Skill Bars Animation =====
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===== Language Circle Animation =====
const languageCircles = document.querySelectorAll('.progress-circle');
const languageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const percent = entry.target.getAttribute('data-percent');
            const circumference = 2 * Math.PI * 40;
            const offset = circumference - (percent / 100) * circumference;
            entry.target.style.strokeDashoffset = offset;
        }
    });
}, { threshold: 0.5 });

languageCircles.forEach(circle => {
    languageObserver.observe(circle);
});

// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('Portfolio loaded successfully! 🚀');


// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
    cursorFollower.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
    cursorFollower.classList.remove('active');
});

document.querySelectorAll('a, button, .btn, .tool-item, .timeline-content').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// ===== Scroll Progress Bar =====
const scrollProgressBar = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgressBar.style.width = scrollPercent + '%';
});

// ===== Ripple Effect on Buttons =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});


// ===== 3D Tilt Effect on Cards =====
const tiltCards = document.querySelectorAll('.timeline-content, .edu-card, .org-card, .skill-category, .contact-item');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ===== Text Reveal Animation =====
const revealElements = document.querySelectorAll('.section-title, .about-text, .timeline-title, .edu-content h3, .org-card h3');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-text', 'active');
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => {
    el.classList.add('reveal-text');
    revealObserver.observe(el);
});

// ===== Stagger Animation for Lists =====
const staggerItems = document.querySelectorAll('.timeline-details li, .org-card ul li, .highlight-item');

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('stagger-item', 'active');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

staggerItems.forEach(item => {
    item.classList.add('stagger-item');
    staggerObserver.observe(item);
});

// ===== Pulse Animation for Category Icons =====
const categoryIcons = document.querySelectorAll('.category-icon, .org-icon, .edu-icon, .contact-icon');
categoryIcons.forEach(icon => {
    icon.classList.add('pulse-icon');
});

// ===== Shimmer Effect on Timeline =====
const timelineContents = document.querySelectorAll('.timeline-content');
timelineContents.forEach(content => {
    content.classList.add('shimmer');
});

// ===== Glow Text Effect on Hero Title =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.classList.add('glow-text');
}


// ===== Parallax Effect on Scroll =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-bg-icons i');
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// ===== Magnetic Button Effect =====
const magneticBtns = document.querySelectorAll('.btn');

magneticBtns.forEach(btn => {
    btn.classList.add('magnetic-btn');
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== Enhanced Floating Cards Animation =====
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
});

// ===== Smooth Section Transitions =====
const transitionSections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

transitionSections.forEach(section => {
    if (!section.classList.contains('hero')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    }
});

// ===== Hover Sound Effect (Visual Feedback) =====
const interactiveElements = document.querySelectorAll('.tool-item, .timeline-content, .edu-card, .org-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
});

// ===== Dynamic Background Color Change on Scroll =====
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    lastScrollTop = scrollTop;
    
    if (scrollDirection === 'down') {
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }
});

// ===== Intersection Observer for Skill Bars =====
const skillSection = document.querySelector('.skills');
let skillsAnimated = false;

const skillSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            document.querySelectorAll('.skill-progress').forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.3 });

if (skillSection) {
    skillSectionObserver.observe(skillSection);
}

console.log('✨ Portfolio Enhanced with Advanced Animations! 🚀');


// ===== Contact Form with FormSubmit.co Integration =====
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage_status');
const charCount = document.getElementById('charCount');
const messageField = document.getElementById('formMessage');
const toastContainer = document.getElementById('toastContainer');

// Character Counter
if (messageField && charCount) {
    messageField.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        const counter = charCount.parentElement;
        counter.classList.remove('warning', 'danger');
        
        if (count > 900) {
            counter.classList.add('danger');
        } else if (count > 700) {
            counter.classList.add('warning');
        }
    });
}

// Real-time Validation
const formInputs = document.querySelectorAll('#contactForm input[required], #contactForm textarea[required]');

formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', function() {
        if (this.parentElement.classList.contains('invalid')) {
            validateField.call(this);
        }
    });
});

function validateField() {
    const parent = this.parentElement;
    let isValid = true;
    
    if (this.required && !this.value.trim()) {
        isValid = false;
    }
    
    if (this.type === 'email' && this.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(this.value);
    }
    
    parent.classList.remove('valid', 'invalid');
    parent.classList.add(isValid ? 'valid' : 'invalid');
    
    return isValid;
}

// Toast Notification System
function showToast(type, title, message, duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconMap[type]}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress"></div>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

// Confetti Animation for Success
function createConfetti() {
    const colors = ['#e8a838', '#3282b8', '#10b981', '#f59e0b', '#ef4444'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}


// Form Submission Handler with FormSubmit.co
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields first
        let allValid = true;
        formInputs.forEach(input => {
            if (!validateField.call(input)) {
                allValid = false;
            }
        });
        
        if (!allValid) {
            showToast('error', 'Validation Error', 'Please fill in all required fields correctly.');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        const formData = new FormData(contactForm);
        const formAction = contactForm.getAttribute('action');
        
        // Submit form using FormSubmit.co
        fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success state
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                
                // Show success message
                formMessage.className = 'form-message success show';
                formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully to almashusniadibah@gmail.com. I\'ll get back to you soon!';
                
                // Show success toast
                showToast('success', 'Message Sent! ✨', 'Thank you for reaching out. I\'ll respond within 24 hours.');
                
                // Confetti celebration
                createConfetti();
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    charCount.textContent = '0';
                    formInputs.forEach(input => {
                        input.parentElement.classList.remove('valid', 'invalid');
                    });
                }, 500);
                
                // Reset button after 4 seconds
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                    formMessage.classList.remove('show');
                }, 4000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Get form data for mailto fallback
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const subject = document.getElementById('formSubject').value || 'Portfolio Contact';
            const message = document.getElementById('formMessage').value;
            
            // Create mailto link with form data
            const mailtoSubject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:almashusniadibah@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
            
            // Show error message with mailto fallback
            formMessage.className = 'form-message error show';
            formMessage.innerHTML = `
                <i class="fas fa-exclamation-circle"></i> 
                <strong>Form submission failed.</strong><br>
                Please click the button below to send via your email app:<br>
                <a href="${mailtoLink}" class="btn-mailto" style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #e8a838; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">
                    <i class="fas fa-envelope"></i> Open Email App
                </a>
                <br><small style="margin-top: 8px; display: block; opacity: 0.8;">Or email directly: almashusniadibah@gmail.com</small>
            `;
            
            // Show error toast with instructions
            showToast('error', 'Submission Failed', 'Click "Open Email App" button to send message.');
            
            // Hide error message after 15 seconds
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 15000);
        });
    });
}

console.log(' Contact Form with FormSubmit.co Integration Ready!');


