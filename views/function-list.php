<!-- Config -->
<?php include("../php/config.php");?>

<!-- Header -->
<?php include("../incl/header.php");?>

<!-- Page Content -->
<div class="container">
    <div class="row pb-5">
        <h1>La liste des <span class="important">Fonctions</span> :</h1>
    </div>

    <div class="row pt-4">
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/weatherRequest.php">Météo</a></h2>
                <a href="./function-views/weatherRequest.php"><img class="function-list-image" src="/img/function-image/weatherRequest.png" alt=""></a>
                <p class="function-list-description">Affiche la météo et l'heure local selon la ville.</p>
            </div>  
        </div>
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/randomNumber.php">Nombre aléatoire</a></h2>
                <a href="./function-views/randomNumber.php"><img class="function-list-image" src="/img/function-image/randomNumber.png" alt=""></a>
                <p class="function-list-description">Génère un nombre aléatoire entre un minimum inclus et un maximum inclus.</p>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/calculateAge.php">Quelle âge avez-vous ?</a></h2>
                <a href="./function-views/calculateAge.php"><img class="function-list-image" src="/img/function-image/calculateAge.png" alt=""></a>
                <p class="function-list-description">Calcule l'âge de quelqu'un selon la date de naissance.</p>
            </div>
        </div>
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/convertTemperature.php">Conversion de Température</a></h2>
                <a href="./function-views/convertTemperature.php"><img class="function-list-image" src="/img/function-image/convertTemperature.png" alt=""></a>
                <p class="function-list-description">Convertit des Degré Celsius en Degré Fahrenheit et l'inverse aussi.</p>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/convertDistance.php">Conversion de Distance</a></h2>
                <a href="./function-views/convertDistance.php"><img class="function-list-image" src="/img/function-image/convertDistance.png" alt=""></a>
                <p class="function-list-description">Convertit la longueur (distance) avec les unités allant de picomètre au Téramètre.</p>
            </div>
        </div>
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/filterStudents.php">Trie les prénoms par leur première lettre</a></h2>
                <a href="./function-views/filterStudents.php"><img class="function-list-image" src="/img/function-image/filterStudents.png" alt=""></a>
                <p class="function-list-description">Affiche uniquement les prénoms (qui sont dans la liste) qui commence par la lettre souhaitée.</p>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/randomQuote.php">Générateur de citation</a></h2>
                <a href="./function-views/randomQuote.php"><img class="function-list-image" src="/img/function-image/randomQuote.png" alt=""></a>
                <p class="function-list-description">Génère aléatoirement une citation ou un proverbe.</p>
            </div>
        </div>
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/convertCurrency.php">Conversion de devise</a></h2>
                <a href="./function-views/convertCurrency.php"><img class="function-list-image" src="/img/function-image/convertCurrency.png" alt=""></a>
                <p class="function-list-description">Convertis une valeur dans une devise dans une autre devise.</p>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/convertBinaryText.php">Conversion d'un texte en binaire et vice-versa</a></h2>
                <a href="./function-views/convertBinaryText.php"><img class="function-list-image" src="/img/function-image/convertBinaryText.png" alt=""></a>
                <p class="function-list-description">Convertis du texte (encodé en UTF-8) en binaire et l'inverse aussi.</p>
            </div>
        </div>
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/convertRomanArabicNumbers.php">Conversion d'un nombre arabe en nombre romain</a></h2>
                <a href="./function-views/convertRomanArabicNumbers.php"><img class="function-list-image" src="/img/function-image/convertRomanArabicNumbers.png" alt=""></a>
                <p class="function-list-description">Convertis un nombre arabe en nombre romain (et l'inverse aussi).</p>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12 pb-4">
            <div class="feature text-center pb-5">
                <h2 class="function-list-title"><a href="./function-views/armstrongNumber.php">Nombre d'Armstrong</a></h2>
                <a href="./function-views/armstrongNumber.php"><img class="function-list-image" src="/img/function-image/armstrongNumber.png" alt=""></a>
                <p class="function-list-description">Vérifie si un nombre fait partie des nombres d'Armstrong ou non.</p>
            </div>
        </div>
    </div>

</div>

<!-- Footer -->
<?php include("../incl/footer.php");?>