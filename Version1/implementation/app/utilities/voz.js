/**
 * voz.js
 * 
 * Este script maneja la funcionalidad de reconocimiento de voz y síntesis de voz
 * para el traductor.
 */

// Sección para el reconocimiento de voz
document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const botonVoz = document.getElementById('BotonVoz');
    const textareaResultado = document.getElementById('entradaTexto');
    let escuchando = false;

    // Verificar compatibilidad con el navegador
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error('El reconocimiento de voz no es compatible con este navegador.');
        return;
    }

    // Configurar reconocimiento de voz
    const reconocimientoVoz = new SpeechRecognition();
    reconocimientoVoz.lang = 'es-ES'; // Configurar el idioma (español)
    reconocimientoVoz.interimResults = false; // Mostrar resultados parciales o no

    // Evento al hacer clic en el botón de voz
    botonVoz.addEventListener('click', () => {
        if (!escuchando) {
            reconocimientoVoz.start(); // Iniciar reconocimiento de voz
            alert('Empiece a hablar. Haga clic de nuevo en el micrófono para detener la escucha.');
            escuchando = true;
        } else {
            reconocimientoVoz.stop(); // Detener reconocimiento de voz
            escuchando = false;
        }
    });

    // Manejar el resultado del reconocimiento de voz
    reconocimientoVoz.onresult = function (event) {
        const resultado = event.results[0][0].transcript;
        console.log('Texto reconocido:', resultado);
        textareaResultado.value = resultado; // Mostrar texto reconocido en el textarea
    };

    // Manejar errores en el reconocimiento de voz
    reconocimientoVoz.onerror = function (event) {
        console.error('Error en el reconocimiento de voz:', event.error);
        escuchando = false;
    };

    // Asegurarse de que el estado de escuchando sea falso cuando se detiene el reconocimiento
    reconocimientoVoz.onend = function () {
        escuchando = false;
    };
});

// Función para leer el texto 
function leerTexto() {
    // Obtener el texto del elemento
    const texto = document.getElementById('textoParaLeer').textContent;
    const synth = window.speechSynthesis;

    if (synth.speaking) {
        synth.cancel();
        alert('Lectura de texto detenida.');
    } else {
        // Crear un nuevo objeto SpeechSynthesisUtterance
        const mensaje = new SpeechSynthesisUtterance();

        // Configurar la voz en español
        mensaje.lang = 'es-ES'; // Español de España

        // Establecer el texto que se va a leer en voz alta
        mensaje.text = texto;

        // Hacer que el navegador hable el texto
        synth.speak(mensaje);
        alert('Leyendo el texto. Haga clic de nuevo para detener.');
    }
}
