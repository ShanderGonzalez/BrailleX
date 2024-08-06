// test/traductor.test.js
import { expect as _expect } from 'chai';
const expect = _expect;
import Traductor from '../app/services/traductor.js';

describe('Traductor', () => {
    let traductor;

    before(() => {
        traductor = new Traductor();
    });

    describe('traducirEspanolABraille', () => {
        it('debería traducir texto en español a Braille', () => {
            const texto = "hola";
            const resultado = traductor.traducirEspanolABraille(texto);
            expect(resultado).to.equal("⠓ ⠕ ⠇ ⠁");
        });

        it('debería traducir texto en español a Braille con mayúsculas', () => {
            const texto = "Hola";
            const resultado = traductor.traducirEspanolABraille(texto);
            expect(resultado).to.equal("⠨ ⠓ ⠕ ⠇ ⠁");
        });

        it('debería traducir texto en español a Braille con números', () => {
            const texto = "123";
            const resultado = traductor.traducirEspanolABraille(texto);
            expect(resultado).to.equal("⠼ ⠁ ⠃ ⠉");
        });
    });

    describe('traducirEspanolABrailleInverso', () => {
        it('debería traducir texto en español a Braille invertido', () => {
            const texto = "hola";
            const resultado = traductor.traducirEspanolABrailleInverso(texto);
            expect(resultado).to.equal("⠈ ⠸ ⠪ ⠚");
        });
    });

    describe('traducirBrailleAEspanol', () => {
        it('debería traducir texto en Braille a español', () => {
            const braille = "⠓ ⠕ ⠇ ⠁";
            const resultado = traductor.traducirBrailleAEspanol(braille);
            expect(resultado).to.equal("hola");
        });

        it('debería traducir texto en Braille con mayúsculas a español', () => {
            const braille = "⠨ ⠓ ⠕ ⠇ ⠁";
            const resultado = traductor.traducirBrailleAEspanol(braille);
            expect(resultado).to.equal("Hola");
        });

        it('debería traducir texto en Braille con números a español', () => {
            const braille = "⠼ ⠁ ⠃ ⠉";
            const resultado = traductor.traducirBrailleAEspanol(braille);
            expect(resultado).to.equal("123");
        });
    });

    describe('convertirTextoABraille', () => {
        it('debería convertir texto a Braille sin invertir', () => {
            const texto = "hola";
            const resultado = traductor.convertirTextoABraille(texto, false);
            expect(resultado).to.equal("⠓ ⠕ ⠇ ⠁");
        });

        it('debería convertir texto a Braille invertido', () => {
            const texto = "hola";
            const resultado = traductor.convertirTextoABraille(texto, true);
            expect(resultado).to.equal("⠈ ⠸ ⠪ ⠚");
        });
    });

    describe('reordenarPuntosBraille', () => {
        it('debería reordenar los puntos Braille', () => {
            const brailleCode = "125";
            const resultado = traductor.reordenarPuntosBraille(brailleCode);
            expect(resultado).to.equal("452");
        });
    });

    describe('traducirLineaABraille', () => {
        it('debería traducir una línea de texto en español a Braille', () => {
            const texto = "hola";
            const resultado = traductor.traducirLineaABraille(texto);
            expect(resultado).to.equal("125 135 123 1");
        });
    });

    describe('obtenerBrailleDeCaracter', () => {
        it('debería obtener el código Braille de una letra', () => {
            const resultado = traductor.obtenerBrailleDeCaracter('h', 'hola', 0);
            expect(resultado).to.equal("125");
        });

        it('debería obtener el código Braille de un signo de puntuación', () => {
            const resultado = traductor.obtenerBrailleDeCaracter('.', 'hola.', 4);
            expect(resultado).to.equal("3");
        });

        it('debería obtener el código Braille de un espacio', () => {
            const resultado = traductor.obtenerBrailleDeCaracter(' ', 'hola mundo', 4);
            expect(resultado).to.equal("");
        });
    });

    describe('traducirLineaAEspanol', () => {
        it('debería traducir una línea de Braille a español', () => {
            const brailleLinea = "125 135 123 1";
            const resultado = traductor.traducirLineaAEspanol(brailleLinea);
            expect(resultado).to.equal("hola");
        });
    });

    describe('unicodeToBraille', () => {
        it('debería convertir Braille Unicode a código Braille', () => {
            const unicodeBraille = "⠓ ⠕ ⠇ ⠁";
            const resultado = traductor.unicodeToBraille(unicodeBraille);
            expect(resultado).to.equal("125 135 123 1");
        });
    });
});
