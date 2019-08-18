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
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js"></script>
        <script src="https://kit.fontawesome.com/ed4e9fbefd.js"></script>
        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat|Roboto|Varela+Round&display=swap" rel="stylesheet">

        <script type='text/javascript' src='/scripts/config.js'></script>
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