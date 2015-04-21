<?php

class Response {
    
    private $arr;


    public function __construct($status, $message, $optional = null) {
        global $arr;
        $arr =  array();
        $arr['success'] = $status;
        $arr['message'] = $message;
        $arr['optional'] = $optional;
    }
    
    public function getResponse(){
        global $arr;
        return $arr;
    }
    
}
