$(function () {
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
    
    /** 
     * @function realDateTime
     * @description Affiche l'heure en temps réel.
     * @param {HTMLElement} htmlElement
     * @returns {boolean} true → Toujours true
     */
    function realDateTime(htmlElement) {
        const realDateTimeNow = new Date;
        // const year    = realDateTimeNow.getFullYear();
        // const month   = ('0'+(realDateTimeNow.getMonth()+1)).slice(-2);
        // const day     = ('0'+realDateTimeNow.getDate()).slice(-2);
        const hour    = ('0'+realDateTimeNow.getHours()).slice(-2);
        const minute  = ('0'+realDateTimeNow.getMinutes()).slice(-2);
        const second  = ('0'+realDateTimeNow.getSeconds()).slice(-2);

        const resultat = hour + ":" + minute + ":" + second;

        htmlElement.innerHTML = resultat;
        setTimeout(() => {
            realDateTime(htmlElement);
        }, 1000);
        return true;
    }
    /* Permet d'afficher l'heure en temps réel sur le footer */
    realDateTime(document.getElementById('realDateTime'));

    /* Scroll agréable (flèche footer) */
    const $btnScrollTop = $('.scroll-top-arrow');
    $btnScrollTop.on('click', function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
});

/* Messages d'erreur */
const emptyMessageError = "Vous ne pouvez pas rentré de valeur vide.";
const messageError = "Vous n'avez pas rentré de valeur valide.";