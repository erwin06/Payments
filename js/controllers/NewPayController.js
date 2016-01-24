inApp.controller('newPay', function($scope, $location, $rootScope, $modal, $cookies, $http, PaymentService) {

    $scope.months = _MONTHS;
    $scope.years = [2014, 2015, 2016, 2017, 2018, 2019, 2020];
    $scope.data = {
        paymentType: "c"
    };
    $scope.companies = [];
    $scope.owners = [];

    var yes_another = "Agregar otro.";
    var no_thanks = "No, gracias.";

    $scope.savePay = function() {

        notification.info("Guardando...");

        if($scope.data.paymentType == "c")
            addPayment()
        else
            addRecurrentPayment()

    }

    function addRecurrentPayment(){
        PaymentService.addRecurrentPayment(function(result){

            if(result.succ){
                confirm.info("Pago guardado... Desea agregar otro más?", function(resultConfirm) {
                    alert.hide();
                    if (resultConfirm == yes_another) {
                        $scope.data = { paymentType: $scope.data.paymentType };
                        $scope.$apply();
                    } else {
                        $location.path("/main");
                        $rootScope.$apply();
                    }
                }, [yes_another, no_thanks])
            } else {
                alert.error(result.message)
            }

        }, $scope.data.name, $scope.data.amount)
    }

    function addPayment() {

        PaymentService.addPayment(function(result){

            if(result.succ){
                confirm.info("Pago guardado... Desea agregar otro más?", function(resultConfirm) {
                    alert.hide();
                    if (resultConfirm == yes_another) {
                        $scope.data = { paymentType: $scope.data.paymentType };
                        $scope.$apply();
                    } else {
                        $location.path("/main");
                        $rootScope.$apply();
                    }
                }, [yes_another, no_thanks])
            }

        },{ name: $scope.data.name,
            idCompany: $scope.data.company,
            amount: $scope.data.amount,
            totalPays: $scope.data.totalPays,
            month: $scope.data.month,
            year: $scope.data.year,
            idOwner: $scope.data.owner});

    }

    $scope.addCompany = function() {

        var modalInstance = $modal.open({
            templateUrl: 'views/mini-templates/add-company.html',
            controller: 'addCompany'
        });

        modalInstance.result.then(function(selectedItem) {
            loadCompanies(selectedItem);
        });

    }

    $scope.addOwner = function() {

        var modalInstance = $modal.open({
            templateUrl: 'views/mini-templates/add-owner.html',
            controller: 'addOwner'
        });

        modalInstance.result.then(function() {
            loadOwners();
        });

    }

    function loadCompanies(setCompany) {
        var json = {
            operation: "getCompanies",
            userData: {
                idSession: $cookies.idSession,
                idUser: $cookies.idUser
            }
        }

        $http.post(__URL__, json)
            .success(function(response) {
                if (response.success) {
                    $scope.companies = response.optional;
                }
            }).error(server_error);
    }

    function loadOwners() {
        var json = {
            operation: "getOwners",
            userData: {
                idSession: $cookies.idSession,
                idUser: $cookies.idUser
            }
        }

        $http.post(__URL__, json)
            .success(function(response) {
                if (response.success) {
                    $scope.owners = response.optional;
                }
            }).error(server_error);
    }

    loadCompanies();
    loadOwners();
});