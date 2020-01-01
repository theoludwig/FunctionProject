import { filterStudents } from '../functions/fonctions_principales/filterStudents_Function.js';
import { isEmptyValue } from '../functions/fonctions_annexes/isEmptyValue_Function.js';
import { capitalize } from '../functions/fonctions_annexes/capitalize_Function.js';

$(function () {
    $("#filterStudentsForm").submit((event) => {
        event.preventDefault();
        const nameEntered = $('#nameEntered').val();
        let filteredLetter = $("#filteredLetter").val();
        if(isEmptyValue(nameEntered) || isEmptyValue(filteredLetter)) {
            $('.results').html(emptyMessageError);
        }
        else if(filteredLetter.length === 1) {
            const students = nameEntered.split(', ');
            filteredLetter = capitalize(filteredLetter);
            $('.results').html(filterStudents(filteredLetter, students));
        }
        else {
            $('.results').html(messageError);
        }
    });
});