<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?></p>
  <div class="form-group">
		<label for="binaryTextValue">Entrez votre chaîne de caractères ou du binaire :</label>
        <textarea name="binaryTextValue" type="text" id="binaryTextValue" placeholder="(e.g : 'Salut' ou '01010011 01100001')" class="form-control"></textarea>
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitConvertBinaryText" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>