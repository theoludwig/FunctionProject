<!-- Config -->
<?php include("../php/config.php");?>

<!-- Header -->
<?php include("../incl/header.php");?>

<!-- Page Content -->
<main class="container-fluid flex-fill">
    <div class="container">
        <h1><span class="important"><?php echo $title?></span> :</h1>
        <p class="pt-3 text-center">
            <?php echo $description?> <br>
            <a href="/views/feedback-form_view.php">Revenir au formulaire</a>
        </p>

        <table class="table table-bordered mt-5">
            <thead>
                <tr>
                    <th class="text-center" scope="col">Pseudo</th>
                    <th class="text-center" scope="col">Feedback</th>
                    <th class="text-center" scope="col">Statut</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <?php
                    $path = $_SERVER['DOCUMENT_ROOT'];
                    // Connexion à la base de donnée
                    require_once($path.'/php/config_database/connectDB.php');

                    $req = $bdd->query("SELECT * FROM functiondivlofr_feedback");

                    while($row = $req->fetch()) { ?>
                        <tr> 
                            <td class="important"><?= $row['pseudo'] ?></td> 
                            <td><?= $row['feedback'] ?></td> 
                            <td><?= $row['statut'] ?></td> 
                        </tr>
                    <?php } ?>
            </tbody>
        </table>
    </div>
</main>

<!-- Footer -->
<?php include("../incl/footer.php");?>