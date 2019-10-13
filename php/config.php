<?php 

$currentpage = $_SERVER['PHP_SELF'];

$indexActive = '';
$functionlistActive = '';

switch ($currentpage) {
    case '/index.php':
        $title = 'FunctionProject';
        $description = 'FunctionProject est un projet créé par Divlo qui a pour but de rassembler plein de mini-programme permettant de faire plusieurs choses comme savoir la météo, générer un nombre aléatoire, etc.';
        $image = 'https://function.divlo.fr/img/FunctionProject_icon.png';
        $indexActive = 'active';
        break;
    case '/views/function-list.php':
        $title = 'Liste des fonctions';
        $description = 'La liste des mini-programmes (fonctions JavaScript).';
        $image = 'https://function.divlo.fr/img/FunctionProject_icon.png';
        $functionlistActive = 'active';
        break;
    case '/views/function-views/calculateAge.php':
        $title = 'Quelle âge avez-vous ?';
        $description = "Calcule l'âge de quelqu'un selon la date de naissance.";
        $image = 'https://function.divlo.fr/img/function-image/calculateAge.png';
        break;
    case '/views/function-views/convertDistance.php':
        $title = 'Conversion de Distance';
        $description = 'Convertit la longueur (distance) avec les unités allant de picomètre au Téramètre.';
        $image = 'https://function.divlo.fr/img/function-image/convertDistance.png';
        break;
    case '/views/function-views/convertTemperature.php':
        $title = 'Conversion de Température';
        $description = "Convertit des Degré Celsius en Degré Fahrenheit et l'inverse aussi.";
        $image = 'https://function.divlo.fr/img/function-image/convertTemperature.png';
        break;
    case '/views/function-views/randomNumber.php':
        $title = 'Nombre Aléatoire';
        $description = 'Génère un nombre aléatoire entre un minimum inclus et un maximum inclus.';
        $image = 'https://function.divlo.fr/img/function-image/randomNumber.png';
        break;
    case '/views/function-views/weatherRequest.php':
        $title = 'Météo';
        $description = "Affiche la météo et l'heure locale selon la ville.";
        $image = 'https://function.divlo.fr/img/function-image/weatherRequest.png';
        break;
    case '/views/function-views/filterStudents.php':
        $title = 'Trie les prénoms par leur première lettre';
        $description = "Affiche uniquement les prénoms (qui sont dans la liste) qui commence par la lettre souhaitée.";
        $image = 'https://function.divlo.fr/img/function-image/filterStudents.png';
        break;
    case '/views/function-views/randomQuote.php':
        $title = 'Générateur de citation';
        $description = "Génère aléatoirement une citation ou un proverbe.";
        $image = 'https://function.divlo.fr/img/function-image/randomQuote.png';
        break;
    case '/views/quote-list.php':
        $title = 'Liste des citations';
        $description = "La liste de toutes les citations ou proverbes (aimé par Divlo).";
        $image = 'https://function.divlo.fr/img/function-image/randomQuote.png';
        break;
    case '/views/function-views/convertCurrency.php':
        $title = 'Conversion de devise';
        $description = "Convertis une valeur dans une devise dans une autre devise.";
        $image = 'https://function.divlo.fr/img/function-image/convertCurrency.png';
        break;
    case '/views/function-views/convertEncoding.php':
        $title = "Conversion des Encodages de caractères";
        $description = "Convertis des nombres de différentes bases et convertis en UTF-8.";
        $image = 'https://function.divlo.fr/img/function-image/convertEncoding.png';
        break;
    case '/views/function-views/convertRomanArabicNumbers.php':
        $title = "Conversion d'un nombre arabe en nombre romain";
        $description = "Convertis un nombre arabe en nombre romain (et l'inverse aussi).";
        $image = 'https://function.divlo.fr/img/function-image/convertRomanArabicNumbers.png';
        break;
    case '/views/function-views/armstrongNumber.php':
        $title = "Nombre d'Armstrong";
        $description = "Un nombre d'<a href='https://fr.wikipedia.org/wiki/Nombre_narcissique' target='_blank'>Armstrong</a> est un nombre qui est égal à la somme de ses chiffres portés à la puissance du nombre de chiffres le composant. Cette fonction permet de savoir si un nombre fait partie des nombres d'Armstrong ou non.";
        $image = 'https://function.divlo.fr/img/function-image/armstrongNumber.png';
        break; 
    case '/views/function-views/heapAlgorithm.php':
        $title = "Heap's algorithm";
        $description = "<a href='https://en.wikipedia.org/wiki/Heap%27s_algorithm' target='_blank'>Heap's algorithm</a> est un algorithme qui génère toutes les permutations unique possibles d'une châine de caractère, c'est en quelque sorte toutes les possibilités d'anagramme d'un mot (en changeant de place les lettres d’un mot, permet d’en créer un nouveau), par contre les mots n'ont pas besoin d'être de vrais mots qui ont du sens.";
        $image = 'https://function.divlo.fr/img/function-image/heapAlgorithm.png';
        break; 
    default:
        $title = 'Erreur 404';
        $description = "Cette page n'existe pas!";
        $image = 'https://function.divlo.fr/img/error404.png';
}

?>