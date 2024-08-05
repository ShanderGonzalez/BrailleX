import { expect as _expect } from 'chai';
const expect = _expect;
import Validator from '../app/services/validate.js';

describe('Validator', () => {
    let validator;

    before(() => {
        validator = new Validator();
    });

    describe('isValidEmail', () => {
        it('debería retornar true para un correo válido', () => {
            expect(validator.isValidEmail('test@example.com')).to.be.true;
        });

        it('debería retornar false para un correo inválido', () => {
            expect(validator.isValidEmail('invalid-email')).to.be.false;
        });
    });

    describe('isValidURL', () => {
        it('debería retornar true para una URL válida', () => {
            expect(validator.isValidURL('http://www.example.com')).to.be.true;
        });

        it('debería retornar false para una URL inválida', () => {
            expect(validator.isValidURL('invalid-url')).to.be.false;
        });
    });

    describe('isValidTag', () => {
        it('debería retornar true para una etiqueta válida', () => {
            expect(validator.isValidTag('#validTag')).to.be.true;
        });

        it('debería retornar false para una etiqueta inválida', () => {
            expect(validator.isValidTag('invalidTag')).to.be.false;
        });
    });

    describe('isLetter', () => {
        it('debería retornar true para un carácter que es una letra', () => {
            expect(validator.isLetter('a')).to.be.true;
        });

        it('debería retornar false para un carácter que no es una letra', () => {
            expect(validator.isLetter('1')).to.be.false;
        });
    });

    describe('isNumber', () => {
        it('debería retornar true para un carácter que es un número', () => {
            expect(validator.isNumber('1')).to.be.true;
        });

        it('debería retornar false para un carácter que no es un número', () => {
            expect(validator.isNumber('a')).to.be.false;
        });
    });

    describe('isSpace', () => {
        it('debería retornar true para un carácter que es un espacio', () => {
            expect(validator.isSpace(' ')).to.be.true;
        });

        it('debería retornar false para un carácter que no es un espacio', () => {
            expect(validator.isSpace('a')).to.be.false;
        });
    });

    describe('isUpperCase', () => {
        it('debería retornar true para una palabra en mayúsculas', () => {
            expect(validator.isUpperCase('HELLO')).to.be.true;
        });

        it('debería retornar false para una palabra que no está en mayúsculas', () => {
            expect(validator.isUpperCase('Hello')).to.be.false;
        });
    });

    describe('isDecimalPoint', () => {
        it('debería retornar true para un punto decimal en un número', () => {
            expect(validator.isDecimalPoint('.', '3.14', 1)).to.be.true;
        });

        it('debería retornar false para un punto que no es decimal', () => {
            expect(validator.isDecimalPoint('.', '3.14', 0)).to.be.false;
            expect(validator.isDecimalPoint('.', '3.14', 3)).to.be.false;
        });
    });
});
