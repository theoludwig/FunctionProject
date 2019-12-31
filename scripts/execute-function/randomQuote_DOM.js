import { randomQuote } from '../functions/fonctions_principales/randomQuote_Function.js';

$(function () {
    function showQuote() {
        const randomQuoteChosen = randomQuote();
        const quote = randomQuoteChosen.quote;
        const source = randomQuoteChosen.source;
        $('.resultsRandomQuote').html(`<p id="citation">" ${quote} "</p> <p id="auteur"> - ${source} </p>`);    
        $('#twitterLink').attr('href', `https://twitter.com/intent/tweet?text="${quote}" - ${source}&via=Divlo_FR&hashtags=citation,FunctionProject&url=https://function.divlo.fr/views/function-views/randomQuote.php`);
    }

    $("#submitRandomQuote").click(() => {
        showQuote();
    });
    // Affichage d'une citation au chargement de la page 
    showQuote();
});