inApp.controller('addOwner', function ($scope, $modalInstance, OwnerService) {
	
	$scope.data = {}

	$scope.add = function () {

		notification.info("Agregando...")

		OwnerService.addOwner(function(response){
			if(response.succ){
				alert.hide();
				$modalInstance.close();
			} else {
				alert.error(response.message)
			}
		}, $scope.data.name)
	};

	$scope.cancel = function () {
	    $modalInstance.dismiss();
	};

});