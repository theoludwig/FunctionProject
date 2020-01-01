import { heapAlgorithm } from '../functions/fonctions_principales/heapAlgorithm_Function.js';
import { isEmptyValue } from '../functions/fonctions_annexes/isEmptyValue_Function.js';
import { formatNumberResult } from '../functions/fonctions_annexes/formatNumberResult_Function.js';

$(function () {
    $("#heapAlgorithmForm").submit((event) => {
        event.preventDefault();
        const value = $('#value').val();
        if(isEmptyValue(value)) {
            $('.results').html(emptyMessageError);
        }
        else {
            const start = new Date();
            const stringPermutationsResult = heapAlgorithm(value);
            let result = "";
            for (let element in stringPermutationsResult) {
                result = result + stringPermutationsResult[element] + "<br>";
            }
            const end = new Date();
            $('.results').html(`Temps d'éxecution du script : ${end - start} ms. <br>Il y a ${formatNumberResult(stringPermutationsResult.length)} possibilités d'anagramme pour le mot "${value}" qui contient ${value.length} caractères, la liste : <br><br> ${result}`);
        }
    });
});