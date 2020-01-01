<?php 

$currentpage = $_SERVER['PHP_SELF'];

$indexActive = '';
$functionlistActive = '';
$feedbackActive = '';
$toDoListCSS = false;
$scripts = array();

switch ($currentpage) {
    case '/index.php':
        $title = 'FunctionProject';
        $description = 'FunctionProject est un projet créé par Divlo qui a pour but de rassembler plein de mini-programme permettant de faire plusieurs choses comme savoir la météo, générer un nombre aléatoire, etc.';
        $image = 'https://function.divlo.fr/img/FunctionProject_icon.png';
        $indexActive = 'active';
        $scripts = array('<script type="module" defer src="/scripts/pagesJS/home-page.js"></script>');
        break;
    case '/views/function-list.php':
        $title = 'Liste des fonctions';
        $description = 'La liste des mini-programmes.';
        $image = 'https://function.divlo.fr/img/FunctionProject_icon.png';
        $functionlistActive = 'active';
        $scripts = array('<script defer src="/scripts/libs/plugins/jquery.appear.min.js"></script>', '<script type="module" defer src="/scripts/pagesJS/functions-list.js"></script>');
        break;
    case '/views/feedback-form_view.php':
        $title = 'Feedback Formulaire';
        $description = "Vous pouvez m'envoyer votre avis sur le projet grâce à ce formulaire 📝.";
        $image = 'https://function.divlo.fr/img/Feedback-Formulaire.png';
        $feedbackActive = 'active';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/feedbackForm_DOM.js"></script>');
        break;
    case '/views/feedback-list.php':
        $title = 'Liste des feedback';
        $description = "La liste de tous les feedbacks publiés.";
        $image = 'https://function.divlo.fr/img/Feedback-Formulaire.png';
        break;
    case '/views/function-views/calculateAge.php':
        $title = 'Quel âge avez-vous ?';
        $description = "Calcule l'âge selon la date de naissance.";
        $image = 'https://function.divlo.fr/img/function-image/calculateAge.png';
        $scripts = array('<script defer src="/scripts/libs/moment.js"></script>', '<script defer src="/scripts/libs/jquery-ui-min.js"></script>', '<script defer src="/scripts/libs/bootstrap-datepicker-min.js"></script>', '<script type="module" defer src="/scripts/execute-function/calculateAge_DOM.js"></script>');
        break;
    case '/views/function-views/convertDistance.php':
        $title = 'Conversion de Distance';
        $description = 'Convertis la longueur (distance) avec les unités allant de picomètre au Téramètre.';
        $image = 'https://function.divlo.fr/img/function-image/convertDistance.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/convertDistance_DOM.js"></script>');
        break;
    case '/views/function-views/convertTemperature.php':
        $title = 'Conversion de Température';
        $description = "Convertis des Degré Celsius en Degré Fahrenheit et l'inverse aussi.";
        $image = 'https://function.divlo.fr/img/function-image/convertTemperature.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/convertTemperature_DOM.js"></script>');
        break;
    case '/views/function-views/randomNumber.php':
        $title = 'Nombre Aléatoire';
        $description = 'Génère un nombre aléatoire entre un minimum inclus et un maximum inclus.';
        $image = 'https://function.divlo.fr/img/function-image/randomNumber.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/randomNumber_DOM.js"></script>');
        break;
    case '/views/function-views/weatherRequest.php':
        $title = 'Météo';
        $description = "Affiche la météo et l'heure locale.";
        $image = 'https://function.divlo.fr/img/function-image/weatherRequest.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/weatherRequest_DOM.js"></script>');
        break;
    case '/views/function-views/filterStudents.php':
        $title = 'Trie les prénoms par leur première lettre';
        $description = "Affiche uniquement les prénoms (qui sont dans la liste) qui commencent par la lettre souhaitée.";
        $image = 'https://function.divlo.fr/img/function-image/filterStudents.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/filterStudents_DOM.js"></script>');
        break;
    case '/views/function-views/randomQuote.php':
        $title = 'Générateur de citation';
        $description = "Génère aléatoirement une citation ou un proverbe.";
        $image = 'https://function.divlo.fr/img/function-image/randomQuote.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/randomQuote_DOM.js"></script>');
        break;
    case '/views/quote-list.php':
        $title = 'Liste des citations';
        $description = "La liste de toutes les citations ou proverbes (aimé par Divlo).";
        $image = 'https://function.divlo.fr/img/function-image/randomQuote.png';
        $scripts = array('<script type="module" defer src="/scripts/pagesJS/quote-list.js"></script>');
        break;
    case '/views/function-views/convertCurrency.php':
        $title = 'Conversion de devise';
        $description = "Convertis une valeur dans une devise dans une autre devise.";
        $image = 'https://function.divlo.fr/img/function-image/convertCurrency.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/convertCurrency_DOM.js"></script>');
        break;
    case '/views/function-views/convertEncoding.php':
        $title = "Conversion des Encodages de caractères";
        $description = "Convertis des nombres de différentes bases et convertis en UTF-8.";
        $image = 'https://function.divlo.fr/img/function-image/convertEncoding.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/convertEncoding_DOM.js"></script>');
        break;
    case '/views/function-views/convertRomanArabicNumbers.php':
        $title = "Conversion d'un nombre arabe en nombre romain";
        $description = "Convertis un nombre arabe en nombre romain (et l'inverse aussi).";
        $image = 'https://function.divlo.fr/img/function-image/convertRomanArabicNumbers.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/convertRomanArabicNumbers_DOM.js"></script>');
        break;
    case '/views/function-views/armstrongNumber.php':
        $title = "Nombre d'Armstrong";
        $description = "Un nombre d'<a href='https://fr.wikipedia.org/wiki/Nombre_narcissique' target='_blank'>Armstrong</a> est un nombre entier positif qui est égal à la somme de ses chiffres portés à la puissance du nombre de chiffres le composant. Cette fonction permet de savoir si un nombre fait partie des nombres d'Armstrong.";
        $image = 'https://function.divlo.fr/img/function-image/armstrongNumber.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/armstrongNumber_DOM.js"></script>');
        break; 
    case '/views/function-views/heapAlgorithm.php':
        $title = "Heap's algorithm";
        $description = "<a href='https://en.wikipedia.org/wiki/Heap%27s_algorithm' target='_blank'>Heap's algorithm</a> est un algorithme qui génère toutes les permutations uniques possibles d'une chaîne de caractère, ce sont en quelque sorte toutes les possibilités d'anagramme d'un mot (en changeant de place, les lettres d’un mot, permettent d’en créer un nouveau), par contre les mots n'ont pas besoin d'être de vrais mots qui ont du sens.";
        $image = 'https://function.divlo.fr/img/function-image/heapAlgorithm.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/heapAlgorithm_DOM.js"></script>');
        break; 
    case '/views/function-views/convertMarkdown.php':
        $title = "Markdown";
        $description = "Convertis du Markdown en HTML.";
        $image = 'https://function.divlo.fr/img/function-image/convertMarkdown.png';
        $scripts = array('<script defer src="/scripts/libs/marked.min.js"></script>', '<script type="module" defer src="/scripts/execute-function/convertMarkdown_DOM.js"></script>');
        break; 
    case '/views/function-views/linkShortener.php':
        $title = "Raccourcisseurs de liens";
        $description = "Une URL trop longue ? Raccourcissez-là !";
        $image = 'https://function.divlo.fr/img/function-image/linkShortener.png';
        $scripts = array('<script type="module" defer src="/scripts/execute-function/linkShortener_DOM.js"></script>');
        break; 
    case '/views/short_links-list.php':
        $title = 'Liste des liens récemment raccourcit';
        $description = "La liste de vos liens raccourcit les plus récents.";
        $image = 'https://function.divlo.fr/img/function-image/linkShortener.png';
        $scripts = array('<script type="module" defer src="/scripts/pagesJS/short_links-list.js"></script>');
        break;
    case '/views/function-views/toDoList.php':
        $title = 'Liste de choses à faire';
        $description = "La liste des choses à faire.";
        $image = 'https://function.divlo.fr/img/function-image/toDoList.png';
        $toDoListCSS = true;
        $scripts = array('<script type="module" defer src="/scripts/execute-function/toDoList_DOM.js"></script>');
        break;
    default:
        $title = 'Erreur 404';
        $description = "Cette page n'existe pas!";
        $image = 'https://function.divlo.fr/img/error404.png';
}

?>