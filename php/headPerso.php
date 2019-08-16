<?php 

$currentpage = $_SERVER['PHP_SELF'];

switch ($currentpage) {
    case '/index.php':
        $title = 'FunctionProject';
        $description = 'FunctionProject est un projet créé par Divlo qui a pour but de rassembler plein de mini-programme (fonctions JavaScript) permettant de faire plusieurs choses comme savoir la météo, générer un nombre aléatoire, etc.';
        break;
    case '/views/function-list.php':
        $title = 'Liste des fonctions';
        $description = '';
        break;
    case '/views/error404.php':
        $title = 'Erreur 404';
        $description = '';
        break;
    case '/views/function-views/calculateAge.php':
        $title = 'Quelle âge avez-vous ?';
        $description = "Calcule l'âge de quelqu'un selon la date de naissance.";
        break;
    case '/views/function-views/convertDistance.php':
        $title = 'Conversion de Distance';
        $description = 'Convertit la longueur (distance) avec les unités allant de picomètre au Téramètre.';
        break;
    case '/views/function-views/convertTemperature.php':
        $title = 'Conversion de Température';
        $description = "Convertit des Degré Celsius en Degré Fahrenheit et l'inverse aussi.";
        break;
    case '/views/function-views/randomNumber.php':
        $title = 'Nombre Aléatoire';
        $description = 'Génère un nombre aléatoire entre un minimum inclus et un maximum inclus.';
        break;
    case '/views/function-views/weatherRequest.php':
        $title = 'Météo';
        $description = "Affiche la météo et l'heure local selon la ville.";
        break;
    default:
        $title = 'Erreur 404';
        $description = "Cette page n'existe pas!";
}

?>