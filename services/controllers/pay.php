<?php

class Pay {

    static function addPay($data, $userData) {

    	if(!User::checkSession($userData))
            return Error::noPermission();

        // --- Validación de datos
        
        if(!isset($data->amount) || !isset($data->idCompany) || !isset($data->idOwner) || !isset($data->month) || !isset($data->name) || !isset($data->totalPays) || !isset($data->year))
            return Error::genericError();

        // --- Valido los datos
        if(!Connection::getInstance()->moreThanOne("SELECT * FROM companies WHERE id_user = '$userData->idUser' AND id_company = '$data->idCompany'")){
            return Error::genericError(); 
        }

        if($data->idOwner != 0 && !Connection::getInstance()->moreThanOne("SELECT * FROM owners WHERE id_user = '$userData->idUser' AND id_owner = '$data->idOwner'")){
            return Error::genericError(); 

        }

        $idProduct = Product::addProduct($data, $userData->idUser);

        if($idProduct == 0)
            return Error::genericError();

		$mysqli = Connection::getInstance()->getDB();

        for($i = 1; $i <= $data->totalPays; $i++){

            // Inserto los pagos
            if ($stmt = $mysqli->prepare("INSERT INTO payments (amount, month, year, payment_number, id_product, status) VALUES (?,?,?,?,?,?)")) {
                $status = $data->idOwner == 0 ? 1 : 4;
                $stmt->bind_param("diiiii", $data->amount, $data->month, $data->year,$i, $idProduct, $status);
                if($stmt->execute()){
                    $data->month++;

                    if($data->month > 12){
                        $data->month = 1;
                        $data->year++;
                    }
                }
            }
        }


        $response = new Response(true, "Mierda, andubo todo bien! ");



        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();
    }

    static function getPays($data, $userData){

        if(!User::checkSession($userData))
            return Error::noPermission();

        if(!isset($data->month) || !isset($data->year))
            return Error::genericError();

        $mysqli = Connection::getInstance()->getDB();

        $owners = array();

        if ($stmt = $mysqli->prepare("SELECT id_owner, name FROM owners WHERE id_user = $userData->idUser")) {
            if($stmt->execute()){

                $stmt->bind_result($id_owner, $name);

                while($stmt->fetch()){
                    $owner = array();
                    $owner["idOwner"] = $id_owner;
                    $owner["name"] = $name;
                    array_push($owners,$owner);
                }
            }
        }

        $companies = array();
        if ($stmt = $mysqli->prepare("SELECT id_company, name FROM companies WHERE id_user = $userData->idUser")) {
            if($stmt->execute()){

                $stmt->bind_result($id_company, $name);

                while($stmt->fetch()){
                    $comp = array();
                    $comp["idCompany"] = $id_company;
                    $comp["name"] = $name;
                    array_push($companies,$comp);
                }
            }
        }
        
        $payments = array();
        if ($stmt = $mysqli->prepare("SELECT products.id_product, description, total_pays, id_owner,id_company, id_payment, amount, payment_number, status  FROM products, payments WHERE products.id_product = payments.id_product AND id_user = ? AND month = ? AND year = ? ORDER BY products.id_company, products.description")) {
            $stmt->bind_param("iii", $userData->idUser, $data->month, $data->year);
            if($stmt->execute()){
                $stmt->bind_result($id_product, $description, $total_pays,$id_owner,$id_company,$id_payment,$amount,$payment_number, $status);
                while($stmt->fetch()){
                    $pay = array();
                    $pay["idProduct"] = $id_product;
                    $pay["description"] = $description;
                    $pay["totalPays"] = $total_pays;
                    $pay["idOwner"] = $id_owner;
                    $pay["idCompany"] = $id_company;
                    $pay["idPayment"] = $id_payment;
                    $pay["paymentNumber"] = $payment_number;
                    $pay["status"] = $status;
                    $pay["amount"] = $amount;
                    array_push($payments,$pay);
                }
            }
        }


        $arr = array();
        $arr["owners"] = $owners;
        $arr["companies"] = $companies;
        $arr["payments"] = $payments;
        $response = new Response(true, "Recuperado",$arr);



        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();


    }

    static function updatePay($data, $userData){
        if(!User::checkSession($userData))
            return Error::noPermission();

        if(!Connection::getInstance()->moreThanOne("SELECT * FROM payments, products, users WHERE users.id_user = '$userData->idUser' AND products.id_user = users.id_user AND payments.id_product = products.id_product AND payments.id_payment = '$data->idPayment'")){
            return Error::genericError(); 
        }

        $mysqli = Connection::getInstance()->getDB();
        
        if ($stmt = $mysqli->prepare("UPDATE payments SET status = ? WHERE id_payment = ?")) {
            $stmt->bind_param("ii", $data->status, $data->idPayment);
            if($stmt->execute()){
                $response = new Response(true, "OKs");
            }   
        }

        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();

    }

}