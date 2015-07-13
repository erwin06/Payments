inApp.controller('newPay', function ($scope, $location, $rootScope, $modal) {
	
	$scope.months = _MONTHS;
	$scope.years = [2014,2015,2016,2017,2018,2019,2020];
	$scope.data = {};

	var yes_another = "Agregar otro.";
	var no_thanks = "No, gracias.";

	$scope.owners = [{id:0, name: "Yo mismo"},{id:1, name: "Another one"}];

	$scope.savePay = function(){

		notification.info("Guardando...");

		confirm.info("Pago guardado... Desea agregar otro más?",function(result){
			
			if(result == yes_another){
				$scope.data = {};
				$scope.$apply();
			} else {
				$location.path("/main");
				$rootScope.$apply();
			}

		},[yes_another, no_thanks])
	}

	$scope.addCompany = function(){

		var modalInstance = $modal.open({
	      	templateUrl: 'views/mini-templates/add-company.html',
	      	controller: 'addCompany'
	    });

		modalInstance.result.then(function (selectedItem) {
			loadCompanies();
	    });

	}

	$scope.addOwner = function(){

		var modalInstance = $modal.open({
	      	templateUrl: 'views/mini-templates/add-owner.html',
	      	controller: 'addOwner'
	    });

		modalInstance.result.then(function (selectedItem) {
			loadCompanies();
	    });

	}

	function loadCompanies(){

	}

});