import Traductor from "../../app/services/traductor.js";

document.addEventListener('click', () => {
  const warning = document.getElementById("warningCaracteres2");
  warning.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  const ellipses = document.querySelectorAll(".ellipse");
  const output = document.getElementById("output");
  const collectButton = document.getElementById("collectButton");
  const spaceButton = document.getElementById("spaceButton");

  const validateInput = () => {
    const textoBraille = output.value;
    const regex = /^[⠁-⠿\s]*$/; // Solo caracteres braille y espacios
    const warning = document.getElementById("warningCaracteres2");

    if (!regex.test(textoBraille)) {
      output.value = textoBraille.replace(/[^⠁-⠿\s]/g, "");
      warning.classList.remove("hidden");
    }
  };

  ellipses.forEach((ellipse) => {
    ellipse.addEventListener("click", () => {
      ellipse.classList.toggle("painted");
    });
  });

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

  spaceButton.addEventListener("click", () => {
    output.value += " "; // Agregar un espacio al contenido del textarea
    validateInput(); // Validar después de agregar el espacio
  });

  output.addEventListener("input", validateInput);
});

document.getElementById("traducirBoton").addEventListener("click", function () {
  const textoBraille = document.querySelector(".entradaTexto").value;
  const traductor = new Traductor();

  const traduccion = traductor.traducirBrailleAEspanol(textoBraille);

  // Mostrar la traducción en el div con clase 'respuesta'
  document.querySelector(".respuesta").innerText = traduccion;
});