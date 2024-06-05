import Validator from "./validate.js";
import Traductor from "./traductor.js";

const validador = new Validator();
const traductor = new Traductor();
const textoEspanol =
    "Hola que tal, me llamo Shander y nací en Ecuador en el año 2002.\nSoy un estudiante de la carrera de Ingeniería en Software en la Universidad de la EPN. Me gusta mucho la programación y la tecnología.";
if (validador.esEspanol(textoEspanol)) {
    const textoBraille = traductor.traducirEspanolABraille(textoEspanol);
    console.log(textoBraille);

    const textoEspanol2 = traductor.traducirBrailleAEspanol(textoBraille);
    console.log(textoEspanol2);
} else {
    console.log("El texto no está en español");
}

