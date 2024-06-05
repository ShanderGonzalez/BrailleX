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
  validarCorreo(correo) {
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(correo);
  }
  /**
     * Valida si una cadena de texto es una URL válida.
     * @param {string} url - La URL a validar.
     * @returns {boolean} - `true` si la URL es válida, `false` en caso contrario.
     */
  validarURL(url) {
    const patron = /^(https?:\/\/)?www\.[^\s/$.?#].[^\s]*$/;
    return patron.test(url);
  }

  /**
   * Valida si una cadena de texto es una etiqueta válida.
   * @param {string} etiqueta - La etiqueta a validar.
   * @returns {boolean} - `true` si la etiqueta es válida, `false` en caso contrario.
   */
  validarEtiqueta(etiqueta) {
    const patronEtiqueta = /^#[a-zA-Z0-9_]+(:\d+)?$/;
    return patronEtiqueta.test(etiqueta);
  }

  /**
   * Valida si una cadena de texto contiene solo caracteres en español.
   * @param {string} texto - El texto a validar.
   * @returns {boolean} - `true` si el texto contiene solo caracteres en español, `false` en caso contrario.
   */
  esEspanol(texto) {
    const patron =
      /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9.,;:¿?¡!"«»'<>()[\]{}\-—*+\\/&@#%^$€\s]+$/;
    return patron.test(texto);
  }
}

export default Validator;
