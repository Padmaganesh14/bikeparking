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
$exit_time_str = date('Y-m-d H:i:s');

// Find parked vehicle
$stmt = $conn->prepare("SELECT id, entry_time FROM parking WHERE vehicle_no = ? AND status = 'parked'");
$stmt->bind_param("s", $vehicle_no);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Vehicle not found or already paid."]);
    exit;
}

$row = $result->fetch_assoc();
$id = $row['id'];

$entry_ts = strtotime($row['entry_time']);
$exit_ts = strtotime($exit_time_str);
$diff_seconds = $exit_ts - $entry_ts;

if ($diff_seconds <= 0) {
    $hours = 0;
} else {
    $hours = ceil($diff_seconds / 3600);
}
// Minimum 1 hour fee
if ($hours == 0) $hours = 1;

$fee = $hours * 10;

// Update record
$stmt = $conn->prepare("UPDATE parking SET exit_time = ?, fee = ?, status = 'paid' WHERE id = ?");
$stmt->bind_param("sii", $exit_time_str, $fee, $id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true, 
        "message" => "Exit processed successfully.", 
        "fee" => $fee, 
        "duration_hours" => $hours,
        "entry_time" => $row['entry_time'],
        "exit_time" => $exit_time_str
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Database error."]);
}
?>
