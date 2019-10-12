<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span></h1>
  <p class="pt-3 text-center"><?php echo $description?></p>
  <div class="text-center">
    <img class="function-image" src="/img/function-image/calculateAge.png" alt="Calendrier">
  </div>
  <div class="form-group">
		<label for="birthDateValue">Entrez la date de naissance au format (dd/mm/yyyy) :</label>
        <input name="birthDateValue" type="text" id="birthDateValue" placeholder="Sélectionnez une date" class="form-control datepicker">
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>