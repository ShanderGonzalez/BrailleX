// Traductor de texto de Español a Braille
import Traductor from "../services/traductor.js";

// Validación de caracteres especiales
document.getElementById("entradaTexto").addEventListener("input", function () {
    const texto = this.value;
    const warning = document.getElementById("warningCaracteres");
    const regex = /[~\/\\«»`|]/g; // caracteres no permitidos

    if (regex.test(texto)) {
        warning.classList.remove("hidden");
    } else {
        warning.classList.add("hidden");
    }
});

// Traducción y actualización de la respuesta
document.getElementById("traducirBoton").addEventListener("click", function () {
    var texto = document.querySelector(".entradaTexto").value;
    var traductor = new Traductor();
    const regex = /[~\/\\«»]/g;

    if (regex.test(texto)) {
        texto = "";
        return; // Detener la ejecución del resto del código
    }
    var traduccion = traductor.traducirEspanolABraille(texto);
    document.querySelector(".respuesta").innerText = traduccion;
});

// Descargar en PDF
document.getElementById("descargarPDF").addEventListener("click", function () {
    var checkboxMirror = document.getElementById("mirror");
    var traductor = new Traductor();

    if (checkboxMirror.checked) {
        var textoTraducido = document.querySelector(".entradaTexto").value;
        textoTraducido = traductor.traducirEspanolABrailleInverso(textoTraducido);
        console.log("Texto traducido: " + textoTraducido);

        window.jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();

        doc.addFont(
            "/Version1/implementation/templates/fonts/SimBraille/Braille.ttf",
            "braille",
            "normal"
        );

        doc.setFont("braille"); // Establecer la fuente personalizada
        var fontSize = 12; // Ajusta el tamaño de fuente según sea necesario
        doc.setFontSize(fontSize);
        var pageWidth = doc.internal.pageSize.getWidth();
        var lineas = textoTraducido.split("\n");
        var yPos = 10;
        var lineHeight = fontSize * 1.2;

        for (var i = 0; i < lineas.length; i++) {
            var linea = lineas[i];
            var palabras = linea.split(" ");
            var lineaActual = "";

            for (var j = palabras.length - 1; j >= 0; j--) {
                var palabra = palabras[j];

                if ((palabra + " " + lineaActual).length <= 40) {
                    lineaActual = palabra + " " + lineaActual;
                } else {
                    var textWidth = doc.getTextDimensions(lineaActual).w;
                    var xPos = pageWidth - textWidth - 10;
                    doc.text(lineaActual.trim(), xPos, yPos);
                    yPos += lineHeight;
                    lineaActual = palabra + " ";
                }
            }

            if (lineaActual.length > 0) {
                var textWidth = doc.getTextDimensions(lineaActual).w;
                var xPos = pageWidth - textWidth - 10;
                doc.text(lineaActual.trim(), xPos, yPos);
                yPos += lineHeight;
            }
        }

        doc.save("traduccion_braille_espejo.pdf");
    }
});

// Descargar en PNG
document.getElementById("descargarPNG").addEventListener("click", function () {
    var textoTraducido = document.getElementById("entradaTexto").value;
    var traductor = new Traductor();
    textoTraducido = traductor.traducirEspanolABraille(textoTraducido);
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = 1000; // Ancho en píxeles
    canvas.height = 150; // Alto en píxeles (ajusta según el contenido)
    context.font = "20px Arial";
    context.fillStyle = "#FFFFFF"; // Negro
    const lineas = textoTraducido.split("\n");
    const x = 10; // Coordenada x de inicio
    let y = 50; // Coordenada y de inicio
    const lineHeight = 25; // Altura de línea (ajusta según el tamaño de fuente y el interlineado deseado)

    for (let linea of lineas) {
        context.fillText(linea, x, y);
        y += lineHeight; // Mover la coordenada y hacia abajo para la siguiente línea
    }

    var imgData = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "traduccion_braille.png";
    link.href = imgData;
    link.click();
});

// Actualizar botón de descargar PDF según el estado del checkbox
document.getElementById("mirror").addEventListener("change", function () {
    actualizarBotonDescargar();
});


