import { decimalToBinary, binaryToDecimal, decimalToHexadecimal, hexadecimalToDecimal, binaryToHexadecimal, hexadecimalToBinary, textToNumberUnicode, numberUnicodeToText, textToBinary, binaryToText, textToHexadecimal, hexadecimalToText } from '../functions/fonctions_principales/convertEncoding_Functions.js';
import { isEmptyValue } from '../functions/fonctions_annexes/isEmptyValue_Function.js';

$(function () {
    $("#convertEncodingForm").submit((event) => {
        event.preventDefault();
        const value = $('#value').val();
        const option = $("#option option:selected").val();
        if(isEmptyValue(value)) {
            $('.results').html(messageError);
        }
        else {
            // Objet qui recense toutes les fonctions de convertEncoding
            const convertEncoding = { decimalToBinary, binaryToDecimal, decimalToHexadecimal, hexadecimalToDecimal, binaryToHexadecimal, hexadecimalToBinary, textToNumberUnicode, numberUnicodeToText, textToBinary, binaryToText, textToHexadecimal, hexadecimalToText };
            try {
                function executionFunction(option, value) {
                    return convertEncoding[option](value);
                }
                $('.results').html(executionFunction(option, value));
            } catch (error) {
                $('.results').html(messageError);
            }
        }
    });
});