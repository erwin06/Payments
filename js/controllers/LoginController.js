inApp.controller('Login', function ($scope, $location, $cookies, LoginService, $rootScope) {

	$scope.sData = {
		password: "him15425",
		email: "erwin.bader06@gmail.com"
	};

	$scope.login = function (){

		notification.info("Ingresando...")

		LoginService.logIn(function(response){
			if (response.succ) {
				alert.hide();
                $location.path('/main');
				$rootScope.$apply();
			} else {
				alert.error(response.message);
			}
		},$scope.sData.email, $scope.sData.password)
	}

});