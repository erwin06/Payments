inApp.controller('main', function ($scope, $cookies, $location, $http, $routeParams, $modal) {



    var toPay = [PAYING,T_N_PAID_ME, T_PAID_ME];
    var payed = [I_PAID,I_PAID_T_N_PAID_ME];

    $scope.currentMonth = $routeParams.day?$routeParams.day:new Date().getMonth();
    $scope.currentYear = $routeParams.year?$routeParams.year:new Date().getFullYear();
    $scope.store = {};
    $scope.pay = {};
    $scope.payOrder = "";
    $scope.saveButton = false;
    $scope.loadingPays = true;
    $scope.data = {
        salary: 10000,
        totalToPay: 0,
        totalOthers: 0,
        totalMe: 0,
        filterStatus: 1
    }

    function getCompanyName (id){
        var count = $scope.store.companies.length;
        for(var i = 0; i < count; i++){
            if($scope.store.companies[i].idCompany == id)
                return $scope.store.companies[i].name
        }

        return "Desconocido";
    }

    function getOwnerName (id){
        if(id == 0) return "Yo mismo";
        var count = $scope.store.owners.length;
        for(var i = 0; i < count; i++){
            if($scope.store.owners[i].idOwner == id)
                return $scope.store.owners[i].name
        }

        return "Desconocido";
    }

    $scope.changeStatus = function(payment, status){
        payment.changing = true;

        var json = {
            operation: "updatePay",
            userData: {
                idSession: $cookies.idSession,
                idUser: $cookies.idUser
            },
            data: {
                idPayment: payment.idPayment,
                status: status
            }
        }

        $http.post(__URL__, json)
            .success(function (response) {
                console.log(response)
                if (response.success) {
                    payment.status = json.data.status
                    payment.changing = false;
                    totals()
                }
            }).error(server_error);
    }

    function calculateTotalOthers (){
        $scope.data.totalOthers = 0;

        if(!$scope.store.pays)
            return;

        $scope.store.pays.forEach(function(payValue, index){
            payValue.pays.forEach(function(payCurrent){
                if(payCurrent.status == T_N_PAID_ME){
                    $scope.data.totalOthers += payCurrent.amount
                }
            });
        });

        $scope.data.totalOthers =  $scope.data.totalOthers.toFixed(2)
    }

    function calculateTotalMe (){
        $scope.data.totalMe = 0;

        if(!$scope.store.pays)
            return 0;

        $scope.store.pays.forEach(function(payValue, index){
            payValue.pays.forEach(function(payCurrent){
                if(payCurrent.status in [PAYING,T_PAID_ME]){
                    $scope.data.totalMe += payCurrent.amount
                }
            });
        });

        $scope.data.totalMe =  $scope.data.totalMe.toFixed(2)
    }

    function calculateTotal() {
        $scope.data.totalToPay = 0;

        if(!$scope.store.pays)
            return

        $scope.store.pays.forEach(function(payValue, index){
            payValue.pays.forEach(function(payCurrent){
                if(toPay.indexOf(payCurrent.status) != -1){
                    $scope.data.totalToPay += payCurrent.amount
                }
            });
        });

        $scope.data.totalToPay =  $scope.data.totalToPay.toFixed(2)
    }

    $scope.isSelected = function(status){
        if(status)
            return "tr-selected";
        return "";
    }

    // -------------------------------------------------------------------------
    // -------- Funciones reales -----------------------------------------------
    // -------------------------------------------------------------------------
    
    // $scope.goTo = function(a){
    //     $location.path(a)
    // }

    $scope.goToPay = function(payId){
        $location.path('/pay-detail/' + payId)
    }

    $scope.getStatusWording = function(status){

        switch (status) {
            case PAYING:
                return "Para pagar";
            case I_PAID:
                return "Pagado";
            case T_PAID_ME:
                return "Me pagaron";
            case T_N_PAID_ME:
                return "No me pagaron";
            case I_PAID_T_N_PAID_ME:
                return "Me deben";
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
        $location.path("/main/" + $scope.currentYear + "/" + $scope.currentMonth)
    }

    $scope.nextMonth = function(){
        $scope.currentMonth++;
        // Los meses van de 0 a 11
        if($scope.currentMonth == 12){
            $scope.currentMonth = 0;
            $scope.currentYear++;
        }
        $location.path("/main/" + $scope.currentYear + "/" + $scope.currentMonth)
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
                month:parseInt($scope.currentMonth) + 1,
                year:parseInt($scope.currentYear)
            }
        }

        $scope.store.payments = [];
        $scope.loadingPays = true;

        $http.post(__URL__, json)
            .success(function (response) {
                log.info(response)
                if (response.success) {
                    $scope.store.companies = response.optional.companies;
                    $scope.store.owners = response.optional.owners;
                    $scope.loadingPays = false;
                    $scope.store.pays = ordersPay(response.optional.payments);
                    totals();
                }
            }).error(server_error);
    }

    function ordersPay(payments){
        var response = [];
        var prevCompany;
        for(var i = 0; i < payments.length; i++){
            if(prevCompany != payments[i].idCompany){
                response.push({
                    idCompany: payments[i].idCompany,
                    companyName: getCompanyName(payments[i].idCompany),
                    pays:[]
                })

                prevCompany = payments[i].idCompany
            }

            response[response.length - 1].pays.push({
                amount: payments[i].amount,
                description: payments[i].description,
                idOwner: payments[i].idOwner,
                ownerName: getOwnerName(payments[i].idOwner),
                idProduct: payments[i].idProduct,
                idPayment: payments[i].idPayment,
                paymentNumber: payments[i].paymentNumber,
                status: payments[i].status,
                totalPays: payments[i].totalPays
            })
        }
        return response
    }

    function loadRecurrentPayments() {

        var json = {
            operation: "getRecurrentPayments",
            userData: {
                idSession: $cookies.idSession,
                idUser: $cookies.idUser
            },
            data: {
                month:parseInt($scope.currentMonth) + 1,
                year:parseInt($scope.currentYear)
            }
        }

        $http.post(__URL__, json)
            .success(function (response) {
                $scope.store.recurrents = response.optional;
                console.log("here")
                console.log(response)
            }).error(function(response){

            });
    }

    loadPays();
    loadRecurrentPayments();

    $scope.getTotalByCompany = function(pay){
        var result = 0
        for(var i = 0; i < pay.length; i++){
            result += contains(toPay, pay[i].status)?pay[i].amount:0
        }
        return result.toFixed(2)
    }

    function totals(){
        calculateTotal()
        calculateTotalOthers()
        calculateTotalMe()
    }

    $scope.getPriceClass = function(status){
        if(toPay.indexOf(status) != -1)
            return "co-red"
    }

    $scope.getFilterLabel = function(status){
        switch(status?status:$scope.data.filterStatus){
            case 1:
                return "Solo lo que tengo que pagar"
            case 2: 
                return "Todos los pagos"
        }
    }

    $scope.isPayed = function(status){
        return (status && contains(toPay, status)) ? true : false 
    }

    $scope.showPay = function(status){
        if(!status || $scope.data.filterStatus == 2)
            return true

        if(contains(toPay, status))
            return true
    }

    $scope.showButtonDoPay = function(status){
        return (status && contains(toPay, status)) ? false : true
    }

    $scope.filterList = function(){
        return function(pays) {
            if($scope.data.filterStatus == 2)
                return true
            if($scope.getTotalByCompany(pays.pays) == "0.00")
                return false
            return true
        }
    }

    $scope.payRecurrent = function(recurrent){
        
        console.log(recurrent);

        var modalInstance = $modal.open({
            templateUrl: 'views/mini-templates/pay-recurrent.html',
            controller: 'PayRecurrent',
            resolve: {
                idRecurrent: function () {
                    return recurrent.idRecurrent;
                },
                month: function(){
                    return ($scope.currentMonth + 1)
                },
                year: function(){
                    return $scope.currentYear
                }
              }
        });

        modalInstance.result.then(function(result) {
            console.log("resultado");
            console.log(result);
            console.log(recurrent);
            if(result.result){
                recurrent.status = I_PAID
            }
        });
    }


});