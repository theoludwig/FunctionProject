<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?></p>
  <div class="text-center">
    <img class="function-image" src="/img/function-image/convertCurrency.png" alt="Convert Currency">
  </div>
  <br>
  <div class="form-group">
        <label for="value">Entrez le nombre à convertir et sélectionner la devise de celui-çi :</label>
        <br>
        <input name="value" type="text" class="inlineInput" id="value" placeholder="(e.g : 50)" class="form-control">
        <select id="currencyOfTheValue">
            <option value="EUR">Euro (€) - EUR</option>
            <option value="GBP">Livre sterling (£) - GBP</option>
            <option value="USD">Dollar Américain ($) - USD</option>
            <option value="CAD">Dollar Canadien ($) - CAD</option>
            <option value="AUD">Dollar Australien ($) - AUD</option>
            <option value="MXN">Peso Mexicain ($) - MXN</option>
            <option value="CHF">Franc Suisse (Fr) - CHF</option>
            <option value="RUB">Rouble Russe (₽) - RUB</option>
            <option value="BRL">Réal brésilien (R$) - BRL</option>
            <option value="JPY">Yen (¥) - JPY</option>
        </select>
        <br> <br>
		<label for="currencyAfter">Choisissez la devise que voulez avoir après conversion :</label> <br>
        <select id="currencyAfter">
            <option value="£">Livre sterling (£) - GBP</option>
            <option value="$ Américain">Dollar Américain ($) - USD</option>
            <option value="$ Canadien">Dollar Canadien ($) - CAD</option>
            <option value="$ Australien">Dollar Australien ($) - AUD</option>
            <option value="$ Mexicain">Peso Mexicain ($) - MXN</option>
            <option value="CHF">Franc Suisse (Fr) - CHF</option>
            <option value="₽">Rouble Russe (₽) - RUB</option>
            <option value="R$">Réal brésilien (R$) - BRL</option>
            <option value="¥">Yen (¥) - JPY</option>
            <option value="€">Euro (€) - EUR</option>
        </select>
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <br>
                <button type="submit" id="submitConvertCurrency" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
        <p class="rateDate text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>