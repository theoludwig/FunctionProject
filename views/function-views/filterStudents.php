<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?></p>
  <div class="text-center">
    <img class="function-image" src="/img/function-image/filterStudents.png" alt="Carte étudiant">
  </div>
  <div class="form-group">
		<label for="nameEntered">Entrer les prénoms :</label>
        <input name="nameEntered" type="text" id="nameEntered" placeholder="(e.g : 'Prénom1, Prénom2, Prénom3, ...')" class="form-control">
        <br>
		<label for="filteredLetter">Entrer la lettre à filtré :</label>
        <input name="filteredLetter" type="text" id="filteredLetter" placeholder="(e.g : 'A')" class="form-control">
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitFilterStudents" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>