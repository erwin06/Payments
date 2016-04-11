<?php 
	
	include("class/response.php");

	include("class/user.php");

	$_servidor = "localhost";
	$_basedatos = "m2000315_payment";
	$_usuario = "GOfa20sawa";
	$_password = "m2000315_payment";

	if($_SERVER['HTTP_HOST'] == 'localhost'){	
		$_usuario = "root";
		$_password = "";
	}

	$mysqli = new mysqli($_servidor, $_usuario, $_password, $_basedatos);
	$mysqli->set_charset("utf8");

    $request = json_decode(file_get_contents("php://input"));
    $operation = $_GET["op"];

    function checkParam($existsParam, $message, $code){
    	if(!$existsParam){
    		$arr = [];
    		$arr["succ"] =  false;
    		$arr["error_code"] = $code;
    		$arr["message"] = $message;
    		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    		exit;
    	}
    }

    function encrypt($string, $secret_key){
    	return encrypt_decrypt("encrypt", $string, $secret_key);
    }

    function decrypt($string, $secret_key){
    	return encrypt_decrypt("decrypt", $string, $secret_key);
    }

    function encrypt_decrypt($action, $string, $secret_key) {
	    $output = false;

	    $encrypt_method = "AES-256-CBC";
	    $secret_iv = 'daredevil';

	    // hash
	    $key = hash('sha256', $secret_key);
	    
	    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
	    $iv = substr(hash('sha256', $secret_iv), 0, 16);

	    if( $action == 'encrypt' ) {
	        $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
	        $output = base64_encode($output);
	    }
	    else if( $action == 'decrypt' ){
	        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
	    }

	    return $output;
	}
