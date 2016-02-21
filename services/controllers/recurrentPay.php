<?php

class RecurrentPay {

    static function addRecurrentPay($data, $userData){

        if(!User::checkSession($userData))
            return Error::noPermission();

        // --- Validación de datos
        
        if(!isset($data->description))
            return Error::genericError();

        // --- Validación de datos
        if(Connection::getInstance()->moreThanOne("SELECT * FROM recurrents WHERE id_user = '$userData->idUser' AND description = '$data->description'")){
            $response = new Response(false, "Ya existe un pago recurrente con ese nombre");
            return $response->getResponse();
        }

        $mysqli = Connection::getInstance()->getDB();

        if ($stmt = $mysqli->prepare("INSERT INTO recurrents (id_user, description, amount) VALUES (?,?,?)")) {
            $stmt->bind_param("isd", $userData->idUser, $data->description, (isset($data->amount)?$data->amount:0));
            if($stmt->execute()){
                $response = new Response(true, "Se cargó con éxito");
            }
        }

        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();
    }

    static function getRecurrentPayments($data, $userData) {

        if(!User::checkSession($userData))
            return Error::noPermission();

        $mysqli = Connection::getInstance()->getDB();

        if ($stmt = $mysqli->prepare("SELECT id_recurrent, description, amount FROM recurrents WHERE id_user = ?")) {
            $stmt->bind_param("i", $userData->idUser);
            if($stmt->execute()){
                $stmt->bind_result($id_recurrent, $description, $amount);
                $recurrents = array();
                while($stmt->fetch()){
                    $rec = array();
                    $rec["idRecurrent"] = $id_recurrent;
                    $rec["description"] = $description;
                    $rec["originalAmount"] = $amount;
                    array_push($recurrents, $rec);
                }
            }
        }  

        if(isset($recurrents)){
            if ($stmt = $mysqli->prepare("SELECT id_recurrent_payment, amount, month, year, id_recurrent, status, id_user FROM recurrent_payments WHERE id_user = ? AND month = ? AND year = ?")) {
                
                $stmt->bind_param("iii", $userData->idUser, $data->month, $data->year);
                if($stmt->execute()){

                    $stmt->bind_result($id_recurrent_payment, $amount, $month, $year, $id_recurrent, $status, $id_user);
                    while($stmt->fetch()){
                        for($i=0; $i < count($recurrents); $i++){
                            if($recurrents[$i]["idRecurrent"] == $id_recurrent){
                                $recurrents[$i]["idRecurrentPayment"] = $id_recurrent_payment;
                                $recurrents[$i]["payedAmount"] = $amount;
                                $recurrents[$i]["year"] = $year;
                                $recurrents[$i]["status"] = $status;
                                $recurrents[$i]["month"] = $month;
                                continue;
                            }
                        }
                    }

                    $response = new Response(true, "Se recuperó con exito", $recurrents);
                }
            }  
        }

        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();

    }

    static function generatePayment($data, $userData) {

        if(!User::checkSession($userData))
            return Error::noPermission();

        $mysqli = Connection::getInstance()->getDB();

        if ($stmt = $mysqli->prepare("INSERT INTO recurrent_payments (amount, month, year, id_recurrent, id_user, status) VALUES (?,?,?,?,?,2)")) {
            $stmt->bind_param("diiii",$data->amount, $data->month, $data->year, $data->idRecurrent, $userData->idUser);
            if($stmt->execute()){
                $response = new Response(true, "Se cargó correctamente");
            }

            var_dump($mysqli->error);
        }        

        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();

    }

    static function getRecurrentById($data, $userData){

        if(!User::checkSession($userData))
            return Error::noPermission();

        $mysqli = Connection::getInstance()->getDB();

        if ($stmt = $mysqli->prepare("SELECT id_recurrent, id_user, description, amount FROM recurrents WHERE id_user = ? AND id_recurrent = ?")) {
            $stmt->bind_param("ii", $userData->idUser, $data->idRecurrent);
            if($stmt->execute()){
                $stmt->bind_result($id_recurrent, $id_user, $description,$amount);
                $recurrent = array();
                if($stmt->fetch()){
                    $recurrent["idRecurrent"] = $id_recurrent;
                    $recurrent["idUser"] = $id_user;
                    $recurrent["description"] = $description;
                    $recurrent["amount"] = $amount;
                }
                $response = new Response(true, "Result OK", $recurrent);
            }
        }

        if(isset($stmt)) $stmt->close();
        return isset($response) ? $response->getResponse() : Error::genericError();

    }

}