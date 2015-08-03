inApp.controller('Menu', function ($scope, $cookieStore, $location) {

	$scope.logOut = function(){
		$cookieStore.remove('idUser');
        $cookieStore.remove('idSession');
        $location.path('/login');
	}

});