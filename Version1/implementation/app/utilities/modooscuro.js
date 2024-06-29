function injectDarkModeStyles() {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    html, body {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
    }

    img, video, iframe {
        filter: brightness(0.8) !important;
    }

    a {
        color: #bb86fc !important;
    }

    p, h1, h2, h3, h4, h5, h6, span, div, li {
        background-color: inherit !important;
        color: inherit !important;
    }

    input, textarea, select, button {
        background-color: #333333 !important;
        color: #e0e0e0 !important;
        border-color: #444444 !important;
    }

    table, th, td {
        background-color: inherit !important;
        color: inherit !important;
        border-color: #444444 !important;
    }

    * {
        transition: all 0.3s ease !important;
    }
  `;
  document.head.appendChild(style);
}

// Llamar a la función para inyectar el estilo. Esto se puede hacer en respuesta a un evento, como un clic en un botón de alternancia del modo oscuro.
injectDarkModeStyles();