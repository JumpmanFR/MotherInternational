<?php
$dont_use_wp = false;
if(file_exists("configure.php")){
    include('configure.php');
}

if ($dont_use_wp) {
    include('functions_nowp.php');
} else {
    include('functions_wp.php');
}
?>
