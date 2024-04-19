<?php
header("Access-Control-Allow-Origin: *");

$json = file_get_contents("php://input");

if(empty($json)) {
    $json = file_get_contents("jsonInput.txt");
    $data = json_decode($json);
    $lights = $data->lights;
    echo json_encode($lights);
    exit();   
}

$data = json_decode($json);

$fileContents = file_get_contents("jsonInput.txt");
$fileData = json_decode($fileContents);

$fileData->lights = $data;
$finalJson = json_encode($fileData);

$jsonFile = fopen('jsonInput.txt', "w");
fwrite($jsonFile, $finalJson);
fclose($jsonFile);

echo json_encode($fileData->lights);