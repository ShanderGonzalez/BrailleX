class BrailleDictionary {
    constructor() {
        this.alfabetoBrailleEspanol = {
            'a': '1',
            'b': '12',
            'c': '14',
            'd': '145',
            'e': '15',
            'f': '124',
            'g': '1245',
            'h': '125',
            'i': '24',
            'j': '245',
            'k': '13',
            'l': '123',
            'm': '134',
            'n': '1345',
            'ñ': '12456',
            'o': '135',
            'p': '1234',
            'q': '12345',
            'r': '1235',
            's': '234',
            't': '2345',
            'u': '136',
            'v': '1236',
            'w': '2456',
            'x': '1346',
            'y': '13456',
            'z': '1356',
            'á': '12356',
            'é': '2346',
            'í': '34',
            'ó': '346',
            'ú': '23456',
            'ü': '1256'
        };

        this.alfabetoBrailleEspanolMayus = {
            'A': '1',
            'B': '12',
            'C': '14',
            'D': '145',
            'E': '15',
            'F': '124',
            'G': '1245',
            'H': '125',
            'I': '24',
            'J': '245',
            'K': '13',
            'L': '123',
            'M': '134',
            'N': '1345',
            'Ñ': '12456',
            'O': '135',
            'P': '1234',
            'Q': '12345',
            'R': '1235',
            'S': '234',
            'T': '2345',
            'U': '136',
            'V': '1236',
            'W': '2456',
            'X': '1346',
            'Y': '13456',
            'Z': '1356',
            'Á': '12356',
            'É': '2346',
            'Í': '34',
            'Ó': '346',
            'Ú': '23456'
        };

        this.signosPuntuacion = {
            ".": "3",
            ",": "2",
            ";": "23",
            ":": "25",
            "¿": "26",
            "?": "26",
            "!": "235",
            "¡": "235",
            "\"": "236",
            "«": "236",
            "»": "236",
            "'": "6 236",
            "(": "126",
            ")": "345"
        };

        this.signosAuxiliares = {
            "[": "12356",
            "]": "23456",
            "{": "5 123",
            "}": "456 2",
            "-": "36",
            "—": "36 36",
            "*": "35",
            '+': '235',
            '=': '2356',
            "/": "6 2",
            "//": "6 26 2",
            "\\": "5 3",
            "\\\\": "5 35 3",
            "<": "5 13",
            ">": "46 2",
            "&": "12346",
            "#": "3456",
            "@": "5",
            "_": "6",
            "%": "456",
            "^": "45",
            "$": "456 234",
            "€": "456 15"
        };

        this.numerosBraille = {
            '0': '1456',
            '1': '1',
            '2': '12',
            '3': '14',
            '4': '145',
            '5': '15',
            '6': '124',
            '7': '1245',
            '8': '125',
            '9': '24'
        };

        this.numeroComputarizado = {
            '0': '346',
            '1': '16',
            '2': '126',
            '3': '146',
            '4': '1456',
            '5': '156',
            '6': '1246',
            '7': '12456',
            '8': '1256',
            '9': '246'
        };
    }

    getLetraBraille(letra) {
        if (this.alfabetoBrailleEspanol[letra]) {
            return this.alfabetoBrailleEspanol[letra];
        } else if (this.alfabetoBrailleEspanolMayus[letra]) {
            return this.alfabetoBrailleEspanolMayus[letra];
        } else {
            return null;
        }
    }

    getSigno(signo) {
        if (this.signosPuntuacion[signo]) {
            return this.signosPuntuacion[signo];
        } else if (this.signosAuxiliares[signo]) {
            return this.signosAuxiliares[signo];
        } else {
            return null;
        }
    }

    getNumeroBraille(numero, esNumComp) {
        if (this.numerosBraille[numero] && !esNumComp) {
            return this.numerosBraille[numero];
        } else if (this.numeroComputarizado[numero] && esNumComp) {
            return this.numeroComputarizado[numero];
        } else {
            return null;
        }
    }
}

export default BrailleDictionary;
