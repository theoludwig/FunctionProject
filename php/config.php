<?php 

$currentpage = $_SERVER['PHP_SELF'];

$indexActive = '';
$functionlistActive = '';

switch ($currentpage) {
    case '/index.php':
        $title = 'FunctionProject';
        $description = 'FunctionProject est un projet créé par Divlo qui a pour but de rassembler plein de mini-programme (fonctions JavaScript) permettant de faire plusieurs choses comme savoir la météo, générer un nombre aléatoire, etc.';
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
        $description = "Affiche la météo et l'heure local selon la ville.";
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
        $description = "Convertis des euros (€) dans une autre devise.";
        $image = 'https://function.divlo.fr/img/function-image/convertCurrency.png';
        break;
    default:
        $title = 'Erreur 404';
        $description = "Cette page n'existe pas!";
        $image = 'https://function.divlo.fr/img/error404.png';
}

?>