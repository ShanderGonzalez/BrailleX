import BrailleDictionary from "../utilities/dictionary.js";
import Validator from "./validate.js";

class Traductor {
  constructor() {
    this.diccionarioBraille = new BrailleDictionary();
    this.validador = new Validator();
  }

  traducirEspanolABraille(texto) {
    let lineas = texto.split("\n");
    let brailleTexto = "";

    for (let linea of lineas) {
      brailleTexto += this.traducirLineaABraille(linea) + "\n";
    }

    const textoBrailleFormateado = brailleTexto
      .split(" ")
      .map((braille) => {
        return braille + " ";
      })
      .join("");

    const brailleUnicode = this.getBrailleUnicode(textoBrailleFormateado);
    return brailleUnicode.trim();
  }

  traducirEspanolABrailleInverso(texto) {
    let lineas = texto.split("\n");
    let brailleTexto = "";

    for (let linea of lineas) {
      brailleTexto += this.traducirLineaABraille(linea) + "\n";
    }

    const textoBrailleFormateado2 = brailleTexto
      .split(" ")
      .reverse() // Reverse the order of Braille codes for inverse output
      .map((braille) => {
        return this.reordenarPuntosBraille(braille) + " "; // Reverse dot positions within each character
      })
      .join("");

    const brailleUnicode2 = this.getBrailleUnicode(textoBrailleFormateado2);
    return brailleUnicode2.trim();
  }

  reordenarPuntosBraille(brailleCode) {
    const inversionMap = {
      1: "4",
      2: "5",
      3: "6",
      4: "1",
      5: "2",
      6: "3",
    };

    let brailleArray = brailleCode.replace(/\s/g, "").split("");
    let invertedBrailleArray = brailleArray.map(
      (dot) => inversionMap[dot] || dot
    );
    let reversedBrailleCode = invertedBrailleArray.join("");

    return reversedBrailleCode;
  }

  traducirLineaABraille(texto) {
    let brailleTexto = "";
    let esNumero = false;
    let esNumComp = false;

    let palabras = texto.split(" ");
    for (let palabra of palabras) {
      if (palabra === palabra.toUpperCase() && palabra.match(/[a-zA-Z]/)) {
        brailleTexto += " 46 46";
      }
      if (
        this.validador.validarCorreo(palabra) ||
        this.validador.validarURL(palabra) ||
        this.validador.validarEtiqueta(palabra)
      ) {
        esNumComp = true;
      }
      esNumero = false;
      let i = 0;
      while (i < palabra.length) {
        let caracter = palabra[i];

        if (caracter >= "0" && caracter <= "9") {
          if (!esNumero && !esNumComp) {
            brailleTexto += " 3456";
            esNumero = true;
          }
          let brailleNumero = this.diccionarioBraille.getNumeroBraille(
            caracter,
            esNumComp
          );
          if (brailleNumero) {
            brailleTexto += " " + brailleNumero;
          }
        } else {
          if (esNumero) {
            esNumero = false;
            if (
              i + 1 < palabra.length &&
              !palabra[i + 1].match(/\d/) &&
              !caracter.match(/\s/)
            ) {
              brailleTexto += " 5";
            }
          }

          if (caracter.match(/[a-zA-Z\u00C0-\u00FF]/)) {
            let brailleLetra;
            if (palabra === palabra.toUpperCase()) {
              brailleLetra = this.diccionarioBraille.getLetraBraille(
                caracter.toLowerCase()
              );
            } else {
              if (caracter === caracter.toUpperCase()) {
                brailleTexto += " 46";
              }
              brailleLetra = this.diccionarioBraille.getLetraBraille(
                caracter.toLowerCase()
              );
            }
            if (brailleLetra) {
              brailleTexto += " " + brailleLetra;
            }
          } else if (caracter.match(/\s/)) {
            brailleTexto += " ";
          } else {
            let brailleSigno;
            if (
              palabra[i - 1] &&
              palabra[i - 1].match(/[0-9]/) &&
              palabra[i + 1] &&
              palabra[i + 1].match(/[0-9]/) &&
              caracter === "."
            ) {
              brailleSigno = this.diccionarioBraille.getSigno(",");
            } else {
              brailleSigno = this.diccionarioBraille.getSigno(caracter);
            }
            if (brailleSigno) {
              brailleTexto += " " + brailleSigno;
            }
          }
        }

        i++;
      }
      brailleTexto += " ";
    }

    return brailleTexto.trim();
  }

  traducirBrailleAEspanol(brailleTexto) {
    const brailleCode = this.unicodeToBraille(brailleTexto);

    let lineas = brailleCode.split("\n");
    let textoEspanol = "";

    for (let linea of lineas) {
      textoEspanol += this.traducirLineaAEspanol(linea) + "\n";
    }

    return textoEspanol.trim();
  }

  traducirLineaAEspanol(brailleLinea) {
    let textoEspanol = "";
    let esNumero = false;
    let esMayuscula = false;
    let esTextoMayuscula = false;

    // Separar las palabras Braille por espacios dobles
    let palabrasBraille = brailleLinea.split("  ");

    for (let palabraBraille of palabrasBraille) {
      let caracteresBraille = palabraBraille.split(" ");
      let i = 0;
      let aperturaSigno = true;

      while (i < caracteresBraille.length) {
        let caracterBraille = caracteresBraille[i];

        if (caracterBraille === "") {
          i++;
          continue;
        }

        if (caracterBraille === "3456") {
          esNumero = true;
          i++;
          continue;
        }

        if (caracterBraille === "46") {
          if (caracteresBraille[i + 1] === "46") {
            esTextoMayuscula = true;
            i += 2;
            continue;
          } else {
            esMayuscula = true;
            i++;
            continue;
          }
        }

        let letraEspanol =
          this.diccionarioBraille.getLetraEspañol(caracterBraille);
        let signoEspanol =
          this.diccionarioBraille.getInvertSigno(caracterBraille);
        let numeroEspanol = esNumero
          ? this.diccionarioBraille.getInvertNumeroBraille(caracterBraille)
          : null;

        if (numeroEspanol) {
          textoEspanol += numeroEspanol;
        } else if (letraEspanol) {
          if (esTextoMayuscula) {
            textoEspanol += letraEspanol.toUpperCase();
          } else if (esMayuscula) {
            textoEspanol += letraEspanol.toUpperCase();
            esMayuscula = false;
          } else {
            textoEspanol += letraEspanol;
          }
        } else if (signoEspanol) {
          if (caracterBraille === "26") {
            textoEspanol += aperturaSigno ? "¿" : "?";
            aperturaSigno = !aperturaSigno;
          } else if (caracterBraille === "235") {
            textoEspanol += aperturaSigno ? "¡" : "!";
            aperturaSigno = !aperturaSigno;
          } else {
            textoEspanol += signoEspanol;
          }
        }

        if (esNumero && !numeroEspanol) {
          esNumero = false;
        }
        i++;
      }

      textoEspanol += " ";
      esTextoMayuscula = false;
    }

    return textoEspanol.trim();
  }

  getBrailleMatrix(brailleCode) {
    const brailleArray = brailleCode.split("").map(Number);
    const matrix = [0, 0, 0, 0, 0, 0];

    brailleArray.forEach((point) => {
      if (point > 0 && point <= 6) {
        matrix[point - 1] = 1;
      }
    });

    return matrix;
  }

  getBrailleUnicode(brailleCode) {
    let brailleLines = brailleCode.split("\n");
    let brailleText = "";

    for (let line of brailleLines) {
      let brailleSign = line.split(" ");
      let brailleLine = "";

      for (let brailleSgn of brailleSign) {
        const matrix = this.getBrailleMatrix(brailleSgn);
        if (!matrix) return null;

        // Definir Unicode base para punto Braille
        const baseUnicode = 0x2800;

        // Calcular valor Unicode sumando la posición del punto activo
        let unicodeValue = baseUnicode;
        matrix.forEach((point, index) => {
          if (point === 1) {
            unicodeValue += Math.pow(2, index);
          }
        });
        brailleLine += String.fromCharCode(unicodeValue) + " ";
      }
      brailleText += brailleLine.trim() + "\n";
    }

    return brailleText.trim();
  }

  unicodeToBraille(unicodeBraille) {
    let brailleCode = "";
    let lines = unicodeBraille.split("\n");

    for (let line of lines) {
      let brailleChars = line.split(" ");
      for (let char of brailleChars) {
        let unicodeValue = char.charCodeAt(0);
        let braillePoints = unicodeValue - 0x2800;
        let brailleCodeStr = "";

        for (let i = 0; i < 6; i++) {
          if ((braillePoints & (1 << i)) !== 0) {
            brailleCodeStr += (i + 1).toString();
          }
        }
        brailleCode += brailleCodeStr + " ";
      }
      brailleCode = brailleCode.trim() + "\n"; // Añadir salto de línea después de cada línea de braille
    }

    return brailleCode.trim(); // Eliminar el último salto de línea adicional
  }
}

export default Traductor;
