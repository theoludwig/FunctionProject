<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span></h1>
  <p class="pt-3 text-center"><?php echo $description?></p>
  <div class="form-group">
		<label for="birthDateValue">Entrez la date de naissance au format (dd/mm/yyyy) :</label>
        <input name="birthDateValue" type="text" id="birthDateValue" placeholder="(e.g : 31/03/2003)" class="form-control">
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitCalculateAge" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>