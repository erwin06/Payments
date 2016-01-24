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

    static function deleteProduct($data, $userData){

        if(!User::checkSession($userData))
            return Error::noPermission();

        $response = new Response(false, "Ups! No se pudo elimiar el producto");

        $mysqli = Connection::getInstance()->getDB();

        if ($stmt = $mysqli->prepare("DELETE FROM products WHERE id_product = ? AND id_user = ?")) {
            $stmt->bind_param("ii", $data->idProduct, $data->idUser);
            if($stmt->execute()){
                if ($stmt = $mysqli->prepare("DELETE FROM payments WHERE id_product = ?")) {
                    $stmt->bind_param("i", $data->idProduct);
                    if($stmt->execute()){
                        $response = new Response(true, "Producto eliminado");
                    }
                }
            }
        }

        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError(); 
    }

    static function getAllProducts($userData){
        
        if(!User::checkSession($userData))
            return Error::noPermission();

        $response = new Response(false, "Ups! Algo no salió como esperaba");
        $products = array();

        $mysqli = Connection::getInstance()->getDB();

        if ($stmt = $mysqli->prepare("SELECT products.id_product as id_product, products.description as description, products.id_owner as id_owner, products.id_company as id_company, companies.name as company_name, owners.name as owner_name from products INNER JOIN companies ON products.id_company = companies.id_company left JOIN owners ON products.id_owner = owners.id_owner WHERE products.id_user = ?")) {
            $stmt->bind_param("i", $userData->idUser);
            if($stmt->execute()){
                $stmt->bind_result($id_product, $description, $id_owner, $id_company, $company_name, $owner_name);
                while($stmt->fetch()){
                    $pay = array();
                    $pay["idProduct"] = $id_product;
                    $pay["description"] = $description;
                    $pay["idOwner"] = $id_owner;
                    $pay["ownerName"] = $owner_name;
                    $pay["idCompany"] = $id_company;
                    $pay["companyName"] = $company_name;
                    array_push($products,$pay);
                }

                $response = new Response(true, "Recuperado",$products);
            }
        }

        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError(); 
    }
}
