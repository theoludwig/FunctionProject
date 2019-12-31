import { calculateAge } from '../functions/fonctions_principales/calculateAge_Function.js';

$(function () {
    $("#birthDateValue").bind("keyup change", () => {
        $('.results').html(calculateAge($('#birthDateValue').val()));
    });

    /* Date Picker */
    $.fn.datepicker.dates['fr'] = {
        days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
        daysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
        daysMin: ["d", "l", "ma", "me", "j", "v", "s"],
        months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        monthsShort: ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
        today: "Aujourd'hui",
        monthsTitle: "Mois",
        clear: "Effacer",
        weekStart: 1,
        format: "dd/mm/yyyy"
    };
    $('.datepicker').datepicker({
        language: 'fr',
        autoclose: false,
        todayHighlight: true
    });
});