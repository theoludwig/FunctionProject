<!-- Head Perso -->
<?php include("../php/headPerso.php");?>

<!-- Header -->
<?php include("../incl/header.php");?>

<!-- Menu -->
<?php include("../incl/menu.php");?>

<!-- Page Content -->
<div class="jumbotron d-flex align-items-center">
    <div class="container">
    <h1><span class="important">La météo</span> :</h1>
    <p class="pt-3 text-center">Affiche la météo et l'heure local selon la ville.</p>
    <div class="form-group">
            <label for="cityName">Entrez le nom d'une ville :</label>
            <input name="cityName" type="text" id="cityName" placeholder="(e.g : Paris)" class="form-control">
            <br>
            <div class="form-row text-center">
                <div class="col-12">
                    <button type="submit" id="submitWeatherRequest" class="btn btn-dark text-center">Envoyer</button>
                </div>
            </div>
            <br> <br>
            <p class="results text-center">La ville que vous avez rentré n'existe pas (dans l'API).</p>
        </div>
    </div>
</div>

<script>
    $(function () {
        $("#cityName").click(function() {
            document.location.replace("../views/function-views/weatherRequest.php");
        });
        $("#submitWeatherRequest").click(function() {
            document.location.replace("../views/function-views/weatherRequest.php");
        }); 
    })  
</script>

<!-- Footer -->
<?php include("../incl/footer.php");?>