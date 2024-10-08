/**
 * @fileoverview Varias funciones relacionadas con la accesibilidad y el manejo de eventos de teclado, 
 * incluyendo la selección de checkboxes y botones con la tecla Enter, navegación por teclado cíclica, 
 * y cambio de color de elementos al presionar Enter.
 */

document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('input[type="checkbox"]');

    /**
     * Evento para permitir seleccionar o deseleccionar un checkbox con la tecla Enter.
     * 
     * @param {KeyboardEvent} event - El evento del teclado que es activado.
     */
    if (checkbox) {
        checkbox.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.checked = !this.checked;
            }
        });
    }

    const conocenosBoton = document.getElementById("conocenosBoton");

    /**
     * Evento que permite activar el botón "Conócenos" con la tecla Enter o con un clic.
     * 
     * @param {KeyboardEvent | MouseEvent} event - El evento que dispara la acción.
     */
    if (conocenosBoton) {
        conocenosBoton.addEventListener("keyup", function (event) {
            if (event.key === 'Enter') {
                toggleMenu();
            }
        });

        conocenosBoton.addEventListener("click", function (event) {
            toggleMenu();
        });
    }

    /**
     * Evento que cierra el menú "Conócenos" al hacer clic fuera del botón o de las opciones.
     * 
     * @param {MouseEvent} event - El evento que captura el clic en el documento.
     */
    document.addEventListener("click", function (event) {
        const conocenosBoton = document.getElementById("conocenosBoton");
        const opciones = document.querySelector(".ConocenosOpciones");
        if (conocenosBoton && opciones && !conocenosBoton.contains(event.target) && !opciones.contains(event.target)) {
            closeMenu();
        }
    });
});

/**
 * Función que alterna la visualización del menú "Conócenos" y actualiza el estado del atributo aria-expanded.
 */
function toggleMenu() {
    const opciones = document.querySelector(".ConocenosOpciones");
    const isExpanded = document.getElementById("conocenosBoton").getAttribute("aria-expanded") === "true";
    opciones.style.display = isExpanded ? "none" : "block";
    document.getElementById("conocenosBoton").setAttribute("aria-expanded", isExpanded ? "false" : "true");
}

/**
 * Función que cierra el menú "Conócenos" y actualiza el estado del atributo aria-expanded a "false".
 */
function closeMenu() {
    const opciones = document.querySelector(".ConocenosOpciones");
    opciones.style.display = "none";
    document.getElementById("conocenosBoton").setAttribute("aria-expanded", "false");
}

/**
 * Evento que crea una navegación cíclica por teclado entre los botones del documento.
 */
document.addEventListener('DOMContentLoaded', function () {
    const conocenosBtn = document.getElementById('conocenosBoton');
    const descargarPDFBtn = document.getElementById('descargarPDF');

    if (conocenosBtn && descargarPDFBtn) {
        descargarPDFBtn.addEventListener('keydown', function (event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                conocenosBtn.focus(); // Enfoca el botón 'conocenosBoton' con Shift + Tab
            }
        });
    } else {
        console.error('No es un error, los divs necesarios están en la otra página');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const conocenosBtn = document.getElementById('conocenosBoton');
    const areaRespuesta = document.getElementById('respuestaTexto');

    /**
     * Evento que permite la navegación por teclado para enfocar el botón "Conócenos" 
     * al presionar la tecla Tab en el área de respuesta.
     */
    if (conocenosBtn && areaRespuesta) {
        areaRespuesta.addEventListener('keydown', function (event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                conocenosBtn.focus();
            }
        });
    } else {
        console.error('No es un error, los divs necesarios están en la otra página');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const conocenosBtn = document.getElementById('conocenosBoton');
    const RegresarBtn = document.querySelector('.backButton');

    /**
     * Evento que permite la navegación por teclado para enfocar el botón "Conócenos" 
     * al presionar la tecla Tab en el botón "Regresar".
     */
    if (conocenosBtn && RegresarBtn) {
        RegresarBtn.addEventListener('keydown', function (event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                conocenosBtn.focus();
            }
        });
    } else {
        console.error('No es un error, los divs necesarios están en la otra página');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const ellipses = document.querySelectorAll(".ellipse");

    /**
     * Evento que permite cambiar el color de las elipses al presionar la tecla Enter.
     * 
     * @param {KeyboardEvent} event - El evento del teclado que es activado.
     */
    ellipses.forEach((ellipse) => {
        ellipse.addEventListener("keyup", (event) => {
            if (event.key === 'Enter') {
                ellipse.classList.toggle("painted");
            }
        });
    });
});
