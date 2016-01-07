inApp.controller('Login', function ($scope, $location, $cookies, LoginService, $rootScope) {

	$scope.sData = {};

	$scope.login = function (){

		notification.info("Ingresando...")

		LoginService.logIn(function(response){
			if (response.succ) {
				alert.hide();
                $location.path('/main');
				$rootScope.$apply();
			} else {
				alert.error(reponse.message);
			}
		},$scope.sData.email, $scope.sData.password)
	}

});