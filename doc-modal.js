document.addEventListener('DOMContentLoaded', function() {
    // Modal de documentación
    const docModal = document.getElementById('doc-modal');
    const docButton = document.getElementById('doc-toggle');
    const docCloseModal = docModal.querySelector('.close-modal');

    // Modal de desarrollador
    const devModal = document.getElementById('dev-info-modal');
    const devButton = document.getElementById('dev-info-btn');
    const devCloseModal = devModal ? devModal.querySelector('.close-modal') : null;

    // Modal de Preguntas Frecuentes (FAQ)
    const faqModal = document.getElementById('faq-section');
    const faqButton = document.getElementById('faq-toggle');
    const faqCloseModal = faqModal.querySelector('.close-modal');
    const faqContent = `
        <h2>Preguntas Frecuentes</h2>
        <div itemscope itemtype="https://schema.org/FAQPage">
            <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                <h3 itemprop="name">¿Qué es la IA generativa?</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <p itemprop="text">La IA generativa es una tecnología que crea contenido nuevo (texto, imágenes, código) a partir de patrones aprendidos.</p>
                </div>
            </div>
            <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                <h3 itemprop="name">¿Cómo elijo la mejor herramienta de IA?</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <p itemprop="text">Usa los filtros de este directorio para comparar por categoría (texto, imágenes, audio) y revisa las valoraciones de usuarios.</p>
                </div>
            </div>
            <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                <h3 itemprop="name">¿Es gratuito este directorio?</h3>
                <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                    <p itemprop="text">Sí, este sitio es 100% gratuito y no requiere registro.</p>
                </div>
            </div>
        </div>
    `;

    // Función genérica para manejar modales
    function setupModal(modal, button, closeButton, content = null) {
        if (!modal || !button) return;

        button.addEventListener('click', function() {
            // Cierra otros modales primero
            document.querySelectorAll('.modal').forEach(m => {
                if (m !== modal) m.classList.add('hidden');
            });

            // Si hay contenido, se actualiza el modal
            if (content) {
                modal.querySelector('.modal-content').innerHTML = content + '<span class="close-modal">&times;</span>';
            }

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            // Actualiza el botón de cerrar en caso de contenido dinámico
            const dynamicCloseButton = modal.querySelector('.close-modal');
            if (dynamicCloseButton) {
                dynamicCloseButton.addEventListener('click', function() {
                    modal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                });
            }
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

    // Configura todos los modales
    setupModal(docModal, docButton, docCloseModal);
    if (devModal) setupModal(devModal, devButton, devCloseModal);
    setupModal(faqModal, faqButton, faqCloseModal, faqContent);

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
