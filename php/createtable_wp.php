<?php

define( 'SHORTINIT', true );
require( $_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
global $wpdb;

$charset = $wpdb->get_charset_collate();
$table = $wpdb->prefix . 'mother_inter_stats';

$sql = "CREATE TABLE IF NOT EXISTS $table (patch_id varchar(20) NOT NULL, uses INT, PRIMARY KEY (patch_id)) $charset;";

$result = $wpdb->query($sql);

echo $result;

?>
