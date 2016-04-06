'use strict';

// CONST
var __URL__ = 'services/index.php';

var PAYING = 1; // Para pagar
var I_PAID = 2; // Pagado
var T_PAID_ME = 3; // Me pagaron
var T_N_PAID_ME = 4; // No me pagaron
var I_PAID_T_N_PAID_ME = 5; // Me deben


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
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location, "register")}}
                })
                .when('/main', {
                    templateUrl: 'views/main.html',
                    controller: 'main',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/main/:year/:day', {
                    templateUrl: 'views/main.html',
                    controller: 'main',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location, "login")}}
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
                .when('/see-all-products', {
                    templateUrl: 'views/all-products.html',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/see-all-companies', {
                    templateUrl: 'views/all-companies.html',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/pay-detail/:id', {
                    templateUrl: 'views/pay-detail.html',
                    controller: 'PayDetail',
                    resolve: {"check":function($cookies, $http, $location){isLogged($cookies, $http, $location)}}
                })
                .when('/log-out',{
                    resolve: {"logOut":function(LoginService){
                        LoginService.logOut();
                    }}
                })
                .otherwise({
                    redirectTo: '/login'
                });
    }]).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

function isLogged($cookies, $http, $location, goTo){
    if($cookies.idSession){
        $http.post(__URL__,{operation:"checkSession",userData:{idSession:$cookies.idSession,idUser:$cookies.idUser}})
        .success(function(a){
            if(!a){
                if(goTo == "register") return;
                $location.path("/login")
            } else {
                if(goTo == "login"){
                    $location.path("/main")
                }
            }
        })
        .error(function(){$location.path("/login")})
    } else {
        if(goTo == "register") return;
        $location.path("/login");
    }
}