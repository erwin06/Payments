angular.module('MenuController', ['ui.bootstrap.modal']).controller('menuController', function ($scope, $cookies) {

	$scope.isLogged = function(){
		return false
	}

});