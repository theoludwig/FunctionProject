<!-- Config -->
<?php include("../php/config.php");?>

<!-- Header -->
<?php include("../incl/header.php");?>

<!-- Page Content -->
<div class="container">
  <h1><span class="important"><?php echo $title?></span> :</h1>
  <p class="pt-3 text-center"><?php echo $description?> <br>
    Note : Tous les feedbacks publiés sont publics. <br>
    <a href="/views/feedback-list.php">La liste des feedbacks publiés</a>  
  </p>
  <form id="feedbackForm" method="POST">
    <div class="form-group">
        <label for="pseudo">Entrez votre pseudo :</label>
        <input name="pseudo" type="text" id="pseudo" placeholder="Divlo" class="form-control">
        <br>
        <label for="feedback">Votre message :</label>
        <textarea name="feedback" type="text" id="feedback" placeholder="Soyez le plus précis possible dans votre ressenti afin que je puisse améliorer au mieux le projet. ⚙️" class="form-control"></textarea>
        <br>
        <div class="form-row text-center">
            <div class="col-12">
                <button type="submit" id="submitFeedback" class="btn btn-dark text-center">Envoyer</button>
            </div>
        </div>
      <br> <br>
      <p class="results text-center"></p>
    </div>
  </form>
</div>

<!-- Footer -->
<?php include("../incl/footer.php");?>