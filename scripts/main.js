$(function () {

    /* Apparition au défilement avec animation */
    function setWindowScrollAppear() {
        var $animate = $('.animate-up, .animate-down, .animate-left, .animate-right');
        $animate.appear();
        $animate.on('appear', function (event, affected) {
            for (var i = 0; i < affected.length; i++) {
                console.log(affected[i]);
                $(affected[i]).addClass('animated');
            }
        });
        $.force_appear();
    }
    setWindowScrollAppear();

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

    /* Permet d'afficher la liste des citations/proverbes */
    if(chemin === "/views/quote-list.php") {
        $('.totalLengthQuote').html('Total de ' + quotes.length + ' citations.');
        let resultat = "";
        for (index in quotes) {
            resultat = resultat + `<tr> <td class="quote-element-list important">${quotes[index]["source"]}</td> <td class="quote-element-list">${quotes[index]["quote"]}</td> </tr>`;
        }
        $(".quote-list").append(resultat);
    }

    /* Permet d'afficher la liste des liens récemment raccourcit */
    if(chemin === "/views/short_links-list.php") {
        try  {
            const shortcuts = JSON.parse(getCookieValue("shortcuts"));
            window.onload = $('.totalLengthLinksList').html(`Total de ${shortcuts.length} lien(s) raccourcit récemment.`);
            let resultat = "";
            for (element of shortcuts) {
                resultat += `<tr> <td class="original-link-list"><a href="${element["url"]}" target="_blank">${element["url"]}</a></td> <td class="link-list"><a href="${element["shortcut"]}" target="_blank">${element["shortcut"]}</a></td> </tr>`;
            }
            $(".links-list").append(resultat);
        } catch(error) {}
    }

    /* Window Scroll Top Button */
    const $btnScrollTop = $('.scroll-top-arrow');
    $btnScrollTop.on('click', function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    // Affiche l'input selon le choix de l'utilisateur sur la page linkShortener
    if(chemin === '/views/function-views/linkShortener.php') {
        $('.hideUserShortcut').hide();
        $("#option").bind("keyup change", () => {
            if ($("#option").val() == "userShortcut") {
                $('.hideUserShortcut').show();
            } else {
                $('.hideUserShortcut').hide();
            }
        });
    }

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