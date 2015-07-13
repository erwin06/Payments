<?php

class Menu {

    static function add($data) {

        $menus = $data->menus;
        $date = $data->date;
        $typeAdd = $data->type;
        
        if (Menu::checkLunch($date, $typeAdd)) {
            $response = new Response(false, "Ya hay un menú ese día");
        } else {
            $result = Connection::getInstance()->insert("INSERT INTO lunch (date, status, type) VALUES ('$date', 1, $typeAdd)");
            if ($result['result'] == true) {
                $menusCount = count($menus);
                $idmenu = $result['insert_id'];
                for ($i = 0; $i < $menusCount; $i++) {
                    $description = $menus[$i]->description;
                    if($typeAdd == 1)
                        $type = $menus[$i]->type;
                    else 
                        $type = "";
                    Connection::getInstance()->insert("INSERT INTO menu (description, menutype, idlunch) VALUES ('$description','$type',$idmenu)");
                }
                $response = new Response(true, "Se cargó correctamente");
            } else {
                $response = new Response(false, "Hubo un problema con el servidor. Intente nuevamente más tarde");
            }
        }
        return $response->getResponse();
    }

    static function checkLunch($date, $type) {
        return Connection::getInstance()->moreThanOne("SELECT * FROM lunch WHERE date = '$date' AND type=$type");
    }

    static function getLunchs() {
        $select = array('idlunch', 'date', 'status');
        $from = 'lunch';
        $extra = 'order by idlunch desc';
        $arr = Connection::getInstance()->selectPlus($select, $from, null, null, $extra);
        $response = new Response(true, "Almuerzos obtenidos", $arr);
        return $response->getResponse();
    }

    static function changeStatus($data) {
        $idlunch = $data->idlunch;
        $status = $data->status;

        Connection::getInstance()->update("UPDATE lunch SET status = '$status' WHERE idlunch = '$idlunch'");

        $response = new Response(true, "Cambio exitoso");
        return $response->getResponse();
    }

    static function getNextLunch() {

        $result = Connection::getInstance()->select("SELECT idlunch, date, status, type FROM lunch WHERE date >= curdate() AND status in (1,2) AND type in (1,2) ORDER BY date LIMIT 1");

        if ($result['result'] == true) {
            if ($result['resultCount'] > 0) {

                $resultData = $result['resultData'][0];
                $idlunch = $resultData[0];
                $date = $resultData[1];
                $status = $resultData[2];
                $type = $resultData[3];
                
                $select = array('idmenu', 'description', 'menutype');
                $from = 'menu';
                if($type == 1)
                    $where = "idlunch in (0,$idlunch)";
                else 
                    $where = "idlunch = $idlunch";

                $menus = Connection::getInstance()->selectPlus($select, $from, $where);
                $arr = array();
                $arr['idLunch'] = $idlunch;
                $arr['date'] = $date;
                $arr['menus'] = $menus;
                $arr['status'] = $status;
                $arr['type'] = $type;
                
                $response = new Response(true, "Hay menú cargado", $arr);
            } else {
                $arr = array();
                $arr['status'] = 0;
                $response = new Response(true, "No hay menú cargado", $arr);
            }
        } else {
            $response = new Response(false, "Hubo un problema con el servidor. Intente nuevamente más tarde");
        }
        return $response->getResponse();
    }

    static function getMenu($data) {
        $idlunch = $data->idlunch;
        $userid = $data->userid;

        $select = array('idusermenu', 'm.description');
        $from = 'user_menu um, menu m';
        $where = "um.idmenu = m.idmenu and um.iduser = '$userid'  and um.idlunch = '$idlunch'";
        $fields = array('idUserMenu', 'description');

        $arr = Connection::getInstance()->selectPlus($select, $from, $where, $fields);
        if ($arr != null)
            $response = new Response(true, "Almuerzo obtenido", $arr);
        else
            $response = new Response(false, "No hay almuerzo");

        return $response->getResponse();
    }

    static function loadMenu($data) {

        $userid = $data->userid;
        $idmenu = $data->idmenu;
        $description = $data->description;
        $idLunch = $data->idlunch;

        $description = addslashes($description);
        Connection::getInstance()->update("DELETE FROM user_menu WHERE iduser='$userid' AND idlunch = '$idLunch'");
        Connection::getInstance()->insert("INSERT INTO user_menu (iduser, idmenu, description, idlunch) VALUES ($userid,$idmenu, \"" . $description . "\", $idLunch)");

        $response = new Response(true, "Menú cargado correctamente. Gracias!");
        return $response->getResponse();
    }

    static function getMenusByLunch($data) {
        $idlunch = $data->idlunch;

        $select = array('u.iduser', 'u.name', 'p.idmenu', 'p.description', 'extra');
        $from = "user u LEFT JOIN (select us.idusermenu, us.iduser, me.idmenu, "
                . "me.description, us.description extra from user_menu us, menu me where us.idlunch = $idlunch "
                . "and us.idmenu = me.idmenu) p ON u.iduser = p.iduser";

        $fields = array('idUser', 'name', 'idMenu', 'description', 'extra');

        $arr = Connection::getInstance()->selectPlus($select, $from, null, $fields);
        if ($arr != null)
            $response = new Response(true, "Almuerzos obtenidos", $arr);
        else
            $response = new Response(false, "No hay almuerzos");

        return $response->getResponse();
    }

}
