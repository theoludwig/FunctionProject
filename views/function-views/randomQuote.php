<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center">
    <?php echo $description?> <br> 
    <em>(Les citations peuvent être en anglais ou en français)</em> <br> <br>
    <a href="#">La liste de toutes les citations/proverbes.</a>
</p> <br>
  <div class="form-group">
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitRandomQuote" class="btn btn-dark text-center">Générer une nouvelle citation</button>
            </div>
        </div>
        <br> <br>
		<p class="resultsRandomQuote text-center"></p>
    </div>
</div>

<!-- Footer -->
<?php include("../../incl/footer.php");?>