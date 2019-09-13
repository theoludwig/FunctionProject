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
            <option value="£">Livre sterling (£) - GBP</option>
            <option value="$ Américain">Dollar Américain ($) - USD</option>
            <option value="$ Canadien">Dollar Canadien ($) - CAD</option>
            <option value="$ Australien">Dollar Australien ($) - AUD</option>
            <option value="$ Mexicain">Peso Mexicain ($) - MXN</option>
            <option value="Fr">Franc Suisse (Fr) - CHF</option>
            <option value="₽">Rouble Russe (₽) - RUB</option>
            <option value="R$">Réal brésilien (R$) - BRL</option>
            <option value="¥">Yen (¥) - JPY</option>
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