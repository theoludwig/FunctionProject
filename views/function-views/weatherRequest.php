<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?> <br> 
  Pour une meilleure précision, je recommande de préciser le pays de la ville. <br>
  Exemple : Paris, FR
  </p>
  <div class="text-center">
    <img class="function-image" src="/img/function-image/weatherRequest.png" alt="Météo">
  </div>
  <div class="form-group">
		<label for="cityName">Entrez le nom d'une ville :</label>
        <input name="cityName" type="text" id="cityName" placeholder="(e.g : Paris, FR)" class="form-control">
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