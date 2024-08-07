/**
 * Clase que contiene los métodos para validar los campos de los formularios
 * @class Validator
 * @module Validator
 */
class Validator {
  /**
   * Valida si una cadena de texto es un correo electrónico válido.
   * @param {string} correo - El correo electrónico a validar.
   * @returns {boolean} - `true` si el correo es válido, `false` en caso contrario.
   */
  isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  /**
     * Valida si una cadena de texto es una URL válida.
     * @param {string} url - La URL a validar.
     * @returns {boolean} - `true` si la URL es válida, `false` en caso contrario.
     */
  isValidURL(url) {
    const urlPattern = /^(https?:\/\/)?www\.[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(url);
  }

  /**
   * Valida si una cadena de texto es una etiqueta válida.
   * @param {string} etiqueta - La etiqueta a validar.
   * @returns {boolean} - `true` si la etiqueta es válida, `false` en caso contrario.
   */
  isValidTag(tag) {
    const tagPattern = /^#[a-zA-Z0-9_]+(:\d+)?$/;
    return tagPattern.test(tag);
  }

  /**
   * Determina si un carácter es una letra.
   * @param {string} caracter - El carácter a verificar.
   * @returns {boolean} - Verdadero si el carácter es una letra, falso en caso contrario.
   */
  isLetter(char) {
    return /[a-zA-Z\u00C0-\u00FF]/.test(char);
  }

  /**
   * Determina si un carácter es un número.
   * @param {string} caracter - El carácter a verificar.
   * @returns {boolean} - Verdadero si el carácter es un número, falso en caso contrario.
   */
  isNumber(char) {
    return /\d/.test(char);
  }

  /**
   * Determina si un carácter es un espacio.
   * @param {string} caracter - El carácter a verificar.
   * @returns {boolean} - Verdadero si el carácter es un espacio, falso en caso contrario.
   */
  isSpace(char) {
    return /\s/.test(char);
  }

  /**
   * Determina si una palabra está en mayúsculas.
   * @param {string} palabra - La palabra a verificar.
   * @returns {boolean} - Verdadero si la palabra está en mayúsculas, falso en caso contrario.
   */
  isUpperCase(word) {
    return word === word.toUpperCase() && /[a-zA-Z]/.test(word);
  }

  /**
   * Determina si un signo es un punto decimal.
   * @param {string} signo - El signo a verificar.
   * @param {string} palabra - La palabra que contiene el signo.
   * @param {number} indice - El índice del signo en la palabra.
   * @returns {boolean} - Verdadero si el signo es un punto decimal, falso en caso contrario.
   */
  isDecimalPoint(sign, word, index) {
    return sign === "." && this.isNumber(word[index - 1]) && this.isNumber(word[index + 1]);
  }
}

export default Validator;
