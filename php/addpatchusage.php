<?php
// Quick and dirty PHP script to respond to the XHR request to increment the number of uses for a specific patch

$servername = "localhost";
$database = "mother_international";
include('passwords.php');

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die();
}

$param = $_POST['patchId'];

$param = preg_replace("/[^A-Za-z0-9\- ]/", '', $param);

if (!$param) {
    die("");
}

$sqlIns = "INSERT IGNORE INTO patch_stats values ('". $param . "',0)";

$resultIns = $conn->query($sqlIns);

if (!$resultIns) {
    die();
}

$sqlUp = "UPDATE patch_stats SET uses = uses + 1 WHERE patch_id='".$param."'";

$resultUp = $conn->query($sqlUp);

if (!$resultUp) {
    die();
}

$sql = "SELECT uses FROM patch_stats WHERE patch_id='".$param."'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_row();
    echo $row[0];
} else {
    echo "0";
}

$conn->close();
?>