$(function () {
    /* Apparition au défilement avec animation */
    function setWindowScrollAppear() {
        var $animate = $('.animate-up, .animate-down, .animate-left, .animate-right');
        $animate.appear();
        $animate.on('appear', function (event, affected) {
            for (var i = 0; i < affected.length; i++) {
                $(affected[i]).addClass('animated');
            }
        });
        $.force_appear();
    }
    setWindowScrollAppear();
});