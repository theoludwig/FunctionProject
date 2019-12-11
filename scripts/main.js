$(function () {
    /* Changement du texte accueil (exemples de fonction) */
    if(chemin === "/" || chemin === '/index.php') {
        let index=-1;
        function change() {
            if(index === texteFonctionChange.length-1) {
                index = 0;
            }
            else {
                index++;
            }
            document.getElementById("change").innerHTML = texteFonctionChange[index];
        }
        setInterval(change,10000);
    }

    /* Changement du logo du header selon la largeur de la fenêtre */
    function widthWindowChange() {
        const windowWidth = $(window).width();
        if(windowWidth < 463){
            $('#logo-header').attr('src', '/img/FunctionProject_icon.png');
            $('#logo-header').attr('style', 'display: inline-block;width: 80%;');
            $('.navbar-brand').attr('style', 'width: 30%;');
        }
        else {
            $('#logo-header').attr('src', '/img/FunctionProject_brand-logo.png');
            $('#logo-header').removeAttr('style');
            $('.navbar-brand').removeAttr('style');
        }
    }
    $(window).resize(widthWindowChange);
    widthWindowChange();
    
    /* Permet d'afficher l'heure en temps réel sur le footer */
    realDateTime('realDateTime');

    /* Window Scroll Top Button */
    const $btnScrollTop = $('.scroll-top-arrow');
    $btnScrollTop.on('click', function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
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