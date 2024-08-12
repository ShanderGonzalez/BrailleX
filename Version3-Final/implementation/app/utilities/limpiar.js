/**
 * Obtiene todos los elementos <textarea> del documento.
 * @type {HTMLCollectionOf<HTMLTextAreaElement>}
 */
<<<<<<< HEAD
var elementos = document.getElementsByTagName("textarea");
=======
var elementos = document.getElementsByTagName('textarea');
>>>>>>> 091bd9996f54da4b007d105c26978861f441eddc

/**
 * El elemento HTML que muestra la respuesta.
 * @type {HTMLElement}
 */
<<<<<<< HEAD
var respuesta = document.querySelector(".respuesta");
=======
var respuesta = document.querySelector('.respuesta');
>>>>>>> 091bd9996f54da4b007d105c26978861f441eddc

/**
 * El botón utilizado para limpiar los campos de texto.
 * @type {HTMLButtonElement}
 */
<<<<<<< HEAD
var limpiar = document.getElementById("limpiarBoton");
=======
var limpiar = document.getElementById('limpiarBoton');
>>>>>>> 091bd9996f54da4b007d105c26978861f441eddc

/**
 * Función que se ejecuta cuando se hace clic en el botón de limpieza.
 * @param {MouseEvent} e - El evento de clic del mouse.
 */
limpiar.onclick = (e) => {
<<<<<<< HEAD
  document.getElementById("descargarPNG").disabled = true;
  document.getElementById("descargarPDF").disabled = true;
  document.getElementById("mirror").checked = false;
  e.preventDefault();
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].value = "";
  }
  if (respuesta) {
    // Si 'respuesta' es un div, span, etc.
    respuesta.innerHTML = "";
    // Si 'respuesta' es un input o textarea, usa:
    // respuesta.value = '';
  }
  document.getElementsByClassName("ellipse");
  ellipses.forEach((ellipse) => ellipse.classList.remove("painted"));
};
=======
  document.getElementById('descargarPNG').disabled = true;
  document.getElementById('descargarPDF').disabled = true;
  document.getElementById('mirror').checked = false;
  e.preventDefault();
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].value = '';
  }
  if (respuesta) {
    // Si 'respuesta' es un div, span, etc.
    respuesta.innerHTML = '';
    // Si 'respuesta' es un input o textarea, usa:
    // respuesta.value = '';
  }

  ellipses.forEach((ellipse) => ellipse.classList.remove("painted"));
}

>>>>>>> 091bd9996f54da4b007d105c26978861f441eddc
