<?php

include("misc/logg.php");
include("misc/response.php");


include("controllers/connection.php");
include("controllers/user.php");
include("controllers/error.php");
include("controllers/menu.php");


// Obtengo los datos
$input = json_decode(file_get_contents("php://input"));
$operation = $input->operation ? $input->operation : "__";
$data = $input->data ? $input->data : null;

$messageReturn = null;


switch ($operation) {
    case 'login':
        $messageReturn = User::login($data);
        break;
    case 'addmenu':
        if (User::checkSession($input->userData)) {
            if (User::checkAdmin($input->userData)) {
                $messageReturn = Menu::add($data);
            } else {
                $messageReturn = Error::noPermission();
            }
        } else {
            $messageReturn = Error::noLogged();
        }
        break;
    case 'getLunchs':
        if (User::checkSession($input->userData)) {
            if (User::checkAdmin($input->userData)) {
                $messageReturn = Menu::getLunchs();
            } else {
                $messageReturn = Error::noPermission();
            }
        } else {
            $messageReturn = Error::noLogged();
        }
        break;
    case 'changeStatus':
        if (User::checkSession($input->userData)) {
            if (User::checkAdmin($input->userData)) {
                $messageReturn = Menu::changeStatus($data);
            } else {
                $messageReturn = Error::noPermission();
            }
        } else {
            $messageReturn = Error::noLogged();
        }
        break;
    case 'getNextLuch':
        if (User::checkSession($input->userData)) {
            $messageReturn = Menu::getNextLunch();
        } else {
            $messageReturn = Error::noLogged();
        }
        break;
    case 'loadMenu':
        if (User::checkSession($input->userData)) {
            $messageReturn = Menu::loadMenu($data);
        } else {
            $messageReturn = Error::noLogged();
        }
        break;
    case 'getMenu':
        if (User::checkSession($input->userData)) {
            $messageReturn = Menu::getMenu($data);
        } else {
            $messageReturn = Error::noLogged();
        }
        break;
    case 'getMenusByLunch':
        if (User::checkSession($input->userData)) {
            $messageReturn = Menu::getMenusByLunch($data);
        } else {
            $messageReturn = Error::noLogged();
        }
        break;
    case 'getUsers':
        if (User::checkSession($input->userData)) {
            if (User::checkAdmin($input->userData)) {
                $messageReturn = User::getUsers();
            } else {
                $messageReturn = Error::noPermission();
            }
        } else {
            $messageReturn = Error::noLogged();
        }
        break;
    case 'restorePass':
        if (User::checkSession($input->userData)) {
            if (User::checkAdmin($input->userData)) {
                $messageReturn = User::restorePass($data);
            } else {
                $messageReturn = Error::noPermission();
            }
        } else {
            $messageReturn = Error::noLogged();
        }
        break;
    case 'changePassword':
         if (User::checkSession($input->userData)) {
             $messageReturn = User::changePassword($data, $input->userData);
         } else {
             $messageReturn = Error::noLogged();
         }
}

if ($messageReturn == null) {
    $respo = new Response(false, "Operación no válida");
    $messageReturn = $respo->getResponse();
}

echo json_encode($messageReturn);
