<?php
// Quick and dirty PHP script to respond to the XHR request to increment the number of uses for a specific patch

const PATCH_DONE_PREFIX = 'patch_done_';

if (!isset($_SESSION)) {
    session_start(['cookie_samesite' => 'Strict']);
}

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
    die();
}

if ($_SESSION[PATCH_DONE_PREFIX . $param]) {
    echo(0);
    die();
}

$sql_up = "INSERT INTO $table VALUES ('$param', 1) ON DUPLICATE KEY UPDATE uses = uses + 1";

$result_up = $conn->query($sql_up);

if (!$result_up) {
    die();
}

$_SESSION[PATCH_DONE_PREFIX . $param] = true;

$sql = "SELECT uses FROM $table WHERE patch_id='$param'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_row();
    echo $row[0];
} else {
    echo "0";
}

$conn->close();
?>
