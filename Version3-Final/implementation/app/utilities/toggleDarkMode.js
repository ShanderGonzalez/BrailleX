// toggleDarkMode.js

/*SIN COOKIES PARA GUARDAR EL MODO OSCURO*/
// document.addEventListener('DOMContentLoaded', () => {
//     const toggleSwitch = document.getElementById('darkModeToggle');
//     toggleSwitch.addEventListener('change', function() {
//       document.body.classList.toggle('dark-mode', this.checked);
//       // Aquí puedes añadir o quitar la clase 'dark-mode' de otros elementos si es necesario
//     });
//   });
// toggleDarkMode.js

/**
 * @fileoverview Manejo del modo oscuro con almacenamiento de preferencia en cookies. 
 * Permite activar o desactivar el modo oscuro y recordar la elección del usuario mediante cookies.
 */

document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('darkModeToggle');

  /**
   * Establece una cookie en el navegador.
   * 
   * @param {string} name - El nombre de la cookie.
   * @param {string} value - El valor de la cookie.
   * @param {number} days - La duración de la cookie en días.
   */
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  /**
   * Obtiene el valor de una cookie específica.
   * 
   * @param {string} name - El nombre de la cookie a obtener.
   * @returns {string|null} - El valor de la cookie o null si no existe.
   */
  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let c of ca) {
      c = c.trim();
      if (c.startsWith(nameEQ)) {
        return c.substring(nameEQ.length);
      }
    }
    return null;
  }

  /**
   * Aplica el modo oscuro según el valor almacenado en la cookie 'darkMode'.
   * Si la cookie indica que el modo oscuro está habilitado, lo activa y ajusta el interruptor.
   */
  function applyDarkModeFromCookie() {
    const darkMode = getCookie('darkMode');
    if (darkMode === 'enabled') {
      document.body.classList.add('dark-mode');
      toggleSwitch.checked = true;
    }
  }

  // Llamar a la función al cargar para aplicar el modo oscuro si es necesario
  applyDarkModeFromCookie();

  /**
   * Evento para alternar el modo oscuro cuando el usuario cambia el estado del interruptor.
   * Guarda la preferencia del usuario en una cookie que dura 7 días.
   */
  toggleSwitch.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
    if (this.checked) {
      setCookie('darkMode', 'enabled', 7); // Habilitar modo oscuro y guardar en cookies
    } else {
      setCookie('darkMode', 'disabled', 7); // Deshabilitar modo oscuro y guardar en cookies
    }
  });
});
