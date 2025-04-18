// Lista de IAs dinámicas con categorías
const ais = [
    {
        name: "Deepseek",
        description: "IA especializada en búsqueda avanzada y análisis de datos en tiempo real.",
        link: "https://www.deepseek.com/",
        category: "Búsqueda y Análisis"
    },
    {
        name: "Copilot",
        description: "IA de GitHub para asistencia en codificación y generación de código en tiempo real.",
        link: "https://copilot.github.com/",
        category: "Programación"
    },
    {
        name: "Blackbox",
        description: "IA que convierte descripciones en texto en código y facilita la programación.",
        link: "https://www.blackbox.ai/",
        category: "Programación"
    },
    {
        name: "ChatGPT",
        description: "IA de OpenAI diseñada para mantener conversaciones naturales y responder preguntas.",
        link: "https://chat.openai.com/",
        category: "Chatbots"
    },
    {
        name: "Géminis",
        description: "IA de Google enfocada en combinar capacidades de búsqueda avanzada con respuestas generativas.",
        link: "https://gemini.google.com/app?hl=es",
        category: "Chatbots"
    },
    {
        name: "Phind.com",
        description: "IA para programadores que responde preguntas técnicas con resultados precisos.",
        link: "https://www.phind.com/",
        category: "Programación"
    },
    {
        name: "Replit.com",
        description: "IA que permite a los desarrolladores escribir, depurar y ejecutar código directamente desde el navegador.",
        link: "https://www.replit.com/",
        category: "Programación"
    },
    {
        name: "Leonardo AI",
        description: "IA diseñada para generar imágenes y arte con calidad profesional basado en descripciones.",
        link: "https://leonardo.ai",
        category: "Generación de Imágenes"
    },
    {
        name: "Notion AI",
        description: "IA integrada en Notion que ayuda a generar contenido, resumir notas y organizar ideas eficientemente.",
        link: "https://www.notion.so/product/ai",
        category: "Productividad"
    },
    {
        name: "Runway ML",
        description: "Plataforma para la creación de contenido visual con IA.",
        link: "https://runwayml.com/",
        category: "Generación de Imágenes"
    },
    {
        name: "Mubert",
        description: "Generador de música AI en tiempo real.",
        link: "https://mubert.com/",
        category: "Generación de Audio"
    },
    {
        name: "Fotor AI",
        description: "Herramienta de diseño gráfico con IA para creación y edición de imágenes.",
        link: "https://www.fotor.com/features/ai-image-generator/",
        category: "Generación de Imágenes"
    },
    {
        name: "Lumen5",
        description: "IA que convierte texto en vídeos automáticamente.",
        link: "https://www.lumen5.com/",
        category: "Generación de Video"
    },
    {
        name: "Pictory",
        description: "IA que convierte texto en resúmenes visuales en video.",
        link: "https://pictory.ai/",
        category: "Generación de Video"
    },
    {
        name: "Synthesia",
        description: "Plataforma para crear videos con avatares generados por IA.",
        link: "https://www.synthesia.io/",
        category: "Generación de Video"
    },
    {
        name: "Jasper",
        description: "Generador de contenido escrito utilizando IA.",
        link: "https://www.jasper.ai/",
        category: "Generación de Texto"
    },
    {
        name: "DeepL",
        description: "Traductor automático de alta calidad.",
        link: "https://www.deepl.com/translator",
        category: "Traducción"
    },
    {
        name: "Descript",
        description: "IA para transcripción de audio y video.",
        link: "https://www.descript.com/",
        category: "Procesamiento de Audio"
    },
    {
        name: "Speechify",
        description: "Convierte texto a voz con voces naturales.",
        link: "https://speechify.com/",
        category: "Texto a Voz"
    },
    {
        name: "AI Dungeon",
        description: "Juego interactivo generado por IA.",
        link: "https://play.aidungeon.io/",
        category: "Entretenimiento"
    },
    {
        name: "Copy.ai",
        description: "Generador de textos creativos con IA.",
        link: "https://www.copy.ai/",
        category: "Generación de Texto"
    },
    {
        name: "Whisper",
        description: "Sistema de transcripción de audio creado por OpenAI.",
        link: "https://openai.com/research/whisper",
        category: "Procesamiento de Audio"
    },
    {
        name: "Humata",
        description: "IA para interactuar con documentos y responder preguntas.",
        link: "https://www.humata.ai/",
        category: "Búsqueda y Análisis"
    },
    {
        name: "Tabnine",
        description: "IA de autocompletado de código para desarrolladores.",
        link: "https://www.tabnine.com/",
        category: "Programación"
    }
];

// Función para crear filtros de categoría
function createCategoryFilters() {
    const categories = [...new Set(ais.map(ai => ai.category))];
    const filterContainer = document.createElement("div");
    filterContainer.classList.add("category-filters");
    
    // Crear botón "Todos"
    const allButton = document.createElement("button");
    allButton.textContent = "Todos";
    allButton.classList.add("filter-btn", "active");
    allButton.addEventListener("click", () => filterAIsByCategory(null));
    filterContainer.appendChild(allButton);
    
    // Crear botones para cada categoría
    categories.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.classList.add("filter-btn");
        button.addEventListener("click", () => filterAIsByCategory(category));
        filterContainer.appendChild(button);
    });
    
    // Insertar antes de la lista de IAs
    const aiListElement = document.getElementById("aiList");
    if (aiListElement) {
        aiListElement.parentNode.insertBefore(filterContainer, aiListElement);
    }
}

// Función para filtrar IAs por categoría
function filterAIsByCategory(category) {
    const aiItems = document.querySelectorAll(".ai-item");
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    // Actualizar botones activos
    filterButtons.forEach(btn => {
        btn.classList.toggle("active", 
            (btn.textContent === "Todos" && category === null) || 
            btn.textContent === category
        );
    });
    
    // Mostrar/ocultar elementos según categoría
    aiItems.forEach(item => {
        const shouldShow = category === null || 
                         item.getAttribute("data-category") === category;
        item.style.display = shouldShow ? "flex" : "none";
    });
}

function createAIItem(ai) {
    const aiItem = document.createElement("div");
    aiItem.classList.add("ai-item");
    aiItem.setAttribute("data-category", ai.category);
    
    aiItem.innerHTML = `
        <h3>${sanitizeHTML(ai.name)}</h3>
        <p class="category-tag">${sanitizeHTML(ai.category)}</p>
        <p>${sanitizeHTML(ai.description)}</p>
        <a href="${sanitizeHTML(ai.link)}" target="_blank" rel="noopener noreferrer">
            <button class="btn">Ver más</button>
        </a>
    `;
    return aiItem;
}

function sanitizeHTML(str) {
    const tempDiv = document.createElement("div");
    tempDiv.textContent = str;
    return tempDiv.innerHTML;
}

function loadAIs() {
    const aiListElement = document.getElementById("aiList");

    if (!aiListElement) {
        console.error("Elemento con ID 'aiList' no encontrado. Verifica tu HTML.");
        return;
    }

    ais.forEach(ai => {
        const aiItem = createAIItem(ai);
        aiListElement.appendChild(aiItem);
    });
}

function generateSummary() {
    const summaryContent = document.getElementById("summaryContent");

    if (!summaryContent) {
        console.error("Elemento con ID 'summaryContent' no encontrado.");
        return;
    }

    // Generar tabla dinámica
    const table = document.createElement("table");
    table.classList.add("ai-summary-table");

    // Crear encabezados
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>Nombre</th>
        <th>Categoría</th>
        <th>Descripción</th>
        <th>Enlace</th>
    `;
    table.appendChild(headerRow);

    // Crear filas para cada IA
    ais.forEach(ai => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${sanitizeHTML(ai.name)}</td>
            <td>${sanitizeHTML(ai.category)}</td>
            <td>${sanitizeHTML(ai.description)}</td>
            <td><a href="${sanitizeHTML(ai.link)}" target="_blank" rel="noopener noreferrer">Visitar</a></td>
        `;
        table.appendChild(row);
    });

    summaryContent.appendChild(table);
}

// Configuración del canvas y partículas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 200;

const mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Interacción con el mouse
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
            this.size = Math.min(this.size + 1, 6);
        } else {
            this.size = Math.max(this.size - 0.1, 1);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }

        const dxMouse = particles[a].x - mouse.x;
        const dyMouse = particles[a].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distMouse / 150})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

function initializePage() {
    createCategoryFilters();
    loadAIs();
    generateSummary();
    initParticles();
    animateParticles();
}

window.addEventListener("DOMContentLoaded", initializePage);