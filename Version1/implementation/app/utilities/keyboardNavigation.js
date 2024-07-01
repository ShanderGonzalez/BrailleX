/*funcion para que el checkbox se seleccione con el enter*/
document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('mirror');

    checkbox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            this.checked = !this.checked;
        }
    });
});

/*funcion para que el boton concenos se seleccione con el enter*/
document.getElementById("conocenosBoton").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { 
        toggleMenu();
    }
});

document.getElementById("conocenosBoton").addEventListener("click", function(event) {
    toggleMenu();
});

document.addEventListener("click", function(event) {
    var conocenosBoton = document.getElementById("conocenosBoton");
    var opciones = document.querySelector(".ConocenosOpciones");
    if (!conocenosBoton.contains(event.target) && !opciones.contains(event.target)) {
        closeMenu();
    }
});

function toggleMenu() {
    var opciones = document.querySelector(".ConocenosOpciones");
    var isExpanded = document.getElementById("conocenosBoton").getAttribute("aria-expanded") === "true";
    opciones.style.display = isExpanded ? "none" : "block";
    document.getElementById("conocenosBoton").setAttribute("aria-expanded", isExpanded ? "false" : "true");
}

function closeMenu() {
    var opciones = document.querySelector(".ConocenosOpciones");
    opciones.style.display = "none";
    document.getElementById("conocenosBoton").setAttribute("aria-expanded", "false");
}

/*funcion para hacer la navegacion por teclado un ciclo*/
document.addEventListener('DOMContentLoaded', function() {
    var conocenosBtn = document.getElementById('conocenosBoton');
    var descargarPDFBtn = document.getElementById('descargarPDF');

    if (conocenosBtn && descargarPDFBtn) {
        descargarPDFBtn.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') { // Tab con Shift
                event.preventDefault();
                conocenosBtn.focus(); // Enfoca el botón 'conocenosBoton' con Shift + Tab
            }
        });
    } else {
        console.error('El ID esta en otra pagina tranqui');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var conocenosBtn = document.getElementById('conocenosBoton');
    var areaRespuesta = document.getElementById('respuestaTexto');

    if (conocenosBtn && areaRespuesta) {
        areaRespuesta.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') { 
                event.preventDefault();
                conocenosBtn.focus(); 
            }
        });
    } else {
        console.error('El ID esta en otra pagina tranqui');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var conocenosBtn = document.getElementById('conocenosBoton');
    var RegresarBtn = document.querySelector('backButton');

    if (conocenosBtn && RegresarBtn) {
        RegresarBtn.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') { 
                event.preventDefault();
                conocenosBtn.focus(); 
            }
        });
    } else {
        console.error('El ID esta en otra pagina tranqui');
    }
});


/*funcion para que las ellipses se pinten cuando se da enter*/
document.addEventListener('DOMContentLoaded', function () {
    const ellipses = document.querySelectorAll(".ellipse");

    ellipses.forEach((ellipse) => {
        ellipse.addEventListener("click", () => {
            ellipse.classList.toggle("painted");
        });

        ellipse.addEventListener("keyup", (event) => {
            if (event.key === 'Enter' || event.keyCode === 13) { 
                ellipse.classList.toggle("painted");
            }
        });
    });
});
