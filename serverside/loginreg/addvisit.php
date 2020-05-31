<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
require __DIR__ . '/middlewares/Auth.php';

$allHeaders = getallheaders();
$db_connection = new Database();
$conn = $db_connection->dbConnection();
$auth = new Auth($conn, $allHeaders);


function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

function base64_to_png($base64_string, $starter) {
    // open the output file for writing
    $maindirectory = "uploads/";
    $output_file = $starter."_".time().".png";
    $path = $maindirectory.$output_file;
    $ifp = fopen( $path, 'wb' ); 
    // $base64_string = "data:image/png;base64";
    // split the string on commas
    // $data[ 0 ] == "data:image/png;base64"
    // $data[ 1 ] == <actual base64 string>
    $data = explode( ',', $base64_string );

    // we could add validation here with ensuring count( $data ) > 1
    fwrite( $ifp, base64_decode( $data[ 1 ] ) );

    // clean up the file resource
    fclose( $ifp ); 

    return $output_file; 
}

$returnData = [
    "success" => 0,
    "status" => 401,
    "message" => "Unauthorized"
];


if ($auth->isAuth()) {
    // $returnData = $auth->isAuth();
    $data = json_decode(file_get_contents("php://input"));
    // print_r($data);
    //return false;
    if (
        isset($data->user_id)
        && isset($data->client_id)
        && isset($data->latitude)
        && isset($data->longitude)
        // && isset($data->shopname)
        && isset($data->shopimage)
        && isset($data->productimage)
    ) {
        try {
            $shopimage = base64_to_png($data->shopimage, "shop");
            $productimage = "";
            
            for($i = 0; $i < count($data->productimage); $i++){
                $imageCreationAndName = base64_to_png($data->productimage[$i], "product"."_".$i);
                $productimage .= $imageCreationAndName.",";
            }
            
            $addVisit = "insert into visitdata (user_id, client_id, latitude, longitude, shopimage, productimage) values('$data->user_id', '$data->client_id', '$data->latitude', '$data->longitude', '$shopimage', '$productimage')";
            
            $query_stmt = $conn->prepare($addVisit);
            $execution = $query_stmt->execute();
            if($execution)
                $returnData = msg(1, 200, 'Data Inserted successfully');
            else
                $returnData = msg(0, 500, 'Error while inserting data');
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    } else {
        // echo "asd";
        $returnData = msg(0, 422, 'Please Fill in all Required Fields!');
    }
}

echo json_encode($returnData);
