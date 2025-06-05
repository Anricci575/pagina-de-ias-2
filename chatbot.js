document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  // === Configuración ===
  const API_KEY = "AIzaSyDGCTrpxGVVa4Ce2yaIlAlQaUNUrsEVxDk"; // Reemplaza con tu propia API Key si es necesario
  const MODEL_NAME = "gemini-1.5-flash-latest";

  // === Historial de conversación (si deseas mantener el contexto) ===
  const history = [];

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Mostrar mensaje del usuario
    appendMessage('user', message);
    userInput.value = '';

    // Agregar al historial
    history.push({ role: 'user', parts: [{ text: message }] });

    try {
      const loadingId = showLoading();

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: history
          })
        }
      );

      const data = await response.json();
      removeLoading(loadingId);

      if (!response.ok || !data.candidates || !data.candidates.length) {
        throw new Error(data.error?.message || "Error en la respuesta del modelo");
      }

      const botResponse = data.candidates[0].content.parts[0].text;

      // Mostrar respuesta
      appendMessage('bot', botResponse);

      // Agregar respuesta del bot al historial
      history.push({ role: 'model', parts: [{ text: botResponse }] });

    } catch (error) {
      removeLoading();
      appendMessage('error', `Error: ${error.message}`);
    }
  }

  // Agrega mensaje al chat
  function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<span>${sender === 'user' ? 'Tú' : 'IA'}:</span> ${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Indicador de "pensando..."
  function showLoading() {
    const id = "loading-" + Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.id = id;
    loadingDiv.className = 'message loading';
    loadingDiv.textContent = "IA está pensando...";
    chatBox.appendChild(loadingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return id;
  }

  function removeLoading(id) {
    const element = document.getElementById(id);
    if (element) element.remove();
  }

  // Event listeners
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});
