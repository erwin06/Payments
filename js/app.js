'use strict';

// CONST
var __URL__ = 'services/index.php';

var PAYING = 1; // Para pagar
var I_PAID = 2; // Pagué
var T_PAID_ME = 3; // Me pagaron pero no pagué
var T_N_PAID_ME = 4; // no me pagaron
var I_PAID_T_N_PAID_ME = 5; // Pagué pero no me pagaron

var MONTH = ["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octumbre","Noviembre","Diciembre"];


angular.module('inApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngCookies',
    'Main'
]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/main', {
                    templateUrl: 'views/main.html',
                    controller: 'main'
                })
                .otherwise({
                    redirectTo: '/main'
                });
    }]);