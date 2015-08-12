inApp.controller('main', function ($scope, $cookies, $location, $http) {

    var toPay = [PAYING,T_N_PAID_ME];
    var payed = [I_PAID,I_PAID_T_N_PAID_ME];

    $scope.currentMonth = new Date().getMonth();
    $scope.currentYear = new Date().getFullYear();
    $scope.store = {};
    $scope.pay = {};
    $scope.payOrder = "";
    $scope.saveButton = false;
    $scope.loadingPays = true;
    $scope.personalData = {
        salary: 10000
    }

    $scope.getCompanyName = function(id){
        var count = $scope.store.companies.length;
        for(var i = 0; i < count; i++){
            if($scope.store.companies[i].idCompany == id)
                return $scope.store.companies[i].name
        }

        return "Desconocido";
    }

    $scope.getOwnerName = function(id){
        if(id == 0) return "Yo mismo";
        var count = $scope.store.owners.length;
        for(var i = 0; i < count; i++){
            if($scope.store.owners[i].idOwner == id)
                return $scope.store.owners[i].name
        }

        return "Desconocido";
    }


    $scope.getStatusClass = function (status) {
        switch (status) {
            case PAYING:
                return "co-green";
            case I_PAID:
                return "co-dark-blue";
            case T_PAID_ME:
                return "co-red";
            case T_N_PAID_ME:
                return "co-violette";
            case I_PAID_T_N_PAID_ME:
                return "co-orange";
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

    $scope.totalToPay = function (){
        var total = 0;

        if(!$scope.store.payments)
            return total;

        var count = $scope.store.payments.length;
        for(var i = 0; i < count; i++){
            if(toPay.indexOf($scope.store.payments[i].status) != -1){
                total += $scope.store.payments[i].amount;
            }
        }
        return total.toFixed(2);
    }

    $scope.totalToPayFromOthers = function() {
        var total = 0;

        if(!$scope.store.payments)
            return total;

        var count = $scope.store.payments.length;
        for(var i = 0; i < count; i++){
            var pay = $scope.store.payments[i];
            if(pay.status == T_N_PAID_ME){
                total += $scope.store.payments[i].amount;
            }
        }
        return total.toFixed(2);
    }

    $scope.totalToPayFromMe = function(){
        var total = 0;
        if(!$scope.store.payments)
            return total;

        var count = $scope.store.payments.length;
        for(var i = 0; i < count; i++){
            var pay = $scope.store.payments[i];
            if(pay.status == PAYING){
                total += $scope.store.payments[i].amount;
            }
        }
        return total.toFixed(2);
    }

    $scope.isSelected = function(status){
        if(status)
            return "tr-selected";
        return "";
    }

    // -------------------------------------------------------------------------
    // -------- Funciones reales -----------------------------------------------
    // -------------------------------------------------------------------------
    
    $scope.goTo = function(a){
        $location.path(a)
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

    $scope.getMonthName = function(month){
        return _MONTHS[month].text;
    }

    $scope.previusMonth = function(){
        $scope.currentMonth--;
        if($scope.currentMonth == -1){
            $scope.currentMonth = 11;
            $scope.currentYear--;
        }
        loadPays();
    }

    $scope.nextMonth = function(){
        $scope.currentMonth++;
        // Los meses van de 0 a 11
        if($scope.currentMonth == 12){
            $scope.currentMonth = 0;
            $scope.currentYear++;
        }
        loadPays();
    }

    $scope.payDetail = function(idProduct){
        $location.path("/pay-detail/" + idProduct)
    }

    function loadPays(){
        
        var json = {
            operation: "getPays",
            userData: {
                idSession: $cookies.idSession,
                idUser: $cookies.idUser
            },
            data: {
                month:$scope.currentMonth + 1,
                year:$scope.currentYear
            }
        }

        $scope.store.payments = [];
        $scope.loadingPays = true;

        $http.post(__URL__, json)
            .success(function (response) {
                if (response.success) {
                    $scope.store.companies = response.optional.companies;
                    $scope.store.owners = response.optional.owners;
                    $scope.loadingPays = false;
                    $scope.store.payments =  response.optional.payments;
                }
            }).error(server_error);


    }

    loadPays();

});