$(function () {  
    /* Permet d'afficher la liste des citations/proverbes */
    $('.totalLengthQuote').html('Total de ' + quotes.length + ' citations.');
    let resultat = "";
    for (index in quotes) {
        resultat = resultat + `<tr> <td class="quote-element-list important">${quotes[index]["source"]}</td> <td class="quote-element-list">${quotes[index]["quote"]}</td> </tr>`;
    }
    $(".quote-list").append(resultat);
});