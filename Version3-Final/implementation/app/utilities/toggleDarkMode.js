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

/*CON COOKIES PARA GUARDAR EL MODO OSCURO*/
document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('darkModeToggle');

  // Función para establecer una cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Función para obtener una cookie
   function getCookie(name) {
      let nameEQ = name + "=";
      let ca = document.cookie.split(';');
      for (let c of ca) {
          c = c.trim();
          if (c.startsWith(nameEQ)) return c.substring(nameEQ.length);
      }
      return null;
  }

  // Aplicar el modo oscuro basado en la cookie al cargar la página
  function applyDarkModeFromCookie() {
    const darkMode = getCookie('darkMode');
    if (darkMode === 'enabled') {
      document.body.classList.add('dark-mode');
      toggleSwitch.checked = true;
    }
  }

  // Llamar a la función al cargar para aplicar el modo oscuro si es necesario
  applyDarkModeFromCookie();

  toggleSwitch.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    if (this.checked) {
      setCookie('darkMode', 'enabled', 7); 
    } else {
      setCookie('darkMode', 'disabled', 7);
    }
  });
});