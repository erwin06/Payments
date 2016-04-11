<?php 


    // static function login($data) {
    //     $email = $data->email ? $data->email : null;
    //     $password = $data->password ? md5($data->password) : null;

    //     if(isset($email) && isset($password)){
    //         $mysqli = Connection::getInstance()->getDB();
    //         if ($stmt = $mysqli->prepare("SELECT id_user, email, password FROM users WHERE email=? AND password=?")) {
    //             $stmt->bind_param("ss", $email, $password);
    //             if($stmt->execute()){
    //                 $stmt->bind_result($idUser, $email,$password);
    //                 if ($stmt->fetch()) { 
    //                     $sessionId = md5(date("Y-m-d h:m:s"));
    //                     $stmt->prepare("UPDATE users SET id_session = '$sessionId' WHERE id_user = '$idUser'");
    //                     if($stmt->execute()){
    //                         $arr['idSession'] = $sessionId;
    //                         $arr['idUser'] = $idUser;
    //                         $response = new Response(true, "Loggin correcto", $arr);
    //                     }
    //                 } else {
    //                     $response = new Response(false, "Email o contraseña incorrecta");
    //                 }
    //             }
    //         }
    //     }
    //     if(isset($stmt)) $stmt->close();
    //     return isset($response) ? $response->getResponse() : Error::genericError();
    // }

class User {
 
	public function login($request, $mysqli){

		checkParam(isset($request->user),"Debe ingresar el usuario o el e-mail","user_param_no_found");
		checkParam(isset($request->password),"Debe ingresar la contraseña","password_param_no_found");

        $passMD5 = md5($request->password);

		$response = new Response(false);

	    if ($stmt = $mysqli->prepare("SELECT id_user, email, password FROM users WHERE email=? AND password=?")) {
	        $stmt->bind_param("ss", $request->user, $passMD5);
	        if($stmt->execute()){
	        	$stmt->bind_result($idUser, $email, $password);
	        	if($stmt->fetch()){
	        		$sessionId = md5(date("Y-m-d h:m:s"));
	        		$stmt->prepare("UPDATE users SET id_session = '$sessionId' WHERE id_user = '$idUser'");
	        		if($stmt->execute()){
                        $arr = array();
                        $arr["hash"] = encrypt($idUser."___".$sessionId,$password);
	        			$response = new Response(true, "Login correcto", $arr);
	        		}
    	        }else {
                    $response = new Response(false, "Verifique los datos ingresados");
                }
	        } 
	    }

	    return $response;

	}
}

