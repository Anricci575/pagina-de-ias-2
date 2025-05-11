document.addEventListener('DOMContentLoaded', function() {
    // Modal de documentación
    const docModal = document.getElementById('doc-modal');
    const docButton = document.getElementById('doc-toggle');
    const docCloseModal = docModal.querySelector('.close-modal'); // Cambiado a selector específico

    // Modal de desarrollador
    const devModal = document.getElementById('dev-info-modal');
    const devButton = document.getElementById('dev-info-btn');
    const devCloseModal = devModal ? devModal.querySelector('.close-modal') : null;

    // Función genérica para manejar modales
    function setupModal(modal, button, closeButton) {
        if (!modal || !button) return;

        button.addEventListener('click', function() {
            // Cierra otros modales primero
            document.querySelectorAll('.modal').forEach(m => {
                if (m !== modal) m.classList.add('hidden');
            });
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        if (closeButton) {
            closeButton.addEventListener('click', function() {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Configura ambos modales
    setupModal(docModal, docButton, docCloseModal);
    if (devModal) setupModal(devModal, devButton, devCloseModal);

    // Cerrar todos los modales con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
            document.body.style.overflow = 'auto';
        }
    });
});