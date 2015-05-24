angular.module('Login', ['ui.bootstrap.modal']).controller('Login', function ($scope, $http, $location,$cookies) {

	$scope.sData = {}

	$scope.login = function (){

		var data = $scope.sData;
		
		var json = {
			operation: "login",
			data: {
				email: data.email,
				password: data.password
			}
		}

		notification.info("Ingresando...")

		$http.post(__URL__, json)
            .success(function (response) {
            	console.log(response);
                if (response.success) {
                	$scope.sData = {}
                	$cookies.userId = response.optional.userId;
                	$cookies.sessionId = response.optional.sessionId;
                	alert.hide();
                	$location.path('/main');
                } else {
                    errorManager.proccessError(response, $location, $cookies);
                }
            }).error(server_error);
	}

});