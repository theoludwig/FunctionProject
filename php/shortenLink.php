<?php

/**
 * Convertis une string en camelCase (seulement si la string contient des espaces)
 * @param string $str
 * @return string
 */
function camelCase($str, array $noStrip = []) {
        $str = preg_replace('/[^a-z0-9' . implode("", $noStrip) . ']+/i', ' ', $str);
        $str = trim($str);
        $str = ucwords($str);
        $str = str_replace(" ", "", $str);
        $str = lcfirst($str);
        return $str;
}

/**
 * Génére une string d'une taille donnée
 * @param number $length
 * @return string
 */
function uniqueId($length = 8) {
    return substr(md5(uniqid(mt_rand(), true)), 0, $length);
}

/**
 * Vérifie si une valeur se trouve en bdd
 * @param string $bdd
 * @param string $valueToFind
 * @param string $valueName
 * @return array
 */
function alreadyExists($bdd, $valueToFind, $valueName, $typeURL = false) {
    $array = array("isInDatabase" => false, $valueName => "");
    $req = $bdd->prepare('SELECT * FROM short_links WHERE ' . $valueName . ' = ?');
    $req->execute(array($valueToFind));
    while ($result = $req->fetch()) {
        $array['isInDatabase'] = true;
        if($typeURL) {
            $array["shortcut"] = $result["shortcut"];
        }
    }
    return $array;
}

$array = array("url" => "", "option"=> "", "message" => "");

if ($_SERVER["REQUEST_METHOD"] == "POST") { 

    // Si le formulaire est envoyé
    if(isset($_POST['url']) && isset($_POST['option'])) {
        $array["url"] = $_POST["url"];    
        $array["option"] = $_POST["option"];    

        // Si ce n'est pas un lien valide
        if(!filter_var($array["url"], FILTER_VALIDATE_URL)) {
            $array["message"] = "Veuillez entré une URL valide.";   
        } else {
            // Connexion à la base de donnée
            require_once('./config_database/connectDB.php');

            // URL déjà en base de donnée ?
            $urlInDatabase = alreadyExists($bdd, $array["url"], "url", true);
            if($urlInDatabase['isInDatabase']) {
                $shortcutURL = $linkPath . '?q=' . $urlInDatabase['shortcut'];
                $array['message'] = 'Adresse déjà raccourcie : <a target="_blank" href="' . $shortcutURL . '">' . $shortcutURL . '</a>';
            } else {
                if($array['option'] == "userShortcut" && isset($_POST['userShortcut']) && !empty($_POST['userShortcut'])) {
                    // Shortcut choisis par l'utilisateur
                    $shortcut = camelCase($_POST['userShortcut']);
                } else {
                    // Shortcut unique aléatoire
                    do {
                        $shortcut = uniqueId();
                    } while(alreadyExists($bdd, $shortcut, "shortcut")['isInDatabase']);
                }
                $shortcutURL = $linkPath . '?q=' . $shortcut;
                if(alreadyExists($bdd, $shortcut, "shortcut")['isInDatabase']) {
                    $array['message'] = 'Le shortcut "' . $shortcut . '" est déjà pris, veuillez en choisir un autre.';
                } else {
                    // Envoi de l'URL et du shortcut dans la base de donnée
                    $req = $bdd->prepare('INSERT INTO short_links(url, shortcut) VALUES (?, ?)');
                    $req->execute(array($array['url'], $shortcut));
                    $array['message'] = 'URL raccourcie : <a target="_blank" href="' . $shortcutURL . '">'. $shortcutURL .'</a>';

                    // URL et Shortcut en Cookie
                    if(isset($_COOKIE['shortcuts']) && !empty($_COOKIE['shortcuts'])) {
                        $data = json_decode($_COOKIE['shortcuts'], true);
                    } else {
                        $data = array();
                    }
                    array_push($data, array("url" => $array['url'], "shortcut" => $shortcutURL));
                    setcookie('shortcuts', json_encode($data), time()+3600*24*365, '/');
                }
            }
        }
    } 
    echo json_encode($array);
}
?>