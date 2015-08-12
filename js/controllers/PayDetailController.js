inApp.controller('PayDetail', function ($scope, $http, $location,$routeParams, $cookies) {

	console.log($routeParams);

	$scope.loading = true;

	var json = {
        operation: "getPayDetail",
        userData: {
            idSession: $cookies.idSession,
            idUser: $cookies.idUser
        },
        data: {
        	idProduct: $routeParams.id
        }
    }

	$http.post(__URL__, json)
        .success(function (response) {
        	console.log(response)
            if (response.success) {
                $scope.loading = false;
            	$scope.sData = response.optional;
            } else {
                errorManager.proccessError(response, $location, $cookies);
            }
        }).error(server_error);

});