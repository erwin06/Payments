<?php

class User {

    static function checkAdmin($data) {
        $userid = $data->userid;
        $sessionid = $data->sessionid;
        return Connection::moreThanOne("SELECT * FROM user WHERE iduser = '$userid' AND sessionid = '$sessionid' AND isadmin = 1");
    }

    /**
     * 
     * 
     */
    static function login($data) {
        $user = $data->user ? $data->user : "";
        $password = md5($data->password);
        $result = Connection::getInstance()->select("SELECT iduser, user, pass, isadmin, name FROM user WHERE user = '$user' AND pass = '$password'");
        $response = new Response(false, "Usuario o contraseña incorrecta");
        if ($result['result'] == true) {
            $count = $result['resultCount'];
            // No encontró ningun usuario con esas caracteristicas
            if ($count > 0) {
                $arr = array();
                $sessionid = md5(date("Y-m-d h:m:s"));
                $resultData = $result['resultData'][0];
                $idUser = isset($resultData[0]) ? $resultData[0] : -1;
                $isAdmin = isset($resultData[3]) ? $resultData[3] : 0;
                $name = isset($resultData[4]) ? $resultData[4] : 'Desconocido';
                $arr['sessionid'] = $sessionid;
                $arr['userid'] = $idUser;
                $arr['isadmin'] = $isAdmin;
                $arr['name'] = $name;
                $resultUpdate = Connection::getInstance()->update("UPDATE user SET  sessionid = '$sessionid' WHERE iduser = '$idUser'");

                if ($resultUpdate['result'] == true) {
                    $response = new Response(true, "Loggin correcto", $arr);
                } else {
                    $response = new Response(false, "Error al ingresar");
                }
            }
        }
        return $response->getResponse();
    }

    /**
     * Checkea si un usuario tiene una session activa
     * @param type $userdata
     * @return boolean
     */
    static function checkSession($userdata) {
        $userid = $userdata->userid;
        $sessionid = $userdata->sessionid;
        $result = Connection::getInstance()->select("SELECT * FROM user WHERE idUser = '$userid' AND sessionid = '$sessionid'");

        if ($result['result'] == true) {
            $count = $result['resultCount'];
            if ($count > 0) {
                return true;
            }
        }
        return false;
    }

    static function getUsers() {
        $select = array('iduser', 'user', 'name');
        $from = 'user';
        $arr = Connection::getInstance()->selectPlus($select, $from);
        if ($arr != null)
            $response = new Response(true, "Almuerzos obtenidos", $arr);
        else
            $response = new Response(false, "No hay alumnos");

        return $response->getResponse();
    }

    static function restorePass($data) {
        $iduser = $data->iduser;
        $pass = md5(12345);
        Connection::getInstance()->update("UPDATE user SET pass='$pass' WHERE iduser='$iduser'");
        $response = new Response(true, "Contraseña restaurada");

        return $response->getResponse();
    }

    static function changePassword($data, $userData) {
        $userid = $userData->userid;
        $currentPass = md5($data->currentPass);
        $newPass = $data->newPass;
        $newPass2 = $data->newPass2;
        if (Connection::getInstance()->moreThanOne("SELECT * FROM user WHERE idUser='$userid' AND pass='$currentPass'")) {

            if ($newPass == $newPass2) {
                $newPass = md5($newPass);
                $result = Connection::getInstance()->update("UPDATE user SET pass='$newPass' WHERE idUser='$userid'");
                if ($result['result'] == true) {
                    if($result['affected_rows'] > 0){
                        $response = new Response(true, "Cambio exitoso!");
                    } else {
                        $response = new Response(false, "Hubo un problema en el servidor. Intente nuevamente más tarde");
                    }
                } else {
                    $response = new Response(false, "Hubo un problema en el servidor. Intente nuevamente más tarde");
                }
            } else {
                $response = new Response(false, "Las contraseñas no coinciden");
            }
        } else {
            $response = new Response(false, "Contraseña incorrecta");
        }

        return $response->getResponse();
    }

}
