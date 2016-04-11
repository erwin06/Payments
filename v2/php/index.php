<?php
    
    include("start.php");

    switch ($operation) {

        case 'login':

            $result = (new User())->login($request, $mysqli);
            break;
        
    }

    try { $mysqli->close(); } catch (Exception $e) {}


    echo json_encode($result->getResponse(), JSON_UNESCAPED_UNICODE);
    
