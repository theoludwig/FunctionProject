<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<main class="container-fluid flex-fill">
  <div class="container">
    <h1><span class="important"><?php echo $title?></span> :</h1>
    <p class="pt-3 text-center"><?php echo $description?> <br> 
    Pour une meilleure précision, je recommande de préciser le pays de la ville. <br>
    La météo est récupérée grâce à l'API <a href="https://openweathermap.org/" target="_blank">openweathermap.org</a>. <br> Il faut rentrer le nom anglais de la ville (s'il est différent qu'en français). <br>
    Exemples : Paris, FR - London, UK - Moscow, RU - etc.
    </p>
    <div class="text-center">
      <img class="function-image" src="/img/function-image/weatherRequest.png" alt="Météo">
    </div>
    <form id="weatherForm" action="#" method="POST">
      <div class="form-group">
        <label for="cityName">Entrez le nom d'une ville :</label>
            <input name="city" type="text" id="cityName" placeholder="(e.g : Paris, FR)" class="form-control">
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
    </form>
</main>

<!-- Footer -->
<?php include("../../incl/footer.php");?>