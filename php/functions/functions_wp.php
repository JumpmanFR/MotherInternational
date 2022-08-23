<?php

define( 'SHORTINIT', true );
require( $_SERVER['DOCUMENT_ROOT'].'/wp-load.php' );
global $wpdb;

$charset = $wpdb->get_charset_collate();
$table = $wpdb->prefix . 'mother_inter_stats';

function db_query($sql, $param) {
    global $wpdb;
    if ($param) {
        $sql = $wpdb->prepare($sql, $param);
    }
    return $wpdb->query($sql);
}

function db_get_var($sql, $param) {
    global $wpdb;
    if ($param) {
        $sql = $wpdb->prepare($sql, $param);
    }
    return $wpdb->get_var($sql);
}

function db_close() {

}

?>
