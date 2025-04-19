document.addEventListener('DOMContentLoaded', function() {
    const docModal = document.getElementById('doc-modal');
    const docButton = document.getElementById('doc-toggle');
    const closeModal = document.querySelector('.close-modal');

    // Abrir modal
    docButton.addEventListener('click', function() {
        docModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Evitar scroll del body
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        docModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Cerrar al hacer clic fuera del contenido
    docModal.addEventListener('click', function(e) {
        if (e.target === docModal) {
            docModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !docModal.classList.contains('hidden')) {
            docModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});
