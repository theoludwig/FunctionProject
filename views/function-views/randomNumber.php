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
        <img class="function-image" src="/img/function-image/randomNumber.png" alt="Nombre aléatoire">
    </div>
    <div class="form-group">
            <label for="minValue">Entrez la valeur minimale :</label>
            <input name="minValue" type="number" min="0" id="minValue" placeholder="(e.g : 1)" class="form-control">
            <br>
            <label for="maxValue">Entrez la valeur maximale :</label>
            <input name="maxValue" type="number" min="1" id="maxValue" placeholder="(e.g : 100)" class="form-control">
            <br>
            <div class="form-row text-center">
                <div class="col-12">
                    <button type="submit" id="submitRandomNumber" class="btn btn-dark text-center">Envoyer</button>
                </div>
            </div>
            <br> <br>
            <p class="results text-center"></p>
        </div>
    </div>
</main>

<!-- Footer -->
<?php include("../../incl/footer.php");?>