<!-- Config -->
<?php include("../php/config.php");?>

<!-- Header -->
<?php include("../incl/header.php");?>

<!-- Page Content -->
<div class="container">
    <h1><span class="important"><?php echo $title?></span> :</h1>
    <p class="pt-3 text-center">
        <span class="totalLengthLinksList"></span><br>
        <a href="/views/function-views/linkShortener.php">Revenir au raccourcisseur de liens.</a>
    </p>

    <table class="table table-bordered mt-5">
        <thead>
            <tr>
                <th class="text-center" scope="col">Liens originaux</th>
                <th class="text-center" scope="col">Liens raccourcit</th>
            </tr>
        </thead>
        <tbody class="links-list text-center">

        </tbody>
    </table>

<!-- Footer -->
<?php include("../incl/footer.php");?>