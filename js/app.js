'use strict';

// CONST
var __URL__ = 'services/index.php';

var PAYING = 1; // Para pagar
var I_PAID = 2; // Pagué
var T_PAID_ME = 3; // Me pagaron pero no pagué
var T_N_PAID_ME = 4; // no me pagaron
var I_PAID_T_N_PAID_ME = 5; // Pagué pero no me pagaron


var inApp = angular.module('inApp', [
    'ngRoute',
    'ui.bootstrap',
    'ui.bootstrap.modal',
    'ngCookies'
]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/register',{
                    templateUrl: 'views/register.html',
                    controller: "Register",
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/main', {
                    templateUrl: 'views/main.html',
                    controller: 'main',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/config', {
                    templateUrl: 'views/config.html',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/help', {
                    templateUrl: 'views/help.html',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/new-pay', {
                    templateUrl: 'views/new-pay.html',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/pay-detail/:id', {
                    templateUrl: 'views/pay-detail.html',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .otherwise({
                    redirectTo: '/login'
                });
    }]);

function isLogged($cookies, $http, $location){
    if($cookies.idSession){
        $http.post(__URL__,{operation:"checkSession",userData:{idSession:$cookies.idSession,idUser:$cookies.idUser}})
        .success(function(a){
            if(!a)
                $location.path("/login")
        })
        .error(function(){$location.path("/login")})
    } else {
        $location.path("/login");
    }
}