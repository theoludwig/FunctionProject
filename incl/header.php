<!DOCTYPE html>
<html lang="fr" prefix="og: http://ogp.me/ns#">
    <head>
        <title><?php echo $title?></title>
        <link rel="icon" type="image/png" href="<?php echo $image?>"/>

        <!-- Meta Tag -->
        <meta charset="utf-8">
        <meta https-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="<?php echo $description?>"/> 
        <link rel="canonical" href="function.divlo.fr"/> 
        <meta name="Language" content="fr"/> 
        <meta charset="utf-8">

        <!--Open Graph Metadata-->
        <meta property="og:title" content="<?php echo $title?>">
        <meta property="og:type" content="website"> 
        <meta property="og:url" content="https://function.divlo.fr/"> 
        <meta property="og:image" content="<?php echo $image?>"> 
        <meta property="og:description" content="<?php echo $description?>"> 
        <meta property="og:locale" content="fr_FR">
        <meta property="og:site_name" content="Function Project"> 

        <!-- Twitter card Metadata -->
        <meta name="twitter:card" content="summary">
        <meta name="twitter:description" content="<?php echo $description?>">
        <meta name="twitter:title" content="<?php echo $title?>">
        <meta name="twitter:site" content="@Divlo_FR">
        <meta name="twitter:image:src" content="<?php echo $image?>">
        <meta name="twitter:creator" content="@Divlo_FR">

        <!-- Frameworks and Tools -->
        <script src="/scripts/libs/jquery-min.js"></script>
        <link rel="stylesheet" href="/css/libs/bootstrap-min.css">
        <script src="/scripts/libs/bootstrap-min.js"></script>
        <script src="/scripts/libs/moment.js"></script>

        <!-- Google Fonts and Font Awesome -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat|Roboto|Varela+Round&display=swap" rel="stylesheet">
        <script src="https://kit.fontawesome.com/ed4e9fbefd.js"></script>

        <script src="/scripts/main.js"></script>
        <link rel="stylesheet" type="text/css" href="/css/style.css">
    </head>
    
    <body>
        <header>    
            <nav class="navbar navbar-expand-lg navbar-dark static-top">
                <div class="container" id="header-container">
                    <!-- Brand -->
                    <a class="navbar-brand" href="/index.php"><img src="/img/FunctionProject_brand-logo.png" alt="FunctionProject"></a>

                    <!-- Hamburger icon on Mobile -->
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>

                    <!-- Navigation -->
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item <?php echo $indexActive?>">
                                <a class="nav-link" href="/index.php">Accueil</a>
                            </li>
                            <li class="nav-item <?php echo $functionlistActive?>">
                                <a class="nav-link" href="/views/function-list.php">Liste des fonctions</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" target="_blank" href="https://docs.google.com/forms/d/1NliUWi3lntHDM42Td0C47J0cZKgnYilxT_0UcdmVaog/">Feedback Formulaire</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" target="_blank" href="https://github.com/Divlo/FunctionProject">Code Source</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>