/**
 * @fileoverview Traductor de texto de Español a Braille, con opciones para descargar el resultado en PDF o PNG.
 * Incluye validación de caracteres especiales y soporte para traducción en espejo (invertida).
 */

import Traductor from "../services/traductor.js";

// Validación de caracteres especiales
document.getElementById("entradaTexto").addEventListener("input", function () {
    const texto = this.value;
    const warning = document.getElementById("warningCaracteres1");

    // Expresión regular para permitir solo caracteres válidos (letras, números, puntuación, etc.)
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9?¿!@""\s.,;:ü#-]+$/;

    if (texto === "" || regex.test(texto)) {
        warning.classList.add("hidden");
    } else {
        warning.classList.remove("hidden");
    }
});

// Traducción y actualización de la respuesta
document.getElementById("traducirBoton").addEventListener("click", function () {
    document.getElementById('descargarPNG').disabled = false;
    document.getElementById('descargarPDF').disabled = false;

    var texto = document.querySelector(".entradaTexto").value;
    var traductor = new Traductor();
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9?¿!@""\s.,;:ü#-]+$/;

    if (!regex.test(texto)) {
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

    var textoTraducido = document.querySelector(".entradaTexto").value;
    window.jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF();

    doc.addFont(
        "/Version1/implementation/templates/fonts/SimBraille/Braille.ttf",
        "braille",
        "normal"
    );

    doc.setFont("braille"); // Establecer la fuente personalizada
    var fontSize = 9.5; // Ajusta el tamaño de fuente según sea necesario
    doc.setFontSize(fontSize);

    /**
     * Agrega una línea de texto al documento PDF.
     * @param {jsPDF} doc - El objeto jsPDF para manipular el PDF.
     * @param {string} linea - El texto a agregar.
     * @param {number} xPos - Posición en el eje X.
     * @param {number} yPos - Posición en el eje Y.
     */
    function agregarLineaAPDF(doc, linea, xPos, yPos) {
        doc.text(linea.trim(), xPos, yPos);
    }

    if (checkboxMirror.checked) {
        textoTraducido = traductor.traducirEspanolABrailleInverso(textoTraducido);

        var pageWidth = doc.internal.pageSize.getWidth();
        var lineas = textoTraducido.split("\n");
        var yPos = 10;
        var lineHeight = fontSize * 1.2;
        var maxLineasPorPagina = 25;
        var lineasActuales = 0;

        // Recorrer las líneas de texto y ajustarlas al modo espejo
        for (var i = 0; i < lineas.length; i++) {
            var linea = lineas[i];
            var palabras = linea.split(" ");
            var lineaActual = "";

            for (var j = palabras.length - 1; j >= 0; j--) {
                var palabra = palabras[j];

                if ((lineaActual.replace(/\s/g, "").length + palabra.length) <= 40) {
                    lineaActual = palabra + " " + lineaActual;
                } else {
                    var textWidth = doc.getTextDimensions(lineaActual).w;
                    var xPos = pageWidth - textWidth - 10;
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
                var textWidth = doc.getTextDimensions(lineaActual).w;
                var xPos = pageWidth - textWidth - 10;
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
        var lineas = textoTraducido.split("\n");

        var yPos = 10;
        var lineHeight = fontSize * 1.0;
        var maxLineasPorPagina = 25;
        var lineasActuales = 0;

        // Recorrer las líneas de texto normales y ajustarlas al PDF
        lineas.forEach(function (linea) {
            var palabras = linea.split(" ");
            var lineaActual = "";

            palabras.forEach(function (palabra) {
                if ((lineaActual.replace(/\s/g, "").length + palabra.length) <= 40) {
                    lineaActual += palabra + " ";
                } else {
                    var xPos = 10;
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
                var xPos = 10;
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
    var checkboxMirror = document.getElementById("mirror");
    var textoTraducido = document.getElementById("entradaTexto").value;
    var traductor = new Traductor();

    var maxCharsPerLine = 100;
    var lineHeight = 25; // Altura de línea (ajusta según el tamaño de fuente y el interlineado deseado)
    var padding = 50; // Espacio adicional para el texto

    // Traducir texto según la opción seleccionada
    textoTraducido = traductor.traducirEspanolABraille(textoTraducido);

    // Dividir el texto en líneas
    var lineas = dividirTextoEnLineas(textoTraducido, maxCharsPerLine);

    // Ajustar el tamaño del canvas basado en la cantidad de líneas
    var canvasHeight = lineas.length * lineHeight + padding;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = 1000; // Ancho en píxeles
    canvas.height = canvasHeight;
    context.font = "20px Arial";
    context.fillStyle = "#FFFFFF"; // Blanco

    if (checkboxMirror.checked) {
        context.translate(canvas.width, 0); // Invertir en eje X para modo espejo
        context.scale(-1, 1);
    }

    const x = 10; // Coordenada x de inicio
    let y = 50; // Coordenada y de inicio

    // Dibujar el texto en el canvas
    for (let linea of lineas) {
        context.fillText(linea, x, y);
        y += lineHeight;
    }

    var imgData = canvas.toDataURL("image/png");

    var link = document.createElement("a");
    link.download = checkboxMirror.checked ? "traduccion_braille_inverso.png" : "traduccion_braille.png";
    link.href = imgData;
    link.click();
});

/**
 * Divide el texto en líneas según el número máximo de caracteres por línea.
 * 
 * @param {string} texto - El texto a dividir en líneas.
 * @param {number} maxCharsPerLine - El número máximo de caracteres permitidos por línea.
 * @returns {string[]} - Un array de líneas de texto divididas.
 */
function dividirTextoEnLineas(texto, maxCharsPerLine) {
    var lineas = [];
    var parrafos = texto.split("\n");

    parrafos.forEach(parrafo => {
        var palabras = parrafo.split(" ");
        var lineaActual = "";

        for (var palabra of palabras) {
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
