<?php
include('configure.php');

if ($dont_use_wp) {
    include('functions_nowp.php');
} else {
    include('functions_wp.php');
}
?>
