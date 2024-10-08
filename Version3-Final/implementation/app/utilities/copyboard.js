/**
 * @fileoverview Función para copiar el contenido de un área de texto y mostrar una alerta.
 * El contenido es copiado al portapapeles y se muestra una alerta temporal en la pantalla.
 */

document.addEventListener('DOMContentLoaded', function () {
    const botonCopiar = document.getElementById('BotonCopiar');

    /**
     * Evento que escucha el clic del botón para copiar el contenido.
     * Se copia el texto del elemento con la clase 'respuesta' y, si es exitoso, 
     * se muestra una alerta de confirmación.
     */
    botonCopiar.addEventListener('click', function () {
        const contenido = document.querySelector('.respuesta').innerText;
        if (contenido.trim().length > 0) {
            navigator.clipboard.writeText(contenido).then(function () {
                mostrarAlerta("Texto copiado al portapapeles");
            }).catch(function (error) {
                console.error('Error al copiar el texto: ', error);
            });
        } else {
            console.log('El contenido está vacío, no se muestra la alerta.');
        }
    });

    /**
     * Muestra una alerta temporal en la pantalla con el mensaje proporcionado.
     * 
     * @param {string} mensaje - El mensaje a mostrar en la alerta.
     */
    function mostrarAlerta(mensaje) {
        let alerta = document.createElement('div');
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

        botonCopiar.appendChild(alerta);

        // Incrementa la opacidad para mostrar la alerta
        setTimeout(function () {
            alerta.style.opacity = '1';
        }, 100);

        // Disminuye la opacidad para ocultar la alerta después de 2 segundos
        setTimeout(function () {
            alerta.style.opacity = '0';
            setTimeout(function () {
                alerta.remove();
            }, 300);
        }, 2000);
    }
});
