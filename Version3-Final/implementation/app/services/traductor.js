import BrailleDictionary from "./dictionary.js";
import Validator from "./validate.js";

/**
 * Clase que se encarga de traducir texto en español a Braille y viceversa.
 * @class Traductor
 * @constructor Crea una instancia de la clase Traductor.
 * @property {BrailleDictionary} diccionarioBraille - Diccionario de Braille.
 * @property {Validator} validador - Validador de texto.
 * @module Traductor
 */
class Traductor {

  /**
   * Constructor de la clase Traductor.
   */
  constructor() {
    this.diccionarioBraille = new BrailleDictionary();
    this.validador = new Validator();
  }

  /**
   * Traduce texto en español a Braille.
   * @param {string} texto - El texto en español a traducir.
   * @returns {string} - El texto traducido a Braille en formato Unicode.
   */
  traducirEspanolABraille(texto) {
    return this.convertirTextoABraille(texto, false);
  }

  /**
   * Traduce texto en español a Braille invertido.
   * @param {string} texto - El texto en español a traducir.
   * @returns {string} - El texto traducido a Braille invertido en formato Unicode.
   */
  traducirEspanolABrailleInverso(texto) {
    return this.convertirTextoABraille(texto, true);
  }

  /**
   * Convierte texto en español a Braille (normal o invertido).
   * @param {string} texto - El texto en español a traducir.
   * @param {boolean} invertido - Indica si se debe invertir el texto.
   * @returns {string} - El texto traducido a Braille en formato Unicode.
   */
  convertirTextoABraille(texto, invertido) {
    const lineas = texto.split("\n");
    let brailleTexto = "";

    for (const linea of lineas) {
      let brailleLinea = this.traducirLineaABraille(linea).split(" ");
      if (invertido) {
        brailleLinea = brailleLinea.reverse().map(braille => this.reordenarPuntosBraille(braille));
      }
      brailleTexto += brailleLinea.join(" ") + "\n";
    }

    return this.getBrailleUnicode(brailleTexto.trim());
  }

  /**
   * Reordena los puntos Braille invirtiendo su posición.
   * @param {string} brailleCode - El código Braille a reordenar.
   * @returns {string} - El código Braille reordenado.
   */
  reordenarPuntosBraille(brailleCode) {
    const inversionMap = { 1: "4", 2: "5", 3: "6", 4: "1", 5: "2", 6: "3" };
    return brailleCode.split("").map(dot => inversionMap[dot] || dot).join("");
  }

  /**
   * Traduce una línea de texto en español a Braille.
   * @param {string} texto - La línea de texto en español a traducir.
   * @returns {string} - La línea traducida a Braille.
   */
  traducirLineaABraille(texto) {
    const palabras = texto.split(" ");
    let brailleTexto = "";
    let esNumero = false;

    for (const palabra of palabras) {
      if (this.validador.isUpperCase(palabra)) {
        brailleTexto += " 46 46";
      }

      const esNumComp = this.validador.isValidEmail(palabra) || this.validador.isValidURL(palabra) || this.validador.isValidTag(palabra);
      esNumero = false;

      for (let i = 0; i < palabra.length; i++) {
        const caracter = palabra[i];

        if (this.validador.isNumber(caracter)) {
          if (!esNumero && !esNumComp) {
            brailleTexto += " 3456";
            esNumero = true;
          }
          brailleTexto += " " + this.diccionarioBraille.getNumeroBraille(caracter, esNumComp);
        } else {
          if (esNumero) {
            esNumero = false;
            if (i + 1 < palabra.length && !this.validador.isNumber(palabra[i + 1]) && !this.validador.isSpace(caracter)) {
              brailleTexto += " 5";
            }
          }
          brailleTexto += " " + this.obtenerBrailleDeCaracter(caracter, palabra, i);
        }
      }
      brailleTexto += " ";
    }
    return brailleTexto.trim();
  }

  /**
   * Obtiene el código Braille de un carácter.
   * @param {string} caracter - El carácter a traducir.
   * @param {string} palabra - La palabra que contiene el carácter.
   * @param {number} indice - El índice del carácter en la palabra.
   * @returns {string} - El código Braille del carácter.
   */
  obtenerBrailleDeCaracter(caracter, palabra, indice) {
    if (this.validador.isLetter(caracter)) {
      return this.obtenerBrailleDeLetra(caracter, palabra);
    } else if (this.validador.isSpace(caracter)) {
      return "";
    } else {
      return this.obtenerBrailleDeSigno(caracter, palabra, indice);
    }
  }

  /**
   * Obtiene el código Braille de una letra.
   * @param {string} letra - La letra a traducir.
   * @param {string} palabra - La palabra que contiene la letra.
   * @returns {string} - El código Braille de la letra.
   */
  obtenerBrailleDeLetra(letra, palabra) {
    if (palabra === palabra.toUpperCase()) {
      return this.diccionarioBraille.getLetraBraille(letra.toLowerCase());
    } else {
      return (letra === letra.toUpperCase() ? "46 " : "") + this.diccionarioBraille.getLetraBraille(letra.toLowerCase());
    }
  }

  /**
   * Obtiene el código Braille de un signo.
   * @param {string} signo - El signo a traducir.
   * @param {string} palabra - La palabra que contiene el signo.
   * @param {number} indice - El índice del signo en la palabra.
   * @returns {string} - El código Braille del signo.
   */
  obtenerBrailleDeSigno(signo, palabra, indice) {
    return this.validador.isDecimalPoint(signo, palabra, indice) ? this.diccionarioBraille.getSigno(",") : (this.diccionarioBraille.getSigno(signo) || "");
  }

  /**
   * Traduce texto en Braille a español.
   * @param {string} brailleTexto - El texto en Braille a traducir.
   * @returns {string} - El texto traducido a español.
   */
  traducirBrailleAEspanol(brailleTexto) {
    const brailleCode = this.unicodeToBraille(brailleTexto);

    const lineas = brailleCode.split("\n");
    let textoEspanol = "";

    for (const linea of lineas) {
      textoEspanol += this.traducirLineaAEspanol(linea) + "\n";
    }

    return textoEspanol.trim();
  }

  /**
   * Traduce una línea de Braille a español.
   * @param {string} brailleLinea - La línea de Braille a traducir.
   * @returns {string} - La línea traducida a español.
   */
  traducirLineaAEspanol(brailleLinea) {
    const palabrasBraille = brailleLinea.split("  ");
    let textoEspanol = "";
    let esNumero = false;
    let esMayuscula = false;
    let esTextoMayuscula = false;

    for (const palabraBraille of palabrasBraille) {
      const caracteresBraille = palabraBraille.split(" ");

      for (const caracterBraille of caracteresBraille) {
        if (!caracterBraille) continue;

        if (caracterBraille === "3456") {
          esNumero = true;
        } else if (caracterBraille === "46") {
          if (caracteresBraille[caracteresBraille.indexOf(caracterBraille) + 1] === "46") {
            esTextoMayuscula = true;
          } else {
            esMayuscula = true;
          }
        } else {
          textoEspanol += this.obtenerEspanolDeCaracter(caracterBraille, esNumero, esMayuscula, esTextoMayuscula);
          if (esNumero && !this.diccionarioBraille.getInvertNumeroBraille(caracterBraille)) {
            esNumero = false;
          }
          esMayuscula = false;
        }
      }
      textoEspanol += " ";
      esTextoMayuscula = false;
    }

    return textoEspanol.trim();
  }

  /**
   * Obtiene el carácter español de un código Braille.
   * @param {string} caracterBraille - El código Braille a traducir.
   * @param {boolean} esNumero - Indica si el carácter es un número.
   * @param {boolean} esMayuscula - Indica si el carácter es mayúscula.
   * @param {boolean} esTextoMayuscula - Indica si el texto es todo mayúscula.
   * @param {boolean} aperturaSigno - Indica si el signo de apertura está abierto.
   * @returns {string} - El carácter español.
   */
  obtenerEspanolDeCaracter(caracterBraille, esNumero, esMayuscula, esTextoMayuscula, aperturaSigno) {
    const letraEspanol = this.diccionarioBraille.getLetraEspañol(caracterBraille);
    const signoEspanol = this.diccionarioBraille.getInvertSigno(caracterBraille);
    const numeroEspanol = esNumero ? this.diccionarioBraille.getInvertNumeroBraille(caracterBraille) : null;

    if (numeroEspanol) {
      return numeroEspanol;
    } else if (letraEspanol) {
      return esTextoMayuscula ? letraEspanol.toUpperCase() : (esMayuscula ? letraEspanol.toUpperCase() : letraEspanol);
    } else if (signoEspanol) {
      return this.obtenerSignoEspecial(caracterBraille, signoEspanol, aperturaSigno);
    }

    return "";
  }

  /**
   * Obtiene el signo especial español de un código Braille.
   * @param {string} caracterBraille - El código Braille del signo.
   * @param {string} signoEspanol - El signo en español.
   * @param {boolean} aperturaSigno - Indica si el signo de apertura está abierto.
   * @returns {string} - El signo especial en español.
   */
  obtenerSignoEspecial(caracterBraille, signoEspanol) {
    const signosEspeciales = {
      "26": ["¿", "?"],
      "235": ["¡", "!"],
    };
    return signosEspeciales[caracterBraille] ? (aperturaSigno ? signosEspeciales[caracterBraille][0] : signosEspeciales[caracterBraille][1]) : signoEspanol;
  }

  /**
   * Convierte un código Braille a una matriz de puntos Braille.
   * @param {string} brailleCode - El código Braille a convertir.
   * @returns {number[]} - La matriz de puntos Braille.
   */
  getBrailleMatrix(brailleCode) {
    const brailleArray = brailleCode.split("").map(Number);
    const matrix = Array(6).fill(0);

    brailleArray.forEach(point => {
      if (point > 0 && point <= 6) {
        matrix[point - 1] = 1;
      }
    });

    return matrix;
  }

  /**
   * Convierte un código Braille en formato de puntos a su equivalente Unicode.
   * @param {string} brailleCode - El código Braille a convertir.
   * @returns {string} - El texto Braille en formato Unicode.
   */
  getBrailleUnicode(brailleCode) {
    return brailleCode.split("\n").map(line =>
      line.split(" ").map(brailleSgn => {
        const matrix = this.getBrailleMatrix(brailleSgn);
        const unicodeValue = matrix.reduce((acc, point, index) => acc + (point * Math.pow(2, index)), 0x2800);
        return String.fromCharCode(unicodeValue);
      }).join(" ")
    ).join("\n").trim();
  }

  /**
   * Convierte texto en Braille Unicode a su representación en código Braille.
   * @param {string} unicodeBraille - El texto Braille en Unicode.
   * @returns {string} - El código Braille.
   */
  unicodeToBraille(unicodeBraille) {
    return unicodeBraille.split("\n").map(line =>
      line.split(" ").map(char => {
        const braillePoints = char.charCodeAt(0) - 0x2800;
        return Array.from({ length: 6 }, (_, i) => (braillePoints & (1 << i)) !== 0 ? i + 1 : "").join("");
      }).join(" ")
    ).join("\n").trim();
  }
}

export default Traductor;
