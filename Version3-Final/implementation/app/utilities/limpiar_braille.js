/**
 * Obtiene todos los elementos <textarea> del documento.
 * @type {HTMLCollectionOf<HTMLTextAreaElement>}
 */
var elementos = document.getElementsByTagName("textarea");

/**
 * El elemento HTML que muestra la respuesta.
 * @type {HTMLElement}
 */
var respuesta = document.querySelector(".respuesta");

/**
 * El botón utilizado para limpiar los campos de texto.
 * @type {HTMLButtonElement}
 */
var limpiar = document.getElementById("limpiarBoton");

/**
 * Función que se ejecuta cuando se hace clic en el botón de limpieza.
 * @param {MouseEvent} e - El evento de clic del mouse.
 */
limpiar.onclick = (e) => {
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
};
