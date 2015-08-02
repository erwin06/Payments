inApp.controller('newPay', function($scope, $location, $rootScope, $modal, $http) {

	$scope.addOwner = function() {

        var modalInstance = $modal.open({
            templateUrl: 'views/mini-templates/change-status-pay.html',
            controller: 'addOwner'
        });

        modalInstance.result.then(function(selectedItem) {
            loadOwners();
        });

    }

});