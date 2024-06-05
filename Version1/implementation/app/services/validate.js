class Validator {
  validarCorreo(correo) {
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(correo);
  }

  validarURL(url) {
    const patron = /^(https?:\/\/)?www\.[^\s/$.?#].[^\s]*$/;
    return patron.test(url);
  }

  validarEtiqueta(etiqueta) {
    const patronEtiqueta = /^#[a-zA-Z0-9_]+(:\d+)?$/;
    return patronEtiqueta.test(etiqueta);
  }

  esEspanol(texto) {
    const patron =
      /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9.,;:¿?¡!"«»'<>()[\]{}\-—*+\\/&@#%^$€\s]+$/;
    return patron.test(texto);
  }
}

export default Validator;
