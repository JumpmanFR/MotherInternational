<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <style>
            table, td {
                border: 1px solid black;
                border-collapse: collapse;
                padding: 0.5em;
            }
            td:not(:first-child) {
                text-align: center;
            }
            thead {
                font-weight: bold;
            }
        </style>
        <title>Usage stats</title>
        <script src="../js/locale.js"></script>
        <script src="../js/consts.js"></script>
        <script src="../js/datatypes/patch_project.js"></script>
        <script src="../js/datatypes/patch_version.js"></script>
        <script src="../js/utils.js"></script>
        <script src="../js/database.js"></script>
        <script>
            <?php
                include('functions/functions.php');
                $rows = db_get_results("SELECT * FROM $table");
                db_close();
                foreach ($rows as $row) {
                    printf("PATCH_VERSIONS['%s'].uses = %s;\n", $row["patch_id"], $row["uses"]);
                }
            ?>
        </script>
    </head>
    <body>
        <table id="stats-table">
            <thead>
                <td>Patch</td>
                <td>Usage</td>
            </thead>
        </table>
        <script>
            function _(str) {return LOCALIZATION["en"][str]}
            var tableElt = document.getElementById("stats-table");
            for (var i in PATCH_VERSIONS) {
                var rowElt = document.createElement("tr");
                tableElt.appendChild(rowElt);
                var idElt = document.createElement("td");
                idElt.textContent = PATCH_VERSIONS[i].getDesc(true);
                rowElt.appendChild(idElt);
                var usesElt = document.createElement("td");
                usesElt.textContent = PATCH_VERSIONS[i].uses || 0;
                rowElt.appendChild(usesElt);
            }
        </script>
    </body>
</html>
