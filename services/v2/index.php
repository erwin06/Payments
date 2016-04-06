<?php
	
	// include("conf/include.php");

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);


    // if($request->operation ==  "login"){x
    // 	echo (new Login())->login();
    // 	return;
    // }


    // echo json_encode();

?>