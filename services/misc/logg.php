<?php

class logg {

    private function __construct() {
        
    }
    
    static function loggError($message, $location, $userID = '0') {
        Connection::getInstance()->insert("INSERT INTO log (level,message,location,userId, currentDate) VALUES ('3',\"".$message."\",'$location','$userID',now())");
    }

    static function loggInfo($message, $location, $userID = '0') {
        //Connection::getInstance()->insert("INSERT INTO log (level,message,location,userId, currentDate) VALUES ('1',\"".$message."\",'$location','$userID',now())");
    }

    static function loggWarning($message, $location, $userID = '0') {
        Connection::getInstance()->insert("INSERT INTO log (level,message,location,userId, currentDate) VALUES ('2',\"".$message."\",'$location','$userID',now())");
    }

}
