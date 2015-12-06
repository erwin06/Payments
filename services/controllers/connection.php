<?php

class Connection {

    static private $instancia = null;
    private static $mysqli = null;

    private function __construct($servidor, $usuario, $password, $basedatos) {
        self::$mysqli = new mysqli($servidor, $usuario, $password, $basedatos);
        self::$mysqli->set_charset("utf8");
    }

    static public function getInstance() {
        if (self::$instancia == null) {
            self::$instancia = new Connection("localhost", "root", "GOfa20sawa", "m2000315_payment");
        }
        return self::$instancia;
    }

    static public function getDB(){
        return self::$mysqli;
    }

    public function insert($query, $params) {
        $result = self::$mysqli->query($query);

        // Prepara la consulta
        if ($stmt = $mysqli->prepare($query)) {

            $stmt->bind_param("s", $city);
            /* ejecutar la consulta */
            $stmt->execute();
        }


        $arr = array();
        $arr['result'] = $result;
        if ($result == true) {
            $arr['insert_id'] = self::$mysqli->insert_id;
        }
        return $arr;
    }

    public function update($query) {
        $result = self::$mysqli->query($query);
        $arr = array();
        var_dump(self::$mysqli->error);
        $arr['result'] = $result;
        $arr['affected_rows'] = self::$mysqli->affected_rows;
        return $arr;
    }

    public function select($query) {
        logg::loggInfo($query, "Select");
        $arr = array();
        $arr['result'] = false;
        if ($result = self::$mysqli->query($query)) {
            $arr['result'] = true;
            $arr['resultData'] = array();
            while ($fila = $result->fetch_row()) {

                array_push($arr['resultData'], $fila);
            }
            $arr['resultCount'] = count($arr['resultData']);
        }

        return $arr;
    }

    public function moreThanOne($query) {
        $result = Connection::getInstance()->select($query);
        if ($result['result'] == true) {
            $count = $result['resultCount'];
            // No encontró ningun usuario con esas caracteristicas
            if ($count > 0) {
                return true;
            }
        }
        return false;
    }

    public function selectPlus($select, $from, $where = null, $fields = null, $extra = null) {

        $selectString = implode(",", $select);
        $response = null;
        $selectC = count($select);
        $arr = array();
        if ($extra == null)
            $extra = '';
        if ($where != null) {
            $result = Connection::getInstance()->select("SELECT " . $selectString . " FROM " . $from . " WHERE " . $where . " " . $extra);
        } else {
            $result = Connection::getInstance()->select("SELECT " . $selectString . " FROM " . $from . " " . $extra);
        }

        if ($result['result'] == true) {
            $count = $result['resultCount'];
            if ($count > 0) {
                $resultData = $result['resultData'];
                if ($fields != null) {
                    for ($i = 0; $i < $count; $i++) {
                        for ($j = 0; $j < $selectC; $j++) {
                            $arr[$i][$fields[$j]] = $resultData[$i][$j];
                        }
                    }
                } else {
                    for ($i = 0; $i < $count; $i++) {
                        for ($j = 0; $j < $selectC; $j++) {
                            $arr[$i][$select[$j]] = $resultData[$i][$j];
                        }
                    }
                }
            }

            $response = $arr;
        }

        return $response;
    }

}
