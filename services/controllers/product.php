<?php

class Product {

    static function addProduct($data, $idUser) {

        $insert_id = 0;
        // --- validación de datos
        if(!isset($data->idCompany) || !isset($data->idOwner) || !isset($data->name) || !isset($data->totalPays))
            return Error::genericError();

		$mysqli = Connection::getInstance()->getDB();

        if ($stmt = $mysqli->prepare("INSERT INTO products (description, total_pays, id_owner, id_company, id_user) VALUES(?,?,?,?,?)")) {
            $stmt->bind_param("siiii", $data->name, $data->totalPays, $data->idOwner, $data->idCompany, $idUser);
            if($stmt->execute()){
                $insert_id = $mysqli->insert_id;
            }
        }

        if(isset($stmt)) $stmt->close();
        return $insert_id;
    }

    static function getProduct($data, $userData){
        
        if(!User::checkSession($userData))
            return Error::noPermission();

        $mysqli = Connection::getInstance()->getDB();

        if ($stmt = $mysqli->prepare("SELECT id_product, description, total_pays, id_owner, companies.id_company as id_company, products.id_user as id_user, companies.name as name FROM products, companies WHERE products.id_user = ? AND products.id_product = ? AND products.id_company = companies.id_company")) {
            $stmt->bind_param("ii", $userData->idUser, $data->idProduct);    
            if($stmt->execute()){
                $stmt->bind_result($id_product, $description, $total_pays, $id_owner, $id_company, $id_user, $name);
                if($stmt->fetch()){
                    $item = array();
                    $item["idProduct"] = $id_product;
                    $item["description"] = $description;
                    $item["totalPays"] = $total_pays;
                    $item["idOwner"] = $id_owner;
                    $item["idCompany"] = $id_company;
                    $item["idUser"] = $id_user;
                    $item["name"] = $name;
                }

                $response = new Response(true, "Producto recuperado", $item);
            } else {
                $response = new Response(false, "Ups! Algo no salió bien :(");
            }
        }

        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();

    }

  //   static function exists($name, $idUser) {
		// return Connection::getInstance()->moreThanOne("SELECT * FROM companies WHERE id_user = '$idUser' AND name = '$name'");
  //   }

    // static function getCompanies($userData){
    //     if(!User::checkSession($userData))
    //         return Error::noPermission();

    //     $idUser = $userData->idUser;
    //     $mysqli = Connection::getInstance()->getDB();
    //     if ($stmt = $mysqli->prepare("SELECT id_company, name FROM companies WHERE id_user = $idUser")) {
    //         if($stmt->execute()){
    //             $stmt->bind_result($id_company, $name);
    //             $result = array();
    //             while($stmt->fetch()){
    //                 $item = array();
    //                 $item["idCompany"] = $id_company;
    //                 $item["name"] = $name;
    //                 array_push($result, $item);
    //             }

    //             $response = new Response(true, "Companias recuperadas", $result);
    //         } else {
    //             $response = new Response(false, "Ups! Algo no salió bien :(");
    //         }
    //     }

    //     if(isset($stmt)) $stmt->close();
    //     return isset($response) ? $response->getResponse() : Error::genericError();

    // }

}