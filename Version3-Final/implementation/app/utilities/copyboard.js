/*funcion para copiar el contenido del area de texto y mostrar una alerta*/
document.addEventListener('DOMContentLoaded', function() {
    var botonCopiar = document.getElementById('BotonCopiar');

    botonCopiar.addEventListener('click', function() {
        var contenido = document.querySelector('.respuesta').innerText;
        if (contenido.trim().length > 0) { 
            navigator.clipboard.writeText(contenido).then(function() {
                mostrarAlerta("Texto copiado al portapapeles");
            }).catch(function(error) {
                console.error('Error al copiar el texto: ', error);
            });
        } else {
            console.log('El contenido está vacío, no se muestra la alerta.');
        }
    });


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
});