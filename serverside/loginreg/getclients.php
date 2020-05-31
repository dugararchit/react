<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success, $status, $message, $data)
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message,
        'data'=> $data
    ]);
}

require __DIR__ . '/classes/Database.php';
require __DIR__ . '/middlewares/Auth.php';

$allHeaders = getallheaders();
$db_connection = new Database();
$conn = $db_connection->dbConnection();
$auth = new Auth($conn, $allHeaders);

$returnData = [];

$returnData = [
    "success" => 0,
    "status" => 401,
    "message" => "Unauthorized"
];


if ($_SERVER["REQUEST_METHOD"] != "GET") {
    $returnData = msg(0, 404, 'Page Not Found!');
} else {
    if ($auth->isAuth()) {
        try {
            $fetch_clients = "SELECT * FROM `clients`";
            $query_stmt = $conn->prepare($fetch_clients);
            $query_stmt->execute();
            $row = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
            $returnData = msg(1, 200, 'Data', $row);
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    }
}
echo json_encode($returnData);
