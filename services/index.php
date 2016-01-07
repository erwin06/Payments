<?php

include("misc/logg.php");
include("misc/response.php");
include("controllers/error.php");
include("controllers/connection.php");

include("controllers/user.php");
include("controllers/company.php");
include("controllers/owner.php");
include("controllers/pay.php");
include("controllers/product.php");

// include("controllers/menu.php");


// Obtengo los datos
$input = json_decode(file_get_contents("php://input"));
$operation = $input->operation ? $input->operation : "__";
$data = isset($input->data) ? $input->data : null;

$messageReturn = null;


switch ($operation) {
    case 'checkSession':
        $messageReturn = User::checkSession($input->userData);
        break;
    // =========================================================================
    case 'register':
        $messageReturn = User::register($data);
        break;
    case 'login':
        $messageReturn = User::login($data);
        break;
    //  ========================================================================
    case 'addCompany':
        $messageReturn = Company::addCompany($data, $input->userData);      
        break;
    case 'getCompanies':
        $messageReturn = Company::getCompanies($input->userData);
        break;
    //  ========================================================================
    case 'addOwner':
        $messageReturn = Owner::addOwner($data, $input->userData);      
        break;
    case 'getOwners':
        $messageReturn = Owner::getOwners($input->userData);
        break;
    //  ========================================================================
    case 'addPay': 
        $messageReturn = Pay::addPay($data, $input->userData);
        break;
    case 'getPays':
        $messageReturn = Pay::getPays($data, $input->userData);
        break;
    case 'updatePay':
        $messageReturn = Pay::updatePay($data, $input->userData);
        break;
    case 'getPayDetail':
        $messageReturn = Pay::getPayDetail($data, $input->userData);
        break;
    case 'updatePayAmount':
        $messageReturn = Pay::updatePayAmount($data, $input->userData);
        break;
    //  ========================================================================
    case 'getAllProducts':
        $messageReturn = Product::getAllProducts($input->userData);
        break;
    case 'deleteProduct':
        $messageReturn = Product::deleteProduct($data, $input->userData);
        break;
}

if ($messageReturn == null) {
    $respo = new Response(false, "Operación no válida");
    $messageReturn = $respo->getResponse();
}

echo json_encode($messageReturn);
