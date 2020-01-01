import { texteFonctionChange } from '../variables/homeFunctionExample.js';

$(function () {  
    /* Changement du texte accueil (exemples de fonction) */
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
    setInterval(change, 10000);
});