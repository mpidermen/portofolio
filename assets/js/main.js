// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Cek pilihan tema sebelumnya dari LocalStorage
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');

            if (isLight) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('selectedTheme', 'light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('selectedTheme', 'dark');
            }
        });
    }
    
    // Set Current Footer Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 1. Typing Animation Setup
    const roles = ["Informatics Student", "Aspiring Software Developer", "Technology Enthusiast", "IoT Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextEl = document.getElementById('typingText');

    function typeEffect() {
        if (!typingTextEl) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();

    // 2. Scroll Progress & Sticky Navbar
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Active Navigation Highlight
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 3. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function openMenu() {
        navMenu.classList.add('active');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    hamburger.addEventListener('click', () => {
        navMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    // Tutup menu otomatis saat link diklik (supaya scroll tidak terkunci terus)
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Kalau layar diperbesar ke desktop saat menu terbuka, buka kunci scroll
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });

    // 4. Back To Top
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Static Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const feedback = document.getElementById('formFeedback');

            // Reset Errors
            document.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('error'));

            if (!name.value.trim()) {
                name.parentElement.classList.add('error');
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
                email.parentElement.classList.add('error');
                isValid = false;
            }

            if (!subject.value.trim()) {
                subject.parentElement.classList.add('error');
                isValid = false;
            }

            if (!message.value.trim()) {
                message.parentElement.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                // Tampilkan indikator loading pada tombol
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                // Ambil data form
                const formData = new FormData(contactForm);

                // Kirim data secara asinkron ke Web3Forms tanpa redirect aplikasi
                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        // Tampilkan pesan sukses langsung di halaman
                        feedback.className = "form-feedback success";
                        feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Pesan kamu berhasil terkirim!';
                        contactForm.reset();
                    } else {
                        feedback.className = "form-feedback error";
                        feedback.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> ' + json.message;
                    }
                })
                .catch(error => {
                    feedback.className = "form-feedback error";
                    feedback.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Terjadi kesalahan jaringan.';
                })
                .then(() => {
                    // Kembalikan status tombol
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
            }
        });
    }
});

// Custom Orange Cursor Logic
const cursorOuter = document.querySelector('.custom-cursor-outer');
const cursorInner = document.querySelector('.custom-cursor-inner');

if (cursorOuter && cursorInner && window.innerWidth > 992) {
    window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        
        // Pergerakan titik inner (langsung ikuti mouse)
        cursorInner.style.left = `${x}px`;
        cursorInner.style.top = `${y}px`;
        
        // Pergerakan lingkaran outer (mengikuti dengan sedikit delay/smooth)
        cursorOuter.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 150, fill: "forwards" });
    });

    // Efek membesar saat kursor diarahkan ke elemen yang bisa diklik
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .btn, .filter-btn, .project-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}
