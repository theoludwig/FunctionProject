<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<main class="container-fluid flex-fill">
    <div class="container">
        <h1><span class="important"><?php echo $title?></span> :</h1>
        <p class="pt-3 text-center">
            <?php echo $description?> 
            <div class="text-center">
                <img class="function-image" src="/img/function-image/randomQuote.png" alt="Citation">
            </div>
            <br>
            <div class="text-center">
                <a href="/views/quote-list.php">La liste de toutes les citations/proverbes.</a>
            </div>
        </p> <br>
        <div class="form-group">
                <div class="form-row text-center">
                    <div class="col-12">
                        <button type="submit" id="submitRandomQuote" class="btn btn-dark text-center">Générer une nouvelle citation</button>
                    </div>
                </div>
                <br> 
                <p class="resultsRandomQuote text-center"></p>
                <br>
                <div class="text-center">
                    <a target="_blank" id="twitterLink" class="btn btn-lg btn-primary"><i class="fab fa-twitter"></i> Twitter</a>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- Footer -->
<?php include("../../incl/footer.php");?>