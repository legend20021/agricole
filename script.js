// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Loading Animation ---
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 500); // Reducido para una carga más rápida
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Cierra el menú móvil si está abierto
            if (navLinks.classList.contains('mobile-active')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('mobile-active');
            }
        });
    });

    // --- Scroll-Triggered Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optimización: deja de observar el elemento una vez visible
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // --- Header & Scroll Elements Visibility ---
    const header = document.getElementById('header');
    const fabScroll = document.getElementById('fabScroll');
    const scrollProgress = document.getElementById('scrollProgress');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Header hide/show
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            header.style.background = scrollTop > 50 ? 'rgba(245, 245, 220, 0.95)' : 'rgba(245, 245, 220, 0.9)';
            header.style.boxShadow = scrollTop > 50 ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // FAB visibility
        if (fabScroll) {
            fabScroll.classList.toggle('visible', window.pageYOffset > 300);
        }

        // Scroll progress bar
        if (scrollProgress) {
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
        });
    }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Simulación de envío
            showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
            this.reset();
        });
    }

    // --- Notification System ---
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    // (Añadir estilos para .notification en el CSS si no existen)
    // He añadido los estilos básicos directamente al style.css
});
