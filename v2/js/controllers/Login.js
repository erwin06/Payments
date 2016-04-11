inApp.controller('Login', function ($scope, LoginService, $location) {

	$scope.data = {
		user: {},
		password: {}
	};
	
	$scope.login = function (){

		if(!$scope.data.user.value){
			$scope.data.user.isEmpty = true
			return
		}
		$scope.data.user.isEmpty = false

		if(!$scope.data.password.value){
			$scope.data.password.isEmpty = true
			return
		}
		$scope.data.password.isEmpty = false

		Dialog.block.info("Ingresando...")

		LoginService.logIn($scope.data.user.value, $scope.data.password.value, {
			success: function(){
				Dialog.hide();
				$location.path('/main');
			},
			fail: function(message){
				Dialog.alert.error(message);
			}
		})

		// LoginService.logIn($scope.data.user, $scope.data.password);
		// 	if (response.succ) {
		// 		alert.hide();
  //               $location.path('/main');
		// 	} else {
		// 		alert.error(response.message);
		// 	}
		// },$scope.sData.email, $scope.sData.password)
	}

	$scope.getClass = function (input){
		if(input.isEmpty){
			return "has-warning"
		}

	}

});