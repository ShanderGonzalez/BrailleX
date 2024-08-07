//funcion para cambiar el texto en las paginas responsive
function cambiarTextoResponsive() {
    var elemento = document.querySelector('.ConocenosTitulo');
    if (window.innerWidth <= 480) {
      elemento.textContent = '=';
    } else {
      elemento.textContent = 'Conócenos';
    }
  }
document.addEventListener('DOMContentLoaded', cambiarTextoResponsive);
  
window.addEventListener('resize', cambiarTextoResponsive);

//funcion para ajustar el sidebar en las paginas responsive
const sidebar = document.querySelector('.sidebar');
const sidebarParent = sidebar.parentNode;
const sidebarNextSibling = sidebar.nextSibling;
const originalSidebarHTML = sidebar.innerHTML;

function ajustarSidebar() {
  const traduceElement = document.getElementById('traduce');
  
  if (window.innerWidth <= 480) {
    traduceElement.insertAdjacentElement('afterend', sidebar);
  } else {
    if (sidebarNextSibling) {
      sidebarParent.insertBefore(sidebar, sidebarNextSibling);
    } else {
      sidebarParent.appendChild(sidebar);
    }
  }
}

window.addEventListener('DOMContentLoaded', ajustarSidebar);
window.addEventListener('resize', ajustarSidebar);