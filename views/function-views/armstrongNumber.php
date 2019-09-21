<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?></p>
  <div class="text-center">
    <img class="function-image" src="/img/function-image/armstrongNumber.png" alt="Nombre d'Armstrong">
  </div>
  <div class="form-group">
		<label for="numberToTest">Entrez votre nombre :</label>
        <textarea name="numberToTest" type="text" id="numberToTest" placeholder="(e.g : 153)" class="form-control"></textarea>
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <br>
                <button type="submit" id="submitArmstrongNumber" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>