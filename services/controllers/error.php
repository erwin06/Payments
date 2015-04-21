<?php

class Error {

    static function noLogged() {
        $arr = array();
        $arr["errorid"] = 2;
        $messageReturn = new Response(false, "La session a caducado", $arr);
        return $messageReturn->getResponse();
    }

    static function noPermission() {
        $arr = array();
        $arr["errorid"] = 1;
        $messageReturn = new Response(false, "Disculpe. No tiene permiso para esa operación", $arr);
        return $messageReturn->getResponse();
    }

}
