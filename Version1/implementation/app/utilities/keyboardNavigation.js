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
  var descargarPDFBtn = document.getElementById('descargarPDF');
  var conocenosBtn = document.getElementById('conocenosBoton'); 

  descargarPDFBtn.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault(); 
      conocenosBtn.focus(); 
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    var descargarPDFBtn = document.getElementById('respuestaTexto');
    var conocenosBtn = document.getElementById('conocenosBoton'); 
  
    descargarPDFBtn.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault(); 
        conocenosBtn.focus(); 
      }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var descargarPDFBtn = document.querySelector('backButton');
    var conocenosBtn = document.getElementById('conocenosBoton'); 
  
    descargarPDFBtn.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault(); 
        conocenosBtn.focus(); 
      }
    });
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
