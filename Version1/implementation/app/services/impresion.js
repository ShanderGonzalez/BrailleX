const PDFDocument = require("pdfkit");
const blobStream = require("blob-stream");
const fs = require("fs");

function imprimirBraille(simbolosBraille, nombreArchivo) {
  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());

  doc.pipe(fs.createWriteStream(nombreArchivo));

  // Registrar la fuente SimBraille
  doc.registerFont(
    "SimBraille",
    "Version1/implementation/templates/fonts/SimBraille/Braille.ttf"
  );

  // Configurar fuente y tamaño para los símbolos Braille
  doc.font("SimBraille");
  doc.fontSize(12);

  // Imprimir los símbolos Braille en el documento PDF
  doc.text(simbolosBraille, { align: "center" });

  doc.end();
  console.log(`Archivo PDF "${nombreArchivo}" creado con éxito.`);
}

// Ejemplo de uso
const simbolos = "⠓⠇⠇⠑⠗⠊⠊⠇⠇⠑⠗⠊⠊⠇⠇⠑⠗⠊⠊";
const nombreArchivo = "braille.pdf";

imprimirBraille(simbolos, nombreArchivo);
