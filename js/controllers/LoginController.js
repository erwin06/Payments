inApp.controller('Login', function ($scope, $http, $location,$cookies) {

	$scope.sData = {};

	$scope.login = function (){
		
		var json = {
			operation: "login",
			data: {
				email: $scope.sData.email,
				password: $scope.sData.password
			}
		}

		notification.info("Ingresando...")

		$http.post(__URL__, json)
            .success(function (response) {
                if (response.success) {
                	$scope.sData = {}
                	$cookies.idUser = response.optional.idUser;
                	$cookies.idSession = response.optional.idSession;
                	alert.hide();
                	$location.path('/main');
                } else {
                    errorManager.proccessError(response, $location, $cookies);
                }
            }).error(server_error);
	}

});