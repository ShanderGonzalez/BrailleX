/**
 * Obtiene todos los elementos <textarea> del documento.
 * @type {HTMLCollectionOf<HTMLTextAreaElement>}
 */
const elementos = document.getElementsByTagName('textarea');

/**
 * El elemento HTML que muestra la respuesta.
 * @type {HTMLElement}
 */
const respuesta = document.querySelector('.respuesta');

/**
 * El botón utilizado para limpiar los campos de texto.
 * @type {HTMLButtonElement}
 */
const limpiar = document.getElementById('limpiarBoton');

/**
 * Función que se ejecuta cuando se hace clic en el botón de limpieza.
 * @param {MouseEvent} e - El evento de clic del mouse.
 */
limpiar.onclick = (e) => {
  document.getElementById('descargarPNG').disabled = true;
  document.getElementById('descargarPDF').disabled = true;
  document.getElementById('mirror').checked = false;
  e.preventDefault();
  // Usar for...of para iterar sobre los elementos
  for (const elemento of elementos) {
    elemento.value = '';
  }
  if (respuesta) {
    // Si 'respuesta' es un div, span, etc.
    respuesta.innerHTML = '';
    // Si 'respuesta' es un input o textarea, usa:
    // respuesta.value = '';
  }

  document.getElementsByClassName("ellipse");
  ellipses.forEach((ellipse) => ellipse.classList.remove("painted"));
}