<?php

// Connexion à la base de donnée
require_once('./config_database/connectDB.php');

/**
 * Permet de sécuriser une chaine de caractères
 * @param $string
 * @return string
 */
function str_secur($string) {
    return trim(htmlspecialchars($string));
}

$array = array("feedback" => "", "message" => "", "isSuccess" => false); 

if ($_SERVER["REQUEST_METHOD"] == "POST") { 

    $array["feedback"] = str_secur($_POST["feedback"]);
    $array["pseudo"] = str_secur($_POST["pseudo"]);

    if(empty($array['feedback']) || empty($array['pseudo'])) {
        $array["message"] = "<p class='error'><b class='error'>Erreur:</b> <span class='italic'>Vous ne pouvez pas rentré de valeur vide.</span></p>";
    } else {
        $req = $bdd->prepare("INSERT INTO functiondivlofr_feedback(pseudo, feedback) VALUES (?,?)");
        $req->execute(array($array['pseudo'], $array['feedback']));
    
        $array["message"] = "<p class='success'><b class='success'>Succès:</b> Votre feedback a été envoyé!</p>";
        $array["isSuccess"] = true;
    }

    echo json_encode($array);
}