inApp.controller('addOwner', function ($scope, $modalInstance, $cookies, $http) {
	
	$scope.data = {}

	$scope.add = function () {

		var json = {
			operation: "addOwner",
			userData: {
				idSession: $cookies.idSession,
				idUser: $cookies.idUser
			},
			data: {
				name: $scope.data.name
			}
		}

		notification.info("Agregando...")

		$http.post(__URL__, json)
            .success(function (response) {
                if (response.success) {
                	alert.info(response.message);
                	$modalInstance.close();
                } else {
                	alert.error(response.message);
                }
            }).error(server_error);
	};

	$scope.cancel = function () {
	    $modalInstance.dismiss();
	};

});