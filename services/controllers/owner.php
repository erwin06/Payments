<?php

class Owner {

    static function addOwner($data, $userData) {

    	if(!User::checkSession($userData))
            return Error::noPermission();

        $name = isset($data->name) ? $data->name : null;
        $idUser = $userData->idUser;

        if(isset($name)){

        	if(Owner::exists($name,$idUser)){
        		$response = new Response(false, "Ups! Ya lo tenías agregado! :D");
        	} else {
        		$mysqli = Connection::getInstance()->getDB();
	            if ($stmt = $mysqli->prepare("INSERT INTO owners (id_user, name) VALUES (?,?)")) {
	                $stmt->bind_param("is", $idUser, $name);
	                if($stmt->execute()){
	                    $response = new Response(true, "Se cargó correctamente");
	                }
	            }
        	}
        }
        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();
    }

    static function exists($name, $idUser) {
		return Connection::getInstance()->moreThanOne("SELECT * FROM owners WHERE id_user = '$idUser' AND name = '$name'");
    }

    static function getOwners($userData){
        if(!User::checkSession($userData))
            return Error::noPermission();

        $idUser = $userData->idUser;
        $mysqli = Connection::getInstance()->getDB();
        if ($stmt = $mysqli->prepare("SELECT id_owner, name FROM owners WHERE id_user = $idUser ORDER BY name ASC")) {
            if($stmt->execute()){
                $stmt->bind_result($id_owner, $name);
                $result = array();

                $mySelft = array();
                $mySelft["idOwner"] = 0;
                $mySelft["name"] = "Yo mismo";
                array_push($result, $mySelft);
                
                while($stmt->fetch()){
                    $item = array();
                    $item["idOwner"] = $id_owner;
                    $item["name"] = $name;
                    array_push($result, $item);
                }

                $response = new Response(true, "Responsables recuperados", $result);
            } else {
                $response = new Response(false, "Ups! Algo no salió bien :(");
            }
        }

        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();

    }

}