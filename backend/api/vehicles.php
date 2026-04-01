<?php
require_once '../db.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$query = "SELECT * FROM parking ORDER BY entry_time DESC";
$result = $conn->query($query);

$vehicles = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $vehicles[] = $row;
    }
}

echo json_encode(["success" => true, "data" => $vehicles]);
?>
