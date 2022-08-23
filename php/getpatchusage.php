<?php

include('functions/functions.php');

$param = $_GET['patchId'];
$param = preg_replace("/[^A-Za-z0-9\- ]/", '', $param);

$result = db_get_var("SELECT uses FROM $table WHERE patch_id='%s'", $param);

echo $result ? $result : 0;

db_close();

?>
