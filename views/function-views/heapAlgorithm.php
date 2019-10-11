<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?> <br> <br>
  <em>Par souci de performance, je recommande de ne pas essayer un mot avec + de 8 lettres.</em>
  </p>
  <div class="text-center">
    <img class="function-image" src="/img/function-image/heapAlgorithm.png" alt="Heap's algorithm">
  </div>
  <div class="form-group">
		<label for="value">Entrez un mot :</label>
        <input name="value" type="text" id="value" placeholder="(e.g : Mot)" class="form-control">
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitHeapAlgorithm" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
  </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>