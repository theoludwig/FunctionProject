<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Menu -->
<?php include("../../incl/menu.php");?>

<!-- Page Content -->
<div class="container">
  <h1 class="mt-4 text-center"><span class="yellow-color">Météo</span> :</h1>
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
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>