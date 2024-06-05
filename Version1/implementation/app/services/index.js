import Validator from "./validate.js";
import Traductor from "./traductor.js";

const validador = new Validator();
const traductor = new Traductor();
const textoEspanol =
    "Aji come";
if (validador.esEspanol(textoEspanol)) {
    const textoBraille = traductor.traducirEspanolABraille(textoEspanol);
    console.log(textoBraille);

    const textoEspanol2 = traductor.traducirBrailleAEspanol(textoBraille);
    console.log(textoEspanol2);
} else {
    console.log("El texto no está en español");
}

