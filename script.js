document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Aumentado para compensar el navbar más grande
                behavior: 'smooth'
            });

            // Actualizar clase activa
            document.querySelectorAll('a.nav-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Detectar sección activa al hacer scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('main section');
        const navLinks = document.querySelectorAll('a.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) { // Aumentado para mejor detección
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Funcionalidad para copiar al portapapeles
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.previousElementSibling.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.textContent;
                this.textContent = '¡Copiado!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });

    // Contador de visitas de preguntas frecuentes
    const visitCounts = JSON.parse(localStorage.getItem('faqVisitCounts')) || {};
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.id;
            visitCounts[questionId] = (visitCounts[questionId] || 0) + 1;
            localStorage.setItem('faqVisitCounts', JSON.stringify(visitCounts));
            updateVisitCountDisplay(questionId, visitCounts[questionId]);
        });
    });

    function updateVisitCountDisplay(questionId, count) {
        const countElement = document.querySelector(`#${questionId} .visit-count`);
        if (countElement) {
            countElement.textContent = `Vistas: ${count}`;
        }
    }

    // Inicializar contadores
    for (let questionId in visitCounts) {
        updateVisitCountDisplay(questionId, visitCounts[questionId]);
    }

    // Animación de entrada para las secciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }); // Ajustado para activar antes

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}); 