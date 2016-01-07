inApp.controller('Menu', function ($scope, LoginService) {

	$scope.logOut = function(){
		LoginService.logOut()
	}

});