inApp.controller('addCompany', function ($scope, $modalInstance, CompanyService) {
	
	$scope.data = {};

	$scope.add = function () {

		notification.info("Agregando...")
		
		CompanyService.addCompany(function(response){
			if(response.succ){
				$modalInstance.close($scope.data.name);
				alert.hide();
			} else {
				alert.error(response.message)
			}
		}, $scope.data.name);
	};

	$scope.cancel = function () {
	    $modalInstance.dismiss();
	};

});