// Sistema de Favoritos
const favoritesSection = document.getElementById('favorites-section');
const favoritesList = document.getElementById('favorites-list');
const favoritesCount = document.getElementById('favorites-count');

// Función para cargar favoritos desde localStorage y renderizarlos
function loadFavorites() {
    try {
        const favorites = getFavoritesFromLocalStorage();
        updateFavoritesCount(favorites);

        if (favorites.length > 0) {
            showFavoritesSection();
            renderFavorites(favorites);
        } else {
            hideFavoritesSection();
        }
    } catch (error) {
        console.error('Error al cargar favoritos:', error);
    }
}

// Recuperar favoritos desde localStorage
function getFavoritesFromLocalStorage() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    return Array.isArray(favorites) ? favorites : []; // Asegúrate de devolver un array
}

// Actualizar el contador de favoritos
function updateFavoritesCount(favorites) {
    const favoritesCount = document.getElementById('favorites-count');

}
// Mostrar la sección de favoritos
function showFavoritesSection() {
    favoritesSection.classList.remove('hidden');
}

// Ocultar la sección de favoritos
function hideFavoritesSection() {
    favoritesSection.classList.add('hidden');
}

// Renderizar la lista de favoritos
function renderFavorites(favorites) {
    favoritesList.innerHTML = ''; // Limpiar la lista antes de renderizar

    favorites.forEach(aiName => {
        const ai = ais.find(a => a.name === aiName);
        if (ai) {
            const aiItem = createAIItem(ai);
            aiItem.classList.add('favorite'); // Marcar como favorito
            favoritesList.appendChild(aiItem);
        }
    });
}

// Alternar el estado de favorito (añadir/quitar)
function toggleFavorite(aiName) {
    try {
        const favorites = getFavoritesFromLocalStorage();
        const index = favorites.indexOf(aiName);

        if (index === -1) {
            favorites.push(aiName); // Añadir a favoritos
        } else {
            favorites.splice(index, 1); // Eliminar de favoritos
        }

        saveFavoritesToLocalStorage(favorites);
        loadFavorites(); // Actualizar lista de favoritos
    } catch (error) {
        console.error('Error al alternar favoritos:', error);
    }
}

// Guardar la lista de favoritos en localStorage
function saveFavoritesToLocalStorage(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Crear un elemento de IA con soporte para favoritos
function createAIItem(ai) {
    const aiItem = document.createElement('div');
    aiItem.classList.add('ai-item', 'styled-card'); // Añadido para diseño estilizado
    aiItem.setAttribute('data-category', ai.category);

    // Verificar si esta IA está marcada como favorita
    const favorites = getFavoritesFromLocalStorage();
    if (favorites.includes(ai.name)) {
        aiItem.classList.add('favorite');
    }

    aiItem.innerHTML = `
        <h3 class="ai-title">${sanitizeHTML(ai.name)}</h3>
        <p class="category-tag">${sanitizeHTML(ai.category)}</p>
        <p class="ai-description">${sanitizeHTML(ai.description)}</p>
        <button class="favorite-btn ${favorites.includes(ai.name) ? 'active' : ''}" title="Agregar a Favoritos">★</button>
        <a href="${sanitizeHTML(ai.link)}" target="_blank" rel="noopener noreferrer">
            <button class="visit-btn">Visitar</button>
        </a>
    `;

    return aiItem;
}

// Sanitizar HTML para evitar ataques XSS
function sanitizeHTML(str) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = str;
    return tempDiv.innerHTML;
}

// Manejar eventos de clic globales
function handleGlobalClickEvents(e) {
    // Manejar el botón de favoritos
    if (e.target.classList.contains('favorite-btn')) {
        const aiName = e.target.closest('.ai-item').querySelector('.ai-title').textContent;
        toggleFavorite(aiName);
    }
}

// Inicializar el sistema de favoritos
function initializeFavoritesSystem() {
    loadFavorites();
    document.addEventListener('click', handleGlobalClickEvents);
}

// Ejecutar la inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', initializeFavoritesSystem);