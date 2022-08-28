<?php

$conn = new mysqli($servername, $username, $password, $database);
$table = "patch_stats";

// Check connection
if ($conn->connect_error) {
  die();
}

function db_query($sql, $param = null) {
    global $conn;
    $param = $conn->real_escape_string($param);
    $sql = sprintf($sql, $param);
    return $conn->query($sql);
}

function db_get_var($sql, $param = null) {
    global $conn;
    $param = $conn->real_escape_string($param);
    $sql = sprintf($sql, $param);
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_row();
        return $row[0];
    } else if ($result->num_rows === 0) {
        return 0;
    }
}

function db_close() {
    global $conn;
    $conn->close();
}

?>
