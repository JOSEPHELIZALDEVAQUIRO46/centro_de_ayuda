document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
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
            if (pageYOffset >= sectionTop - 100) {
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
});