/**
 * Aumenta el tamaño de la fuente del elemento con la clase 'respuesta' en un 10%.
 */
function zoomIn() {
  const translatedText = document.querySelector('.respuesta');
  const currentSize = window.getComputedStyle(translatedText, null).getPropertyValue('font-size');
  const newSize = parseFloat(currentSize) * 1.1; // Aumenta el tamaño de fuente en un 10%
  translatedText.style.fontSize = newSize + 'px';
}

/**
* Disminuye el tamaño de la fuente del elemento con la clase 'respuesta' en un 10%.
*/
function zoomOut() {
  const translatedText = document.querySelector('.respuesta');
  const currentSize = window.getComputedStyle(translatedText, null).getPropertyValue('font-size');
  const newSize = parseFloat(currentSize) / 1.1; // Disminuye el tamaño de fuente en un 10%
  translatedText.style.fontSize = newSize + 'px';
}

/**
* Aumenta el tamaño de la fuente del elemento con el id 'respuestaTexto' en un 10%.
*/
function zoomIn1() {
  const translatedText = document.getElementById('respuestaTexto');
  const currentSize = window.getComputedStyle(translatedText, null).getPropertyValue('font-size');
  const newSize = parseFloat(currentSize) * 1.1; // Aumenta el tamaño de fuente en un 10%
  translatedText.style.fontSize = newSize + 'px';
}

/**
* Disminuye el tamaño de la fuente del elemento con el id 'respuestaTexto' en un 10%.
*/
function zoomOut1() {
  const translatedText = document.getElementById('respuestaTexto');
  const currentSize = window.getComputedStyle(translatedText, null).getPropertyValue('font-size');
  const newSize = parseFloat(currentSize) / 1.1; // Disminuye el tamaño de fuente en un 10%
  translatedText.style.fontSize = newSize + 'px';
}
