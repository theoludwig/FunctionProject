import { convertArabicToRoman, convertRomanToArabic } from '../functions/fonctions_principales/convertRomanArabicNumbers_Functions.js';

$(function () {
    $("#convertRomanArabicNumbersForm").submit((event) => {
        event.preventDefault();
        let numbersValue = $('#numbersArabic').val();
        numbersValue = numbersValue.replace(/\s/g,'');
        const convertNumberType = $("#convertNumberType option:selected").text();
        if(isEmptyValue(numbersValue)) {
            $('.results').html(emptyMessageError);
        }
        else if (!isNaN(Number(numbersValue))) { 
            if (convertNumberType === "Nombre Romain") {
                const result = convertArabicToRoman(parseInt(numbersValue));
                let numbersValueFormat = formatNumberResult(numbersValue);
                if (result === messageError || isFloat(numbersValue)) {
                    $('.results').html(messageError);
                } else {
                    $('.results').html(`<b>${numbersValueFormat}</b> s'écrit <b>${result}</b> en chiffres romains.`);
                }
            } else {
                $('.results').html(`<b>${numbersValue}</b> est déjà en chiffres arabes.`);
            }
        }
        else if (convertNumberType === "Nombre Arabe") {
            const result = convertRomanToArabic(numbersValue.toUpperCase());
            if (result === 0) {
                $('.results').html(messageError);
            } else {
                $('.results').html(`<b>${numbersValue}</b> s'écrit <b>${formatNumberResult(result)}</b> en chiffres arabes.`);
            }
        }
        else {
            $('.results').html(messageError);
        }
    });
});