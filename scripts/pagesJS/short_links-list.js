$(function () {  
    /* Permet d'afficher la liste des liens récemment raccourcit */
    try  {
        const shortcuts = JSON.parse(getCookieValue("shortcuts"));
        window.onload = $('.totalLengthLinksList').html(`Total de ${shortcuts.length} lien(s) raccourcit récemment.`);
        let resultat = "";
        for (element of shortcuts) {
            resultat += `<tr> <td class="original-link-list"><a href="${element["url"]}" target="_blank">${element["url"]}</a></td> <td class="link-list"><a href="${element["shortcut"]}" target="_blank">${element["shortcut"]}</a></td> </tr>`;
        }
        $(".links-list").append(resultat);
    } catch(error) {}
});