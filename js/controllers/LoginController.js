inApp.controller('Login', function ($scope, $location, $cookies, LoginService, $rootScope) {

	$scope.sData = {
		password: "",
		email: ""
	};

	$scope.login = function (){

		notification.info("Ingresando...")

		LoginService.logIn(function(response){
			if (response.succ) {
				alert.hide();
                $location.path('/main');
			} else {
				alert.error(response.message);
			}
		},$scope.sData.email, $scope.sData.password)
	}

});