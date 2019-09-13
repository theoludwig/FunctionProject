<!-- Config -->
<?php include("../php/config.php");?>

<!-- Header -->
<?php include("../incl/header.php");?>

<!-- Page Content -->
<div class="container">
    <h1><span class="important"><?php echo $title?></span> :</h1>
    <p class="pt-3 text-center">
        <?php echo $description?> <br>
        <a href="/views/function-views/randomQuote.php">Revenir au générateur de citations/proverbes.</a>
    </p>

    <table class="table table-bordered mt-5">
                <thead>
                    <tr>
                        <th class="text-center" scope="col">Source</th>
                        <th class="text-center" scope="col">Citation/Proverbe</th>
                    </tr>
                </thead>
                <tbody class="quote-list text-center">

                </tbody>
            </table>

<!-- Footer -->
<?php include("../incl/footer.php");?>