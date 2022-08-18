<?php

define( 'SHORTINIT', true );
require( $_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
global $wpdb;

$table = $wpdb->prefix . 'mother_inter_stats';
$param = $_POST['patchId'];

$param = preg_replace("/[^A-Za-z0-9\- ]/", '', $param);

if (!$param) {
    die();
}

$sql_up = "INSERT INTO $table VALUES ('%s', 1) ON DUPLICATE KEY UPDATE uses = uses + 1";
$safe_sql_up = $wpdb->prepare($sql_up, $param);

$result_up = $wpdb->query($safe_sql_up);

if (!$result_up) {
    die();
}

$sql = "SELECT uses FROM $table WHERE patch_id='%s'";
$safe_sql = $wpdb->prepare($sql, $param);

echo $wpdb->get_var($safe_sql);

?>
