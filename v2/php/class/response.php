<?php

class Response {
    
    private $arr;

    public function __construct($status, $message = "Ups! Se produjo un error inesperado", $optional = null) {
        global $arr;
        $arr =  array();
        $arr['succ'] = $status;
        $arr['message'] = $message;
        $arr['data'] = $optional;
    }
    
    public function getResponse(){
        global $arr;
        return $arr;
    }

    public function getOptional(){
        global $arr;
        return $arr["optional"];
    }
}
