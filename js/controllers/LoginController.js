inApp.controller('Login', function ($scope, $http, $location,$cookies) {

	$scope.sData = {}

	$scope.login = function (){

		// $location.path('/main');

		var data = $scope.sData;
		
		var json = {
			operation: "login",
			data: {
				email: data.email,
				password: data.password
			}
		}

		console.log("Login")
		console.log(json)

		notification.info("Ingresando...")

		$http.post(__URL__, json)
            .success(function (response) {
            	console.log(response);
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