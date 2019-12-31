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
    
    /* Permet d'afficher l'heure en temps réel sur le footer */
    realDateTime('realDateTime');

    /* Window Scroll Top Button */
    const $btnScrollTop = $('.scroll-top-arrow');
    $btnScrollTop.on('click', function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
});