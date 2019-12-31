// Convertis des nombres de différentes bases et convertis en UTF-8. (source : http://jsfiddle.net/47zwb41o)
/** 
 * @function decimalToBinary
 * @description Convertis un nombre décimal en binaire.
 * @param {string} value - Le nombre à convertir en string
 * @returns {string} - Le nombre en binaire
 * @example decimalToBinary('2') → '10'
 */
function decimalToBinary(value) {
    value = value.replace(" ", "");
    value = Number(value);
    if (isNaN(value)) {
        return messageError;
    } else {
        return value.toString(2);
    }
} 

/** 
 * @function binaryToDecimal
 * @description Convertis un nombre binaire en décimal.
 * @requires {@link fonctions_annexes.js: formatNumberResult} 
 * @param {string} value - Le nombre à convertir
 * @returns {(number|string)} - Le nombre en décimal soit en nombre ou soit en string si supérieur à 1000 car pour 1000 par exemple formatNumberResult renvoie '1 000'
 * @example binaryToDecimal('10') → 2
 */
function binaryToDecimal(value) {
    const result = parseInt(Number(value), 2);
    if (isNaN(result)) {
        return messageError;
    } else {
        return formatNumberResult(result);
    }
} 

/** 
 * @function decimalToHexadecimal
 * @description Convertis un nombre décimal en hexadécimal.
 * @param {string} value - Le nombre à convertir 
 * @returns {string} - Le nombre en hexadécimal
 * @example decimalToHexadecimal('15') → 'F'
 */
function decimalToHexadecimal(value) {
    value = value.replace(" ", "");
    value = Number(value);
    if (isNaN(value)) {
        return messageError;
    } else {
        return value.toString(16).toUpperCase();
    }
} 

/** 
 * @function hexadecimalToDecimal
 * @description Convertis un nombre hexadécimal en décimal.
 * @requires {@link fonctions_annexes.js: formatNumberResult} 
 * @param {string} value - Le nombre à convertir
 * @returns {(number|string)} - Le nombre en décimal soit en nombre ou soit en string si supérieur à 1000 car pour 1000 par exemple formatNumberResult renvoie '1 000'
 * @example hexadecimalToDecimal('F') → 15
 */
function hexadecimalToDecimal(value) {
    const result = parseInt(value, 16);
    if (isNaN(result)) {
        return messageError;
    } else {
        return formatNumberResult(result);
    }
} 

/** 
 * @function binaryToHexadecimal
 * @description Convertis un nombre binaire en hexadécimal. 
 * @param {string} value - Le nombre à convertir
 * @returns {string} - Le nombre en hexadécimal
 * @example binaryToHexadecimal('1111') → 'F'
 */ 
function binaryToHexadecimal(value) {
    value = Number(value);
    value = parseInt(value, 2);
    if (isNaN(value)) {
        return messageError;
    } else {
        return parseInt(value).toString(16).toUpperCase();
    }   
}

/** 
 * @function hexadecimalToBinary
 * @description Convertis un nombre hexadécimal en binaire. 
 * @param {string} value - Le nombre à convertir
 * @returns {string} - Le nombre en binaire
 * @example hexadecimalToBinary('F') → '1111'
 */ 
function hexadecimalToBinary(value) {
    value = parseInt(value, 16);
    if (isNaN(value)) {
        return messageError;
    } else {
        return parseInt(value).toString(2);
    }
} 

/** 
 * @function textToNumberUnicode
 * @description Convertis chaque caractère d'une string en codePoint Unicode. 
 * @param {string} value - La chaîne de caractère à convertir
 * @returns {string}
 * @example textToNumberUnicode('abc') → '97 98 99'
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
        return messageError;
    }
}

/** 
 * @function numberUnicodeToText
 * @description Convertis chaque codePoint Unicode en caractère. 
 * @param {string} string - Nombre Unicode à convertir espacé par un espace à chaque fois
 * @returns {string}
 * @example numberUnicodeToText('97 98 99') → 'abc'
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
        return messageError;
    }
}

/** 
 * @function textToBinary
 * @description Convertis un Texte en Binaire (UTF-8).
 * @param {string} s - La chaîne de caractère à convertir
 * @returns {string}
 * @example textToBinary('abc') → '01100001 01100010 01100011'
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
        return s;
    }
}

/** 
 * @function binaryToText
 * @description Convertis du Binaire (UTF-8) en Texte.
 * @param {string} s - La chaîne de caractère contenant tous les octets à convertir
 * @returns {string}
 * @example binaryToText('01100001 01100010 01100011') → 'abc'
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
        return s;
    }
} 

/** 
 * @function textToHexadecimal
 * @description Convertis un Texte en Hexadécimal (UTF-8).
 * @param {string} s - La chaîne de caractère à convertir
 * @returns {string}
 * @example textToHexadecimal('abc') → '61 62 63'
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
        return s;
    }
}

/** 
 * @function hexadecimalToText
 * @description Convertis de l'Hexadécimal (UTF-8) en Texte.
 * @param {string} s - La chaîne de caractère contenant tous les nombres Hexadécimal à convertir
 * @returns {string}
 * @example hexadecimalToText('61 62 63') → 'abc'
 */
function hexadecimalToText (s) {
    try {
        s = s.replace(/\s/g,'');
        return decodeURIComponent( s.replace( /../g, '%$&' ) );
    }
	catch (error) {
        return s;
    }
}

/* Exports */
export { decimalToBinary, binaryToDecimal, decimalToHexadecimal, hexadecimalToDecimal, binaryToHexadecimal, hexadecimalToBinary, textToNumberUnicode, numberUnicodeToText, textToBinary, binaryToText, textToHexadecimal, hexadecimalToText };