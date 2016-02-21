inApp.controller('PayRecurrent', function ($scope, $modalInstance, idRecurrent, month, year, RecurrentService) {
	
	$scope.recurrent = {}

	RecurrentService.getRecurrentById(function(result){
		$scope.recurrent = result.recurrent
	}, idRecurrent)

	$scope.add = function () {

		if(!$scope.recurrent.amount || $scope.recurrent.amount == 0){
			alert.error("Debe ingresar un valor")
		}

		notification.info("Agregando...")

		RecurrentService.generatePayment(function(aver){
			console.log(aver)
			alert.hide()
		}, idRecurrent, $scope.recurrent.amount, month, year);
	};

	$scope.cancel = function () {
	    $modalInstance.dismiss();
	};

});