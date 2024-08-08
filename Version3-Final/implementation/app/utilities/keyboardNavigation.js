/*funcion para que el checkbox se seleccione con el enter*/
document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          this.checked = !this.checked;
        }
      });
    }
  
    /*funcion para que el boton concenos se seleccione con el enter*/
    const conocenosBoton = document.getElementById("conocenosBoton");
    if (conocenosBoton) {
      conocenosBoton.addEventListener("keyup", function(event) {
        if (event.key === 'Enter') {
          toggleMenu();
        }
      });
  
      conocenosBoton.addEventListener("click", function(event) {
        toggleMenu();
      });
    }
  
    document.addEventListener("click", function(event) {
      const conocenosBoton = document.getElementById("conocenosBoton");
      const opciones = document.querySelector(".ConocenosOpciones");
      if (conocenosBoton && opciones && !conocenosBoton.contains(event.target) && !opciones.contains(event.target)) {
        closeMenu();
      }
    });
  });
  
  function toggleMenu() {
      const opciones = document.querySelector(".ConocenosOpciones");
      const isExpanded = document.getElementById("conocenosBoton").getAttribute("aria-expanded") === "true";
      opciones.style.display = isExpanded ? "none" : "block";
      document.getElementById("conocenosBoton").setAttribute("aria-expanded", isExpanded ? "false" : "true");
  }
  
  function closeMenu() {
      const  opciones = document.querySelector(".ConocenosOpciones");
      opciones.style.display = "none";
      document.getElementById("conocenosBoton").setAttribute("aria-expanded", "false");
  }
  
  /*funcion para hacer la navegacion por teclado un ciclo*/
  document.addEventListener('DOMContentLoaded', function() {
      const conocenosBtn = document.getElementById('conocenosBoton');
      const descargarPDFBtn = document.getElementById('descargarPDF');
  
      if (conocenosBtn && descargarPDFBtn) {
          descargarPDFBtn.addEventListener('keydown', function(event) {
              if (event.key === 'Tab') { // Tab con Shift
                  event.preventDefault();
                  conocenosBtn.focus(); // Enfoca el botón 'conocenosBoton' con Shift + Tab
              }
          });
      } else {
          console.error('No es un error, los divs necesarios estan en la otra pagina');
      }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
      const conocenosBtn = document.getElementById('conocenosBoton');
      const areaRespuesta = document.getElementById('respuestaTexto');
  
      if (conocenosBtn && areaRespuesta) {
          areaRespuesta.addEventListener('keydown', function(event) {
              if (event.key === 'Tab') { 
                  event.preventDefault();
                  conocenosBtn.focus(); 
              }
          });
      } else {
          console.error('No es un error, los divs necesarios estan en la otra pagina');
      }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
      const conocenosBtn = document.getElementById('conocenosBoton');
      const RegresarBtn = document.querySelector('.backButton');
  
      if (conocenosBtn && RegresarBtn) {
          RegresarBtn.addEventListener('keydown', function(event) {
              if (event.key === 'Tab') { 
                  event.preventDefault();
                  conocenosBtn.focus(); 
              }
          });
      } else {
          console.error('No es un error, los divs necesarios estan en la otra pagina');
      }
  });
  
  /*funcion para que las ellipses se pinten cuando se da enter*/
  document.addEventListener('DOMContentLoaded', function () {
      const ellipses = document.querySelectorAll(".ellipse");
  
      ellipses.forEach((ellipse) => {
          ellipse.addEventListener("keyup", (event) => {
              if (event.key === 'Enter') { 
                  ellipse.classList.toggle("painted");
              }
          });
      });
  });