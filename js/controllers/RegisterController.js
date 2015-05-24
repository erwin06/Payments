angular.module('Register', ['ui.bootstrap.modal']).controller('Register', function ($scope, $http, $location,$cookies, $rootScope) {

	$scope.sData = {}

	$scope.register = function(){
		var data = $scope.sData;
		if(data.password != data.repeatPassword){
			alert.error("Las contraseñas no coinciden");
			return;
		}


		var json = {
			operation: "register",
			data: {
				email: data.email,
				password: data.password,
				repeatPassword: data.repeatPassword
			}
		}

		notification.info("Registrando...")

		$http.post(__URL__, json)
            .success(function (response) {
                if (response.success) {
                	$scope.sData = {}
                	alert.info(response.message, function(){
                		$location.path('/login');
                		$rootScope.$apply();
                	});
                } else {
                    errorManager.proccessError(response, $location, $cookies);
                }
            }).error(server_error);
	}

	$scope.back = function(){
		$location.path('/login');
	}

});