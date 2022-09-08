<?php

define( 'SHORTINIT', true );
require( $_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
global $wpdb;

$charset = $wpdb->get_charset_collate();
$table = $wpdb->prefix . 'mother_inter_stats';

function db_query($sql, $param = null) {
    global $wpdb;
    if ($param) {
        $sql = $wpdb->prepare($sql, $param);
    }
    return $wpdb->query($sql);
}

function db_get_results($sql, $param = null) {
    global $wpdb;
    if ($param) {
        $sql = $wpdb->prepare($sql, $param);
    }
	$result = $wpdb->get_results($sql, ARRAY_A);
}

function db_get_var($sql, $param = null) {
    global $wpdb;
    if ($param) {
        $sql = $wpdb->prepare($sql, $param);
    }
    $result = $wpdb->get_var($sql);
    return $result ? $result : 0;
}

function db_close() {
    // do nothing
}

?>
