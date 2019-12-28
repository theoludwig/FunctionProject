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
            <img class="function-image" src="/img/function-image/convertMarkdown.png" alt="Markdown">
        </div>
        <div class="row">
            <div class="col-sm-6">
                <textarea rows="6" name="texteMarkdown" id="texteMarkdown" placeholder="Votre texte..." class="form-control"></textarea>
            </div>
            <div class="col-sm-6 results">
                <p>Votre texte...</p>
            </div>
        </div>
    </div>
</main>

<!-- Footer -->
<?php include("../../incl/footer.php");?>