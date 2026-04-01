<?php
require_once '../db.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->vehicle_no) || empty(trim($data->vehicle_no))) {
    echo json_encode(["success" => false, "message" => "Vehicle number is required."]);
    exit;
}

$vehicle_no = strtoupper(trim($data->vehicle_no));
$entry_time = date('Y-m-d H:i:s');

// Check if already parked
$stmt = $conn->prepare("SELECT id FROM parking WHERE vehicle_no = ? AND status = 'parked'");
$stmt->bind_param("s", $vehicle_no);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Vehicle is already parked."]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO parking (vehicle_no, entry_time, status) VALUES (?, ?, 'parked')");
$stmt->bind_param("ss", $vehicle_no, $entry_time);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Vehicle parked successfully.", "id" => $conn->insert_id]);
} else {
    echo json_encode(["success" => false, "message" => "Database error."]);
}
?>
