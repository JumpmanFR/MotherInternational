<?php

define( 'SHORTINIT', true );
require( $_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
global $wpdb;

$table = $wpdb->prefix . 'mother_inter_stats';
$param = $_GET['patchId'];

$param = preg_replace("/[^A-Za-z0-9\- ]/", '', $param);

$sql = "SELECT uses FROM $table WHERE patch_id='%s'";

$safe_sql = $wpdb->prepare($sql, $param);

$result = $wpdb->get_var($safe_sql);

echo $result ? $result : 0;

?>
