var elementos = document.getElementsByTagName('textarea');
var respuesta = document.querySelector('.respuesta');
var limpiar = document.getElementById('limpiarBoton');

limpiar.onclick = (e) => { 
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
}

