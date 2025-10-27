document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Form Validation and Simulated Email Send
    const contactForm = document.getElementById('contactForm');
    const confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío real del formulario

        // Basic validation
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');
        let isValid = true;

        // Clear previous validations
        nombre.classList.remove('is-invalid');
        email.classList.remove('is-invalid');
        mensaje.classList.remove('is-invalid');

        if (nombre.value.trim() === '') {
            nombre.classList.add('is-invalid');
            isValid = false;
        }
        if (!validateEmail(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        }
        if (mensaje.value.trim() === '') {
            mensaje.classList.add('is-invalid');
            isValid = false;
        }

        if (isValid) {
            // Simulamos el envío del correo abriendo el cliente de correo
            // Esto solo funciona si el usuario tiene un cliente de correo configurado
            // Y no hay una forma directa de saber si se abre o se envía.
            // Para un envío real se necesitaría un backend.
            const subject = encodeURIComponent('Mensaje desde la web de Patitas Felices');
            const body = encodeURIComponent(`Nombre: ${nombre.value}\nEmail: ${email.value}\nMensaje: ${mensaje.value}`);
            const mailtoLink = `mailto:info@patitasfelices.com.do?subject=${subject}&body=${body}`;

            // Abrir el cliente de correo
            window.location.href = mailtoLink;

            // Mostrar el modal de confirmación después de un breve retraso
            // Damos tiempo para que el navegador intente abrir el cliente de correo
            setTimeout(() => {
                confirmacionModal.show();
                contactForm.reset(); // Limpia el formulario después de "enviar"
                // Quitar las clases de validación después de resetear
                nombre.classList.remove('is-invalid');
                email.classList.remove('is-invalid');
                mensaje.classList.remove('is-invalid');
            }, 1000); // 1 segundo de retraso

        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // 3. Carousel for Testimonials
    // Bootstrap's carousel handles most of the functionality
    // The CSS ensures 4 cards per view for desktop, 2 for medium, 1 for small.
    // No specific JS needed here beyond what Bootstrap provides.
});