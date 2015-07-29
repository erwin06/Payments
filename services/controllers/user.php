<?php

class User {

    static function login($data) {
        $email = $data->email ? $data->email : null;
        $password = $data->password ? md5($data->password) : null;

        if(isset($email) && isset($password)){
            $mysqli = Connection::getInstance()->getDB();
            if ($stmt = $mysqli->prepare("SELECT id_user, email, password FROM users WHERE email=? AND password=?")) {
                $stmt->bind_param("ss", $email, $password);
                if($stmt->execute()){
                    $stmt->bind_result($idUser, $email,$password);
                    if ($stmt->fetch()) { 
                        $sessionId = md5(date("Y-m-d h:m:s"));
                        $stmt->prepare("UPDATE users SET id_session = '$sessionId' WHERE id_user = '$idUser'");
                        if($stmt->execute()){
                            $arr['idSession'] = $sessionId;
                            $arr['idUser'] = $idUser;
                            $response = new Response(true, "Loggin correcto", $arr);
                        }
                    } else {
                        $response = new Response(false, "Email o contraseña incorrecta");
                    }
                }
            }
        }
        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();
    }

    static function checkSession($userdata) {
        $userid = $userdata->idUser;
        $sessionid = $userdata->idSession;
        $result = Connection::getInstance()->select("SELECT * FROM users WHERE id_user = '$userid' AND id_session = '$sessionid'");

        if ($result['result'] == true) {
            $count = $result['resultCount'];
            if ($count > 0) {
                return true;
            }
        }
        return false;
    }

    // static function getUsers() {
    //     $select = array('iduser', 'user', 'name');
    //     $from = 'user';
    //     $arr = Connection::getInstance()->selectPlus($select, $from);
    //     if ($arr != null)
    //         $response = new Response(true, "Almuerzos obtenidos", $arr);
    //     else
    //         $response = new Response(false, "No hay alumnos");

    //     return $response->getResponse();
    // }

    // static function restorePass($data) {
    //     $iduser = $data->iduser;
    //     $pass = md5(12345);
    //     Connection::getInstance()->update("UPDATE user SET pass='$pass' WHERE iduser='$iduser'");
    //     $response = new Response(true, "Contraseña restaurada");

    //     return $response->getResponse();
    // }

    // static function changePassword($data, $userData) {
    //     $userid = $userData->userid;
    //     $currentPass = md5($data->currentPass);
    //     $newPass = $data->newPass;
    //     $newPass2 = $data->newPass2;
    //     if (Connection::getInstance()->moreThanOne("SELECT * FROM user WHERE idUser='$userid' AND pass='$currentPass'")) {

    //         if ($newPass == $newPass2) {
    //             $newPass = md5($newPass);
    //             $result = Connection::getInstance()->update("UPDATE user SET pass='$newPass' WHERE idUser='$userid'");
    //             if ($result['result'] == true) {
    //                 if($result['affected_rows'] > 0){
    //                     $response = new Response(true, "Cambio exitoso!");
    //                 } else {
    //                     $response = new Response(false, "Hubo un problema en el servidor. Intente nuevamente más tarde");
    //                 }
    //             } else {
    //                 $response = new Response(false, "Hubo un problema en el servidor. Intente nuevamente más tarde");
    //             }
    //         } else {
    //             $response = new Response(false, "Las contraseñas no coinciden");
    //         }
    //     } else {
    //         $response = new Response(false, "Contraseña incorrecta");
    //     }

    //     return $response->getResponse();
    // }


    static function register($data){
        $userMail = $data->email ? $data->email : null;
        $password = $data->password ? $data->password : null;
        $newPassword = $data->repeatPassword ? $data->repeatPassword : null;

        if(isset($userMail) && isset($password) && isset($newPassword)){
            $sanitized_mail = filter_var($userMail, FILTER_SANITIZE_EMAIL);
            if (filter_var($sanitized_mail, FILTER_VALIDATE_EMAIL)) {
                if(self::existsEmail($sanitized_mail)){
                    $response = new Response(false, "El Email ya fué registrado");
                }else{
                    if($password == $newPassword){
                        if(preg_match("/[a-zA-z0-9]{6,20}/",$password)){
                            $mysqli = Connection::getInstance()->getDB();
                            if ($stmt = $mysqli->prepare("INSERT INTO users (email, password) VALUES (?, ?)")) {
                                $stmt->bind_param("ss", $sanitized_mail, md5($password));
                                if($stmt->execute()){
                                    $response = new Response(true, "El usuario se registró correctamente");
                                }
                            }
                        } else {
                             $response = new Response(false, "La contraseña no es válida");
                        }   
                    } else {
                        $response = new Response(false, "Las contraseñas no coinciden");
                    }
                }
            } else { 
                $response = new Response(false, "Ingrese un E-mail válido");
            }
        }

        return isset($response) ? $response->getResponse() : Error::genericError();
    }

    static function existsEmail ($mail) {
         return Connection::getInstance()->moreThanOne("SELECT * FROM user WHERE email = '$mail'");
    }
}
