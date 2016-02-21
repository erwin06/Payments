inApp.controller('Menu', function ($scope, LoginService, $location) {

	$scope.logOut = function(){
		LoginService.logOut()
	}

	$scope.goTo = function(page) {
		console.log(page);
		$location.path(page);
	}

	$scope.getClass = function(page) {
		if($location.path().indexOf(page) != -1)
			return "py-nav-button-active"	
	}

});