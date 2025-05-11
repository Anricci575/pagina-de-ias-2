var root = {
  wavecolor: {  
    r: 0,    // Rojo: 0 (sin rojo)
    g: 100,  // Verde: oscuro (100)
    b: 0     // Azul: 0 (sin azul)
  },
  rainbowSpeed: 0.5,
  rainbow: false,
  matrixspeed: 50
};

var c = document.getElementById("c");
var ctx = c.getContext("2d");

// Variables para control de redimensionamiento
var resizeTimeout;
var isResizing = false;

// Función optimizada para manejar redimensionamiento
function handleResize() {
    // Guarda el estado actual de las gotas
    const oldColumns = Math.floor(c.width / font_size);
    const oldDrops = [...drops];
    
    // Actualiza dimensiones del canvas
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    
    // Calcula nuevas columnas
    const newColumns = Math.floor(c.width / font_size);
    
    // Preserva las gotas existentes
    drops = [];
    for (let x = 0; x < newColumns; x++) {
        if (x < oldColumns && x < oldDrops.length) {
            // Mantiene la posición Y de las gotas existentes
            drops[x] = oldDrops[x];
        } else {
            // Añade nuevas gotas con posición aleatoria
            drops[x] = Math.floor(Math.random() * -20);
        }
    }
    
    isResizing = false;
}

// Configuración inicial del canvas
function initCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    font_size = 14;
    columns = Math.floor(c.width / font_size);
    
    drops = [];
    for (var x = 0; x < columns; x++) {
        drops[x] = Math.floor(Math.random() * -10); // Inicio aleatorio para efecto lluvia
    }
}

var hueFw = false;
var hue = -0.01;
var characters = "゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ0123456789".split("");
var font_size, columns, drops;

// Inicialización
initCanvas();

// Función de dibujo optimizada
function draw() {
    if (isResizing) return; // Pausa la animación durante redimensionamiento
    
    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.font = font_size + "px arial";

    for (var i = 0; i < drops.length; i++) {
        // Solo dibuja si está dentro del canvas visible
        if (i * font_size > c.width) continue;
        
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
        
        var text = characters[Math.floor(Math.random() * characters.length)];
        
        if (root.rainbow) {
            hue += (hueFw) ? 0.01 : -0.01;
            var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
            var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
            var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
            ctx.fillStyle = 'rgba(' + rr + ',' + rg + ',' + rb + ')';
        } else {
            ctx.fillStyle = 'rgba(' + root.wavecolor.r + ',' + root.wavecolor.g + ',' + root.wavecolor.b + ')';
        }

        ctx.fillText(text, i * font_size, drops[i] * font_size);
        drops[i]++;
        
        // Reinicio más suave con mayor aleatoriedad
        if (drops[i] * font_size > c.height) {
            drops[i] = Math.random() > 0.97 ? 0 : -Math.floor(Math.random() * 30);
        }
    }
}

// Event listeners mejorados
window.addEventListener('resize', () => {
    isResizing = true;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 100);
});

window.addEventListener('load', initCanvas);

// Sistema de animación mejorado
let lastTime = 0;
function animate(currentTime) {
    const deltaTime = currentTime - lastTime;
    if (deltaTime > root.matrixspeed) {
        draw();
        lastTime = currentTime;
    }
    requestAnimationFrame(animate);
}
animate();

// Resto de funciones permanecen igual
function livelyPropertyListener(name, val) {
    switch(name) {
        case "matrixColor": root.wavecolor = hexToRgb(val); break;
        case "rainBow": root.rainbow = val; break;   
        case "rainbowSpeed": root.rainbowSpeed = val/100; break;     
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

