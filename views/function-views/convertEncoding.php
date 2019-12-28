<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<main class="container-fluid flex-fill">
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
                    <option value="decimalToBinary">Décimal en Binaire</option>
                    <option value="binaryToDecimal">Binaire en Décimal</option>
                    <option value="decimalToHexadecimal">Décimal en Hexadecimal</option>
                    <option value="hexadecimalToDecimal">Hexadecimal en Décimal</option>
                    <option value="binaryToHexadecimal">Binaire en Hexadécimal</option>
                    <option value="hexadecimalToBinary">Hexadécimal en Binaire</option>
                    <option value="textToNumberUnicode">Chaque caractère a un nombre Unicode</option>
                    <option value="numberUnicodeToText">Chaque nombre Unicode a un caractère</option>
                    <option value="textToBinary">Texte en Binaire (UTF-8)</option>
                    <option value="binaryToText">Binaire (UTF-8) en Texte</option>
                    <option value="textToHexadecimal">Texte en Hexadécimal (UTF-8)</option>
                    <option value="hexadecimalToText">Hexadécimal (UTF-8) en Texte</option>
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
    </div>
</main>

<!-- Footer -->
<?php include("../../incl/footer.php");?>