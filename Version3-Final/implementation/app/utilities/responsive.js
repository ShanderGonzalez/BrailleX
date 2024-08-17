/**
 * Cambia el texto del botón "Conócenos" a un icono de menú (☰) en pantallas pequeñas (<= 600px),
 * y lo vuelve a su texto original en pantallas más grandes.
 */
function cambiarTextoResponsive() {
  let elemento = document.getElementById("conocenosBoton");
  if (window.innerWidth <= 600) {
    elemento.textContent = "☰";
  } else {
    elemento.textContent = "Conócenos";
  }
}

document.addEventListener("DOMContentLoaded", cambiarTextoResponsive);
window.addEventListener("resize", cambiarTextoResponsive);

/**
 * Ajusta la posición del sidebar en función del tamaño de la ventana.
 * En pantallas pequeñas (<= 600px), mueve el sidebar debajo del elemento con id "traduce".
 * En pantallas más grandes, devuelve el sidebar a su posición original en el DOM.
 */
function ajustarSidebar() {
  const traduceElement = document.getElementById("traduce");

  if (window.innerWidth <= 600) {
    traduceElement.insertAdjacentElement("afterend", sidebar);
  } else if (sidebarNextSibling) {
    sidebarParent.insertBefore(sidebar, sidebarNextSibling);
  } else {
    sidebarParent.appendChild(sidebar);
  }
}

window.addEventListener("DOMContentLoaded", ajustarSidebar);
window.addEventListener("resize", ajustarSidebar);
