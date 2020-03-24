const errorHandling                    = require('../../utils/errorHandling');
const { requiredFields, generalError } = require('../../config/errors');

/** 
 * @description Convertis un nombre décimal en binaire.
 * @param {String} value - Le nombre à convertir en string
 * @returns {String} - Le nombre en binaire
 * @examples decimalToBinary('2') → '10'
 */
function decimalToBinary(value) {
    value = Number(value);
    if (isNaN(value)) {
        return false;
    } else {
        return value.toString(2);
    }
} 

/** 
 * @description Convertis un nombre binaire en décimal.
 * @param {String} value - Le nombre à convertir
 * @returns {(Number|String)} - Le nombre en décimal soit en nombre ou soit en string si supérieur à 1000 car pour 1000 par exemple formatNumberResult renvoie '1 000'
 * @examples binaryToDecimal('10') → 2
 */
function binaryToDecimal(value) {
    const result = parseInt(Number(value), 2);
    if (isNaN(result)) {
        return false;
    } else {
        return result;
    }
} 

/** 
 * @description Convertis un nombre décimal en hexadécimal.
 * @param {String} value - Le nombre à convertir 
 * @returns {String} - Le nombre en hexadécimal
 * @examples decimalToHexadecimal('15') → 'F'
 */
function decimalToHexadecimal(value) {
    value = Number(value);
    if (isNaN(value)) {
        return false;
    } else {
        return value.toString(16).toUpperCase();
    }
} 

/** 
 * @description Convertis un nombre hexadécimal en décimal.
 * @param {String} value - Le nombre à convertir
 * @returns {(Number|String)} - Le nombre en décimal soit en nombre ou soit en string si supérieur à 1000 car pour 1000 par exemple formatNumberResult renvoie '1 000'
 * @examples hexadecimalToDecimal('F') → 15
 */
function hexadecimalToDecimal(value) {
    const result = parseInt(value, 16);
    if (isNaN(result)) {
        return false;
    } else {
        return result;
    }
} 

/** 
 * @description Convertis un nombre binaire en hexadécimal. 
 * @param {String} value - Le nombre à convertir
 * @returns {String} - Le nombre en hexadécimal
 * @examples binaryToHexadecimal('1111') → 'F'
 */ 
function binaryToHexadecimal(value) {
    value = Number(value);
    value = parseInt(value, 2);
    if (isNaN(value)) {
        return false;
    } else {
        return parseInt(value).toString(16).toUpperCase();
    }   
}

/** 
 * @description Convertis un nombre hexadécimal en binaire. 
 * @param {String} value - Le nombre à convertir
 * @returns {String} - Le nombre en binaire
 * @examples hexadecimalToBinary('F') → '1111'
 */ 
function hexadecimalToBinary(value) {
    value = parseInt(value, 16);
    if (isNaN(value)) {
        return false;
    } else {
        return parseInt(value).toString(2);
    }
} 

// Convertis des nombres de différentes bases et convertis en UTF-8. (source : http://jsfiddle.net/47zwb41o)

/** 
 * @description Convertis chaque caractère d'une string en codePoint Unicode. 
 * @param {String} value - La chaîne de caractère à convertir
 * @returns {String}
 * @examples textToNumberUnicode('abc') → '97 98 99'
 */ 
function textToNumberUnicode(string) {
    try {
        let resultat = "";
        for (let index in string) {
          resultat = resultat + string.codePointAt(index) + " ";
        }
        return resultat;
    }
    catch(error) {
        return false;
    }
}

/** 
 * @description Convertis chaque codePoint Unicode en caractère. 
 * @param {String} string - Nombre Unicode à convertir espacé par un espace à chaque fois
 * @returns {String}
 * @examples numberUnicodeToText('97 98 99') → 'abc'
 */  
function numberUnicodeToText(string) {
    try {
        const array = string.split(" ");
        let resultat = "";
        for (let index in array) {
          resultat = resultat + String.fromCodePoint(parseInt(array[index]).toString());
        }
        return resultat;
    }
    catch(error) {
        return false;
    }
}

/** 
 * @description Convertis un Texte en Binaire (UTF-8).
 * @param {String} s - La chaîne de caractère à convertir
 * @returns {String}
 * @examples textToBinary('abc') → '01100001 01100010 01100011'
 */
function textToBinary(s) {
    try {
        s = unescape( encodeURIComponent(s));
        let chr, i = 0, l = s.length, out = '';
        for( ; i < l; i ++ ){
            chr = s.charCodeAt( i ).toString(2);
            while(chr.length % 8 != 0 ){ chr = '0' + chr; }
            out += chr;
        }
        return out.replace(/(\d{8})/g, '$1 ').replace(/(^\s+|\s+$)/,'');
    } catch (error) {
        return false;
    }
}

/** 
 * @description Convertis du Binaire (UTF-8) en Texte.
 * @param {String} s - La chaîne de caractère contenant tous les octets à convertir
 * @returns {String}
 * @examples binaryToText('01100001 01100010 01100011') → 'abc'
 */
function binaryToText(s){
    try {
        s = s.replace(/\s/g,'')
        let i = 0, l = s.length, chr, out = '';
        for( ; i < l; i += 8){
            chr = parseInt( s.substr(i, 8 ), 2).toString(16);
            out += '%' + ((chr.length % 2 == 0) ? chr : '0' + chr);
        }
        return decodeURIComponent(out);
    } catch (error) {
        return false;
    }
} 

/** 
 * @description Convertis un Texte en Hexadécimal (UTF-8).
 * @param {String} s - La chaîne de caractère à convertir
 * @returns {String}
 * @examples textToHexadecimal('abc') → '61 62 63'
 */
function textToHexadecimal (s) {
    try {
        s = unescape( encodeURIComponent( s ) );
        let chr, i = 0, l = s.length, out = '';
        for( ; i < l; i++ ){
            chr = s.charCodeAt( i ).toString( 16 );
            out += ( chr.length % 2 == 0 ) ? chr : '0' + chr;
            out += " ";
        }
        return out.toUpperCase();
    }
    catch (error) {
        return false;
    }
}

/** 
 * @description Convertis de l'Hexadécimal (UTF-8) en Texte.
 * @param {String} s - La chaîne de caractère contenant tous les nombres Hexadécimal à convertir
 * @returns {String}
 * @examples hexadecimalToText('61 62 63') → 'abc'
 */
function hexadecimalToText (s) {
    try {
        s = s.replace(/\s/g,'');
        return decodeURIComponent( s.replace( /../g, '%$&' ) );
    }
	catch (error) {
        return false;
    }
}

/* OUTPUTS */
const convertEncoding = { decimalToBinary, binaryToDecimal, decimalToHexadecimal, hexadecimalToDecimal, binaryToHexadecimal, hexadecimalToBinary, textToNumberUnicode, numberUnicodeToText, textToBinary, binaryToText, textToHexadecimal, hexadecimalToText };

function executeFunction(option, value) {
    return convertEncoding[option](value);
}

exports.convertEncodingOutput = ({ res, next }, argsObject) => {
    let { value, functionName } = argsObject;
    
    // S'il n'y a pas les champs obligatoire
    if (!(value && functionName)) {
        return errorHandling(next, requiredFields);
    }

    // Si la fonction de convertEncoding n'existe pas
    if (!convertEncoding.hasOwnProperty(functionName)) {
        return errorHandling(next, { message: "Cette conversion de convertEncoding n'existe pas." });
    } 

    const result = executeFunction(functionName, value);

    // Mauvaise valeur entrée
    if (!result) {
        return errorHandling(next, generalError);
    }

    return res.status(200).json({ result, resultHTML: `<p>${result}</p>` });
}