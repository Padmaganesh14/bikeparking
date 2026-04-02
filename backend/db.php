<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'sql110.infinityfree.com';
$username = 'if0_41542624';
$password = '4kK59dvKNO';
$database = 'if0_41542624_bike_parking';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("DB ERROR: " . $conn->connect_error);
}
?>
