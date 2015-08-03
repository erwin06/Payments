<?php

class Company {

    static function addCompany($data, $userData) {

    	if(!User::checkSession($userData))
            return Error::noPermission();

        $name = isset($data->name) ? $data->name : null;
        $idUser = $userData->idUser;

        if(isset($name)){

        	if(Company::exists($name,$idUser)){
        		$response = new Response(false, "Ups! Ya lo tenías agregado! :D");
        	} else {
        		$mysqli = Connection::getInstance()->getDB();
	            if ($stmt = $mysqli->prepare("INSERT INTO companies (id_user, name) VALUES (?,?)")) {
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
		return Connection::getInstance()->moreThanOne("SELECT * FROM companies WHERE id_user = '$idUser' AND name = '$name'");
    }

    static function getCompanies($userData){
        if(!User::checkSession($userData))
            return Error::noPermission();

        $idUser = $userData->idUser;
        $mysqli = Connection::getInstance()->getDB();
        if ($stmt = $mysqli->prepare("SELECT id_company, name FROM companies WHERE id_user = $idUser ORDER BY name ASC")) {
            if($stmt->execute()){
                $stmt->bind_result($id_company, $name);
                $result = array();
                while($stmt->fetch()){
                    $item = array();
                    $item["idCompany"] = $id_company;
                    $item["name"] = $name;
                    array_push($result, $item);
                }

                $response = new Response(true, "Companias recuperadas", $result);
            } else {
                $response = new Response(false, "Ups! Algo no salió bien :(");
            }
        }

        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();

    }

}