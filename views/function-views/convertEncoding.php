<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?></p>
  <div class="text-center">
    <img class="function-image" src="/img/function-image/convertEncoding.png" alt="Binaire">
  </div>
  <div class="form-group">
		<label for="value">Entrez votre valeur :</label>
        <textarea name="value" type="text" id="value" placeholder="Votre valeur..." class="form-control"></textarea>
        <br>
		<label for="option">Choisissez une option : </label> <br>
        <select class="form-control selectInline" id="option">
        <option value="DecimalToBinary">Décimal en Binaire</option>
            <option value="BinaryToDecimal">Binaire en Décimal</option>
            <option value="DecimalToHexadecimal">Décimal en Hexadecimal</option>
            <option value="HexadecimalToDecimal">Hexadecimal en Décimal</option>
            <option value="BinaryToHexadecimal">Binaire en Hexadécimal</option>
            <option value="HexadecimalToBinary">Hexadécimal en Binaire</option>
            <option value="TextToBinary">Texte en Binaire (UTF-8)</option>
            <option value="BinaryToText">Binaire (UTF-8) en Texte</option>
            <option value="TextToHexadecimal">Texte en Hexadécimal (UTF-8)</option>
            <option value="HexadecimalToText">Hexadécimal (UTF-8) en Texte</option>
        </select>
        <div class="form-row text-center">
            <div class="col-12">
                <br>
                <button type="submit" id="submitConvertEncoding" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
        <br> <br>
		<p class="results text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>