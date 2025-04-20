// Función de búsqueda en la lista de IAs
function setupSearchBar() {
    const searchInput = document.getElementById("search-input");
    const aiListElement = document.getElementById("aiList");
    const allAIItems = Array.from(aiListElement.getElementsByClassName("ai-item"));

    if (!searchInput || !aiListElement) {
        console.error("No se encontró el elemento de la barra de búsqueda o la lista de IAs.");
        return;
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();

        // Filtrar las IAs según el texto ingresado
        allAIItems.forEach(item => {
            const name = item.querySelector("h3").textContent.toLowerCase();
            const description = item.querySelector("p:not(.category-tag)").textContent.toLowerCase();

            const matchesQuery = name.includes(query) || description.includes(query);
            item.style.display = matchesQuery ? "flex" : "none";
        });
    });
}

// Llamar a la configuración de la barra de búsqueda después de cargar las IAs
window.addEventListener("DOMContentLoaded", () => {
    setupSearchBar();
});