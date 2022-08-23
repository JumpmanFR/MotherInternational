<?php

const PATCH_DONE_PREFIX = 'patch_done_';

if (!isset($_SESSION)) {
    session_start(['cookie_samesite' => 'Strict']);
}

include('functions/functions.php');

$param = $_POST['patchId'];

if (!$param) {
    $param = $_GET['patchId'];
}

$param = preg_replace("/[^A-Za-z0-9\- ]/", '', $param);

if (!$param) {
    die();
}

if ($_SESSION[PATCH_DONE_PREFIX . $param]) {
    echo(0);
    die();
}

$result_up = db_query("INSERT INTO $table VALUES ('%s', 1) ON DUPLICATE KEY UPDATE uses = uses + 1", $param);

if (!$result_up) {
    die();
}

$_SESSION[PATCH_DONE_PREFIX . $param] = true;

echo db_get_var("SELECT uses FROM $table WHERE patch_id='%s'", $param);

db_close();

?>
