'use strict';

// CONST
var __URL__ = 'services/index.php';

var PAYING = 1; // Para pagar
var I_PAID = 2; // Pagué
var T_PAID_ME = 3; // Me pagaron pero no pagué
var T_N_PAID_ME = 4; // no me pagaron
var I_PAID_T_N_PAID_ME = 5; // Pagué pero no me pagaron


angular.module('inApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngCookies',
    'Main',
    'MenuController',
    'Register',
    'Login'
]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/register',{
                    templateUrl: 'views/register.html',
                    controller: 'Register'
                })
                .when('/main', {
                    templateUrl: 'views/main.html',
                    controller: 'main'
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'Login'
                })
                .when('/error', {
                    templateUrl: 'views/error.html'
                })
                .when('/config', {
                    templateUrl: 'views/config.html'
                })
                .when('/help', {
                    templateUrl: 'views/help.html'
                })
                .when('/pres', {
                    templateUrl: 'views/pres.html'
                })
                .otherwise({
                    redirectTo: '/login'
                });
    }]);