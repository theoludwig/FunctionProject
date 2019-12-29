<?php
// Rate limit of 1 request per 2 second
session_start();
if (isset($_SESSION['LAST_CALL'])) {
    $last = strtotime($_SESSION['LAST_CALL']);
    $curr = strtotime(date("Y-m-d h:i:s"));
    $sec =  abs($last - $curr);
        if ($sec <= 2) {
            $data = 'Rate Limit Exceeded';  
            echo $data;        
        }
}
$_SESSION['LAST_CALL'] = date("Y-m-d h:i:s");
 
include 'keyVariable.php';
ini_set("allow_url_fopen", 1);
$cityName = htmlspecialchars($_POST['city']);
$url = 'https://api.openweathermap.org/data/2.5/weather?q='.$cityName.'&lang=fr&units=metric&appid='.$apiWeather;
$json = file_get_contents($url);
// $obj = json_decode($json); 
echo $json; 