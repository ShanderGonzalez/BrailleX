function zoomIn() {
    const translatedText = document.querySelector('.respuesta');
    const currentSize = window.getComputedStyle(translatedText, null).getPropertyValue('font-size');
    const newSize = parseFloat(currentSize) * 1.1; // Aumenta el tamaño de fuente en un 10%
    translatedText.style.fontSize = newSize + 'px';
  }
  
  function zoomOut() {
    const translatedText = document.querySelector('.respuesta');
    const currentSize = window.getComputedStyle(translatedText, null).getPropertyValue('font-size');
    const newSize = parseFloat(currentSize) / 1.1; // Disminuye el tamaño de fuente en un 10%
    translatedText.style.fontSize = newSize + 'px';
  }

  function zoomIn1() {
    const translatedText = document.getElementById('respuestaTexto');
    const currentSize = window.getComputedStyle(translatedText, null).getPropertyValue('font-size');
    const newSize = parseFloat(currentSize) * 1.1; // Aumenta el tamaño de fuente en un 10%
    translatedText.style.fontSize = newSize + 'px';
  }
  
  function zoomOut1() {
    const translatedText = document.getElementById('respuestaTexto');
    const currentSize = window.getComputedStyle(translatedText, null).getPropertyValue('font-size');
    const newSize = parseFloat(currentSize) / 1.1; // Disminuye el tamaño de fuente en un 10%
    translatedText.style.fontSize = newSize + 'px';
  }