  document.getElementById('entradaTexto').addEventListener('input', function() {
    const texto = this.value;
    const warning = document.getElementById('warningCaracteres');
    const regex = /[~\/\\«»]/g; // Ajusta este regex según los caracteres permitidos
    

    if (regex.test(texto)) {
      warning.classList.remove('hidden');
    } else {
      warning.classList.add('hidden');
    }
  });

  function limpiarTexto() {
    document.getElementById('entradaTexto').value = '';
    document.getElementById('warningCaracteres').classList.add('hidden');
  }