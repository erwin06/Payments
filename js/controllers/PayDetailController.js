inApp.controller('PayDetail', function ($scope, $http, $location,$routeParams, $cookies, $rootScope) {

    $scope.getStatusClass = function (status) {
        switch (status) {
            case PAYING:
                return "btn-success";
            case I_PAID:
                return "btn-info";
            case T_PAID_ME:
                return "btn-danger";
            case T_N_PAID_ME:
                return "btn-default";
            case I_PAID_T_N_PAID_ME:
                return "btn-warning";
        }
        return "";
    };

    $scope.changeStatus = function(payment){
        payment.changing = true;

        var json = {
            operation: "updatePay",
            userData: {
                idSession: $cookies.idSession,
                idUser: $cookies.idUser
            },
            data: {
                idPayment: payment.idPayment,
                status: payment.status == 5 ? 1 : payment.status + 1
            }
        }

        $http.post(__URL__, json)
            .success(function (response) {
                if (response.success) {
                    payment.status = json.data.status
                    payment.changing = false;
                }
            }).error(server_error);
    }

    $scope.getStatusWording = function(status){

        switch (status) {
            case PAYING:
                return "Pagar";
            case I_PAID:
                return "Pagado";
            case T_PAID_ME:
                return "No pagué, me pagaron";
            case T_N_PAID_ME:
                return "No me pagaron";
            case I_PAID_T_N_PAID_ME:
                return "Pagué, pero me deben";
        }
        return "Wtf?";
    }

    $scope.deleteProduct = function(idProduct){
        confirm.info("¿Estás seguro que quieres eliminar?",function(button){
            if(button == "Aceptar"){
                var json = {
                    operation: "deleteProduct",
                    userData: {
                        idSession: $cookies.idSession,
                        idUser: $cookies.idUser
                    },
                    data: {
                        idProduct: idProduct,
                        idUser: $cookies.idUser
                    }
                }

                $http.post(__URL__, json)
                    .success(function (response) {
                        if (response.success) {
                            alert.info(response.message, function(){
                                $location.path('/main');
                                $rootScope.$apply();
                            });
                        } else {
                            alert.error(response.message)
                        }
                    }).error(server_error);
            }
        });
    }

    $scope.keyPress = function(payment){
        payment.amountChanging = true

        var json = {
            operation: "updatePayAmount",
            userData: {
                idSession: $cookies.idSession,
                idUser: $cookies.idUser
            },
            data: {
                idPayment: payment.idPayment,
                amount: payment.amount
            }
        }

        $http.post(__URL__, json)
            .success(function (response) {
                payment.amountChanging = false
                if (!response.success) {
                    errorManager.proccessError(response, $location, $cookies);
                }
            }).error(server_error);
    }

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