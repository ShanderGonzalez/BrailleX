import Validator from "./validate.js";
import Traductor from "./traductor.js";


const validador = new Validator();
const traductor = new Traductor();
const textoEspanol = "Hola que tal, me llamo Shander y nací en Ecuador en el año 2002.\nSoy un estudiante de la carrera de Ingeniería en Software en la Universidad de la EPN. Me gusta mucho la programación y la tecnología.";
if (validador.esEspanol(textoEspanol)) {
    const textoBraille = traductor.traducirEspanolABraille(textoEspanol);
    console.log("Texto en español:");
    console.log(textoEspanol);
    console.log("Texto en braille:");

    const textoBrailleFormateado = textoBraille
        .split(" ")
        .map((braille) => {

            return braille + " ";
        })
        .join("");

    console.log(textoBrailleFormateado);
    const brailleUnicode = traductor.getBrailleUnicode(textoBrailleFormateado);
    console.log("Braille:");
    console.log(brailleUnicode);
} else {
    console.log("El texto no está en español");
}



