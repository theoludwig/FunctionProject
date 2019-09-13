<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?></p>
  <br>
  <div class="form-group">
        <label for="euroValue">Entrez le nombre d'euros (€) à convertir :</label>
        <br>
        <input name="euroValue" type="text" id="euroValue" placeholder="(e.g : 50)" class="form-control">
        <br> <br>
		<label for="euroToCurrency">Choisissez la devise que voulez avoir après conversion :</label> <br>
        <select id="euroToCurrency">
            <option value="$">$ - USD - Dollar Américain</option>
            <option value="£">£ - GBP - Livre sterling</option>
        </select>
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitConvertCurrency" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>