<?php 


class User {

	public function login($request, $mysqli){


		// bUdJVHVNMklhZlF1R2h3enJWblhXUT09 // daredevil
		// Q2tiMHd2YVRWZVJxSDFyVXdUV1c0UT09 // joker

		// echo encrypt_decrypt("decrypt","cmpDZlh3VitGRHFyRnh4cU1xK0RWTFdxdjQ4YUw3aVNLb3puY1UwVkJWYz0=");
		// echo encrypt_decrypt("encrypt","joker");
		checkParam(isset($request->user),"Debe ingresar el usuario o el e-mail","user_param_no_found");
		checkParam(isset($request->password),"Debe ingresar la contraseña","password_param_no_found");

	    if ($stmt = $mysqli->prepare("SELECT id_user, email, password FROM users WHERE email=? AND password=?")) {
	        $stmt->bind_param("ss", $request->user, $request->password);
	        if($stmt->execute()){
	        	$stmt->bind_result($idUser, $email, $password);
	        	if($stmt->fetch()){

	        		$sessionId = md5(date("Y-m-d h:m:s"));

	        		// echo $idUser."___".$sessionId;
	        		// echo $idUser;
	        		echo encrypt($idUser."___".$sessionId,$password);
	        		// var_dump($row);
	        	}
	        	
	            // $stmt->bind_result($idUser, $email,$password);
	            // if ($stmt->fetch()) { 
	            //     $sessionId = md5(date("Y-m-d h:m:s"));
	            //     $stmt->prepare("UPDATE users SET id_session = '$sessionId' WHERE id_user = '$idUser'");
	            //     if($stmt->execute()){
	            //         $arr['idSession'] = $sessionId;
	            //         $arr['idUser'] = $idUser;
	            //         $response = new Response(true, "Loggin correcto", $arr);
	            //     }
	            // } else {
	            //     $response = new Response(false, "Email o contraseña incorrecta");
	            // }
	        }
	    }

	}
}