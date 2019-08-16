<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Menu -->
<?php include("../../incl/menu.php");?>

<!-- Page Content -->
<div class="container">
  <h1 class="mt-4 text-center"><span class="yellow-color">Conversion de Distance</span> :</h1>
  <p class="pt-3 text-center">Convertit la longueur (distance) avec les unités allant de picomètre au Téramètre.</p>
  <div class="form-group">
		<label for="firstValue">Entrez la distance que vous voulez convertir :</label>
        <input name="firstValue" type="text" id="firstValue" placeholder="(e.g : 50cm)" class="form-control">
        <br>
		<label for="secondValue">Entrez l'unité que vous voulez avoir après conversion :</label>
        <input name="secondValue" type="text" id="secondValue" placeholder="(e.g : km)" class="form-control">
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitConvertDistance" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>