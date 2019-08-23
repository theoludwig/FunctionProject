<!-- Head Perso -->
<?php include("../php/headPerso.php");?>

<!-- Header -->
<?php include("../incl/header.php");?>

<!-- Page Content -->
<div class="container">
    <div class="row">
        <h1>La liste des <span class="important">Fonctions</span> :</h1>
            <table class="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="./function-views/weatherRequest.php">Météo</a></td>
                        <td>Affiche la météo et l'heure local selon la ville.</td>     
                    </tr>
                    <tr>
                        <td><a href="./function-views/randomNumber.php">Nombre aléatoire</a></td>
                        <td>Génère un nombre aléatoire entre un minimum inclus et un maximum inclus.</td>  
                    </tr>
                    <tr>
                        <td><a href="./function-views/calculateAge.php">Quelle âge avez-vous ?</a></td>
                        <td>Calcule l'âge de quelqu'un selon la date de naissance.</td> 
                    </tr>
                    <tr>
                        <td><a href="./function-views/convertTemperature.php">Conversion de Température</a></td>
                        <td>Convertit des Degré Celsius en Degré Fahrenheit et l'inverse aussi.</td>    
                    </tr>
                    <tr>
                        <td><a href="./function-views/convertDistance.php">Conversion de Distance</a></td>
                        <td>Convertit la longueur (distance) avec les unités allant de picomètre au Téramètre.</td> 
                    </tr>
                </tbody>
            </table>
    </div>
</div>

<!-- Footer -->
<?php include("../incl/footer.php");?>