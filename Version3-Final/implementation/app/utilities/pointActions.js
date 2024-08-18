import Traductor from "../../app/services/traductor.js";

/**
 * Oculta la advertencia de caracteres no válidos cuando se hace clic en cualquier parte del documento.
 */
document.addEventListener('click', () => {
  const warning = document.getElementById("warningCaracteres2");
  warning.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  const ellipses = document.querySelectorAll(".ellipse");
  const output = document.getElementById("output");
  const collectButton = document.getElementById("collectButton");
  const spaceButton = document.getElementById("spaceButton");

  /**
   * Valida el contenido del textarea 'output', asegurándose de que solo contenga caracteres Braille y espacios.
   * Si se detectan caracteres no válidos, los elimina y muestra una advertencia.
   */
  const validateInput = () => {
    const textoBraille = output.value;
    const regex = /^[⠁-⠿\s]*$/; // Solo caracteres braille y espacios
    const warning = document.getElementById("warningCaracteres2");

    if (!regex.test(textoBraille)) {
      output.value = textoBraille.replace(/[^⠁-⠿\s]/g, "");
      warning.classList.remove("hidden");
    }
  };

  /**
   * Maneja el clic en las elipses (simulación de puntos Braille),
   * alternando el estado visual de las elipses pintadas.
   */
  ellipses.forEach((ellipse) => {
    ellipse.addEventListener("click", () => {
      ellipse.classList.toggle("painted");
    });
  });

  /**
   * Recolecta las elipses pintadas y las traduce a un código Braille utilizando la clase Traductor.
   * Agrega el texto Braille resultante al textarea 'output' y valida el contenido.
   */
  collectButton.addEventListener("click", () => {
    const paintedEllipses = [];
    for (let i = 1; i <= 6; i++) {
      const ellipse = document.getElementById(`ellipse-${i}`);
      if (ellipse.classList.contains("painted")) {
        paintedEllipses.push(i);
      }
    }
    const traductor = new Traductor();
    const brailleCode = paintedEllipses.join("");
    const unicodeBraille = traductor.getBrailleUnicode(brailleCode);

    // Agregar el Braille traducido al contenido existente del textarea
    output.value += unicodeBraille + " ";
    validateInput(); // Validar después de agregar el Braille

    // Limpiar las elipses pintadas para la próxima letra
    ellipses.forEach((ellipse) => ellipse.classList.remove("painted"));
  });

  /**
   * Agrega un espacio al textarea 'output' cuando se hace clic en el botón de espacio.
   * Valida el contenido después de agregar el espacio.
   */
  spaceButton.addEventListener("click", () => {
    output.value += " "; // Agregar un espacio al contenido del textarea
    validateInput(); // Validar después de agregar el espacio
  });

  /**
   * Valida el contenido del textarea 'output' en cada cambio de entrada.
   */
  output.addEventListener("input", validateInput);
});

/**
 * Traduce el texto Braille ingresado en el textarea a Español utilizando la clase Traductor.
 * Muestra la traducción en el div con la clase 'respuesta'.
 */
document.getElementById("traducirBoton").addEventListener("click", function () {
  const textoBraille = document.querySelector(".entradaTexto").value;
  const traductor = new Traductor();

  const traduccion = traductor.traducirBrailleAEspanol(textoBraille);

  // Mostrar la traducción en el div con clase 'respuesta'
  document.querySelector(".respuesta").innerText = traduccion;
});
