<?php
// Quick and dirty PHP script to create the MySQL table

include('passwords.php');

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die();
}

$sql = "CREATE TABLE IF NOT EXISTS $table (patch_id varchar(20) NOT NULL, uses INT, PRIMARY KEY (patch_id));";

$result = $conn->query($sql);

echo $result;

$conn->close();
?>
