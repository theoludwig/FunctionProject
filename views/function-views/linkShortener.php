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
            <img class="function-image" src="/img/function-image/linkShortener.png" alt="Raccourcisseurs de liens">
        </div>
        <br>
        <div class="text-center">
            <a href="/views/short_links-list.php">La liste de vos liens raccourcit les plus récents.</a>
        </div>
    </p> 

    <form id="formLinkShortener" method="post">
            <div class="form-group">
                <label for="url">Entrez le lien :</label> <br>
                <input name="url" type="url" id="url" placeholder="(e.g : divlo.fr)" class="form-control"> <br class="hideUserShortcut">
                <label class="hideUserShortcut" for="userShortcut">Entrez le nom du raccourci :</label> <br class="hideUserShortcut"> 
                <input name="userShortcut" type="text" id="userShortcut" placeholder="(e.g : divlo)" class="form-control hideUserShortcut"> <br> 
                <label for="option">Choisissez une option : </label> <br>
                <select class="form-control" id="option" name="option">
                    <option value="randomShortcut">Raccourci aléatoire</option>
                    <option value="userShortcut">Donner un nom au raccourci</option>
                </select>
                <br>
                <button type="submit" class="btn btn-dark text-center">Envoyer</button>
                <br> 
            </div>
            <p class="results text-center"></p>
        </form>
    </div>
</main>

<!-- Footer -->
<?php include("../../incl/footer.php");?>