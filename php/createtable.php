<?php

include('functions/functions.php');

echo db_query("CREATE TABLE IF NOT EXISTS $table (patch_id varchar(20) NOT NULL, uses INT, PRIMARY KEY (patch_id)) $charset;");

db_close();

?>
