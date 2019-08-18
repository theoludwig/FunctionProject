<!-- Head Perso -->
<?php include("../../php/headPerso.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Menu -->
<?php include("../../incl/menu.php");?>

<!-- Page Content -->
<div class="container">
  <h1 class="mt-4 text-center"><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?></p>
  <div class="form-group">
		<label for="minValue">Entrez la valeur minimale :</label>
        <input name="minValue" type="text" id="minValue" placeholder="(e.g : 1)" class="form-control">
        <br>
		<label for="maxValue">Entrez la valeur maximale :</label>
        <input name="maxValue" type="text" id="maxValue" placeholder="(e.g : 100)" class="form-control">
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitRandomNumber" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>