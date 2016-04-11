'use strict';

// CONST
var __URL__ = '../v2/php/index.php';

var PAYING = 1; // Para pagar
var I_PAID = 2; // Pagado
var T_PAID_ME = 3; // Me pagaron
var T_N_PAID_ME = 4; // No me pagaron
var I_PAID_T_N_PAID_ME = 5; // Me deben


var inApp = angular.module('inApp', [
    'ngRoute',
    'ngCookies'
]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/login',{
                    templateUrl: 'views/login.html'
                })
                .otherwise({
                    redirectTo: '/login'
                });
}])

function gUrl(operation){
    return __URL__ + "?op="+ operation
}