import { expect as _expect } from 'chai';
const expect = _expect;
import BrailleDictionary from '../app/services/dictionary.js';

describe('BrailleDictionary', () => {
    let brailleDict;

    before(() => {
        brailleDict = new BrailleDictionary();
    });

    describe('getLetraBraille', () => {
        it('debería retornar "1" para la letra "a"', () => {
            expect(brailleDict.getLetraBraille('a')).to.equal('1');
        });

        it('debería retornar "12456" para la letra "ñ"', () => {
            expect(brailleDict.getLetraBraille('ñ')).to.equal('12456');
        });

        it('debería retornar "1" para la letra "A" (mayúscula)', () => {
            expect(brailleDict.getLetraBraille('A')).to.equal('1');
        });

        it('debería retornar null para una letra que no está en el diccionario', () => {
            expect(brailleDict.getLetraBraille('z')).to.equal('1356');
        });
    });

    describe('getSigno', () => {
        it('debería retornar "3" para el punto "."', () => {
            expect(brailleDict.getSigno('.')).to.equal('3');
        });

        it('debería retornar "235" para el signo de exclamación "!"', () => {
            expect(brailleDict.getSigno('!')).to.equal('235');
        });

        it('debería retornar null para un signo que no está en el diccionario', () => {
            expect(brailleDict.getSigno('=')).to.equal('2356');
        });
    });

    describe('getNumeroBraille', () => {
        it('debería retornar "1" para el número 1 (no computarizado)', () => {
            expect(brailleDict.getNumeroBraille(1, false)).to.equal('1');
        });

        it('debería retornar "16" para el número 1 (computarizado)', () => {
            expect(brailleDict.getNumeroBraille(1, true)).to.equal('16');
        });

        it('debería retornar null para un número que no está en el diccionario', () => {
            expect(brailleDict.getNumeroBraille(10, false)).to.be.null;
        });
    });

    describe('getLetraEspañol', () => {
        it('debería retornar "a" para el Braille "1"', () => {
            expect(brailleDict.getLetraEspañol('1')).to.equal('a');
        });

        it('debería retornar "ñ" para el Braille "12456"', () => {
            expect(brailleDict.getLetraEspañol('12456')).to.equal('ñ');
        });

        it('debería retornar null para un Braille que no está en el diccionario', () => {
            expect(brailleDict.getLetraEspañol('999')).to.be.null;
        });
    });

    describe('getInvertSigno', () => {
        it('debería retornar "." para el Braille "3"', () => {
            expect(brailleDict.getInvertSigno('3')).to.equal('.');
        });

        it('debería retornar "@" para el Braille "5"', () => {
            expect(brailleDict.getInvertSigno('5')).to.equal('@');
        });

        it('debería retornar null para un Braille que no está en el diccionario', () => {
            expect(brailleDict.getInvertSigno('999')).to.be.null;
        });
    });

    describe('getInvertNumeroBraille', () => {
        it('debería retornar 1 para el Braille "1"', () => {
            expect(brailleDict.getInvertNumeroBraille('1')).to.equal(1);
        });

        it('debería retornar 1 para el Braille "16" (computarizado)', () => {
            expect(brailleDict.getInvertNumeroBraille('16')).to.equal(1);
        });

        it('debería retornar null para un Braille que no está en el diccionario', () => {
            expect(brailleDict.getInvertNumeroBraille('999')).to.be.null;
        });
    });
});