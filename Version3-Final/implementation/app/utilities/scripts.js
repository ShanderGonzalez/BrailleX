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

    document.getElementById('descargarPNG').disabled = false;
    document.getElementById('descargarPDF').disabled = false;

    const texto = document.querySelector(".entradaTexto").value;
    const traductor = new Traductor();
    const regex = /[~\/\\«»]/g;

    if (regex.test(texto)) {
        texto = "";
        return; // Detener la ejecución del resto del código
    }
    const traduccion = traductor.traducirEspanolABraille(texto);
    document.querySelector(".respuesta").innerText = traduccion;
});

// Descargar en PDF
document.getElementById("descargarPDF").addEventListener("click", function () {
    const checkboxMirror = document.getElementById("mirror");
    const traductor = new Traductor();

    const textoTraducido = document.querySelector(".entradaTexto").value;
    window.jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();

    doc.addFont(
        "/Version1/implementation/templates/fonts/SimBraille/Braille.ttf",
        "braille",
        "normal"
    );

    doc.setFont("braille"); // Establecer la fuente personalizada
    const fontSize = 9.5; // Ajusta el tamaño de fuente según sea necesario
    doc.setFontSize(fontSize);

    function agregarLineaAPDF(doc, linea, xPos, yPos) {
        doc.text(linea.trim(), xPos, yPos);
    }

    if (checkboxMirror.checked) {
        textoTraducido = traductor.traducirEspanolABrailleInverso(textoTraducido);

        const pageWidth = doc.internal.pageSize.getWidth();
        const lineas = textoTraducido.split("\n");
        const yPos = 10;
        const lineHeight = fontSize * 1.2;
        const maxLineasPorPagina = 25;
        const lineasActuales = 0;

        for (let i = 0; i < lineas.length; i++) {
            let linea = lineas[i];
            let palabras = linea.split(" ");
            let lineaActual = "";

            for (let j = palabras.length - 1; j >= 0; j--) {
                let palabra = palabras[j];

                if ((lineaActual.replace(/\s/g, "").length + palabra.length) <= 40) {
                    lineaActual = palabra + " " + lineaActual;
                } else {
                    let textWidth = doc.getTextDimensions(lineaActual).w;
                    let xPos = pageWidth - textWidth - 10;
                    agregarLineaAPDF(doc, lineaActual, xPos, yPos);
                    yPos += lineHeight;
                    lineaActual = palabra + " ";
                    lineasActuales++;

                    if (lineasActuales >= maxLineasPorPagina) {
                        doc.addPage();
                        yPos = 10;
                        lineasActuales = 0;
                    }
                }
            }

            if (lineaActual.length > 0) {
                let textWidth = doc.getTextDimensions(lineaActual).w;
                let xPos = pageWidth - textWidth - 10;
                agregarLineaAPDF(doc, lineaActual, xPos, yPos);
                yPos += lineHeight;
                lineasActuales++;

                if (lineasActuales >= maxLineasPorPagina) {
                    doc.addPage();
                    yPos = 10;
                    lineasActuales = 0;
                }
            }
        }

        doc.save("traduccion_braille_espejo.pdf");
    } else {
        textoTraducido = traductor.traducirEspanolABraille(textoTraducido);
        let lineas = textoTraducido.split("\n");

        let yPos = 10;
        let lineHeight = fontSize * 1.0;
        let maxLineasPorPagina = 25;
        let lineasActuales = 0;

        lineas.forEach(function (linea) {
            let palabras = linea.split(" ");
            let lineaActual = "";

            palabras.forEach(function (palabra) {
                if ((lineaActual.replace(/\s/g, "").length + palabra.length) <= 40) {
                    lineaActual += palabra + " ";
                } else {
                    let xPos = 10;
                    agregarLineaAPDF(doc, lineaActual, xPos, yPos);
                    yPos += lineHeight;
                    lineaActual = palabra + " ";
                    lineasActuales++;

                    if (lineasActuales >= maxLineasPorPagina) {
                        doc.addPage();
                        yPos = 10;
                        lineasActuales = 0;
                    }
                }
            });

            if (lineaActual.length > 0) {
                let xPos = 10;
                agregarLineaAPDF(doc, lineaActual, xPos, yPos);
                yPos += lineHeight;
                lineasActuales++;

                if (lineasActuales >= maxLineasPorPagina) {
                    doc.addPage();
                    yPos = 10;
                    lineasActuales = 0;
                }
            }
        });

        doc.save("traduccion_braille.pdf");
    }
});


// Descargar en PNG
document.getElementById("descargarPNG").addEventListener("click", function () {
    let checkboxMirror = document.getElementById("mirror");
    let textoTraducido = document.getElementById("entradaTexto").value;
    let traductor = new Traductor();

    let maxCharsPerLine = 100;
    let lineHeight = 25; // Altura de línea (ajusta según el tamaño de fuente y el interlineado deseado)
    let padding = 50; // Espacio adicional para el texto

    // Traducir texto según la opción seleccionada
    textoTraducido = traductor.traducirEspanolABraille(textoTraducido);

    // Dividir el texto en líneas
    let lineas = dividirTextoEnLineas(textoTraducido, maxCharsPerLine);

    // Ajustar el tamaño del canvas basado en la cantidad de líneas
    let canvasHeight = lineas.length * lineHeight + padding;
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    canvas.width = 1000; // Ancho en píxeles
    canvas.height = canvasHeight;
    context.font = "20px Arial";
    context.fillStyle = "#FFFFFF"; // Blanco

    if (checkboxMirror.checked) {
        context.translate(canvas.width, 0); // Mover el origen al borde derecho
        context.scale(-1, 1);
    }

    const x = 10; // Coordenada x de inicio
    let y = 50; // Coordenada y de inicio

    for (let linea of lineas) {
        context.fillText(linea, x, y);
        y += lineHeight; // Mover la coordenada y hacia abajo para la siguiente línea
    }

    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = checkboxMirror.checked ? "traduccion_braille_inverso.png" : "traduccion_braille.png";
    link.href = imgData;
    link.click();
});

function dividirTextoEnLineas(texto, maxCharsPerLine) {
    const lineas = [];
    const parrafos = texto.split("\n");

    parrafos.forEach(parrafo => {
        let palabras = parrafo.split(" ");
        let lineaActual = "";

        for (let palabra of palabras) {
            if ((lineaActual + palabra).length > maxCharsPerLine) {
                lineas.push(lineaActual.trim());
                lineaActual = palabra + " ";
            } else {
                lineaActual += palabra + " ";
            }
        }
        if (lineaActual.length > 0) {
            lineas.push(lineaActual.trim());
        }
    });

    return lineas;
}


// Actualizar botón de descargar PDF según el estado del checkbox
document.getElementById("mirror").addEventListener("change", function () {
    actualizarBotonDescargar();
});



