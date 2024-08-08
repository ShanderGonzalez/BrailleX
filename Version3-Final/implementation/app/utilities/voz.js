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
    let alertaVoz;

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
            escuchando = true;
            alertaVoz = mostrarAlerta("Empiece a hablar. Haga clic de nuevo en el micrófono para detener la escucha.");
        } else {
            reconocimientoVoz.stop(); // Detener reconocimiento de voz
            escuchando = false;
            if (alertaVoz) {
                alertaVoz.remove();
            }
            mostrarAlertaTemporal("Escucha detenida.");
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
        if (alertaVoz) {
            alertaVoz.remove();
        }
        mostrarAlertaTemporal("Error en el reconocimiento de voz.");
    };

    // Asegurarse de que el estado de escuchando sea falso cuando se detiene el reconocimiento
    reconocimientoVoz.onend = function () {
        if (escuchando) {
            reconocimientoVoz.start(); // Reiniciar el reconocimiento de voz si no se ha detenido manualmente
        }
    };

});

// Función para leer el texto 
function leerTexto() {
    // Obtener el texto del elemento
    const texto = document.getElementById('respuestaTexto').textContent;
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
        mostrarAlertaTemporal('Leyendo el texto. Haga clic de nuevo para detener.');
    }
}

// Función para mostrar alerta personalizada persistente
function mostrarAlerta(mensaje) {
    const alerta = document.createElement('div');
    alerta.textContent = mensaje;
    alerta.style.position = 'fixed';
    alerta.style.left = '50%';
    alerta.style.top = '1px';
    alerta.style.transform = 'translateX(-50%)';
    alerta.style.backgroundColor = '#5BC1FB';
    alerta.style.color = '#000';
    alerta.style.fontWeight = 'bold'; 
    alerta.style.padding = '10px 20px';
    alerta.style.borderRadius = '5px';
    alerta.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    alerta.style.zIndex = '9999';
    alerta.style.opacity = '0';
    alerta.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(alerta);

    setTimeout(function() {
        alerta.style.opacity = '1';
    }, 100);

    return alerta;
}

// Función para mostrar alerta temporal
function mostrarAlertaTemporal(mensaje) {
    const alerta = document.createElement('div');
    alerta.textContent = mensaje;
    alerta.style.position = 'fixed';
    alerta.style.left = '50%';
    alerta.style.top = '1px';
    alerta.style.transform = 'translateX(-50%)';
    alerta.style.backgroundColor = '#5BC1FB';
    alerta.style.color = '#000';
    alerta.style.fontWeight = 'bold'; 
    alerta.style.padding = '10px 20px';
    alerta.style.borderRadius = '5px';
    alerta.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    alerta.style.zIndex = '9999';
    alerta.style.opacity = '0';
    alerta.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(alerta);

    setTimeout(function() {
        alerta.style.opacity = '1';
    }, 100);

    setTimeout(function() {
        alerta.style.opacity = '0';
        setTimeout(function() {
            alerta.remove();
        }, 300);
    }, 2000);
}
