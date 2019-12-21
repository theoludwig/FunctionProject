<!-- Config -->
<?php include("./php/config.php");?>

<!-- Header -->
<?php include("./incl/header.php");?>

<!-- Page Content -->
<div class="container">
    <div class="row">
        <h1 class="pb-4">Bienvenue sur <span class="important">FunctionProject</span> <i class="fas fa-file-code"></i></h1>
    </div>
    <div class="row pb-5 pt-2">
        <p class="mx-auto"><a href="/views/function-list.php">Liste de Mini-programmes</a> permettant de <a id="change" href="/views/function-views/weatherRequest.php">connaître la météo</a>...</p>
    </div>
  <div class="row">
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="text-center pb-5">
                <h2 class="function-list-title"><a target="_blank" href="https://github.com/Divlo/FunctionProject">Code Source :</a></h2>
                <a target="_blank" href="https://github.com/Divlo/FunctionProject"><img class="function-list-image" src="/img/GitHub.png" alt=""></a>
                <p class="function-list-description">Code source disponible sur  <a target="_blank" href="https://github.com/Divlo">mon profil GitHub</a> <i class="fab fa-github"></i>.</p>
            </div>  
        </div>
        <div class="col-sm-12 col-md-6 pb-4">
            <div class="text-center pb-5">
                <h2 class="function-list-title"><a href="/views/feedback-form_view.php">Donnez votre avis :</a></h2>
                <a href="/views/feedback-form_view.php"><img class="function-list-image" src="/img/Feedback-Formulaire.png" alt=""></a>
                <p class="function-list-description">Vous pouvez m'envoyer votre avis sur le projet grâce au <a href="/views/feedback-form_view.php">Feedback Formulaire</a> 📝.</p>
            </div>
        </div>
    </div>
</div>

<!-- Footer -->
<?php include("./incl/footer.php");?>