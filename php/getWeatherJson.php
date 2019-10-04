<?php
include 'keyVariable.php';
ini_set("allow_url_fopen", 1);
$cityName = $_COOKIE['city'];
$url = 'https://api.openweathermap.org/data/2.5/weather?q='.$cityName.'&lang=fr&units=metric&appid='.$apiWeather;
$json = file_get_contents($url);
// $obj = json_decode($json); 
echo $json; 