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
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Función para obtener una cookie
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
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
