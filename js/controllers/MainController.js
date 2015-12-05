inApp.controller('main', function ($scope, $cookies, $location, $http) {

    var toPay = [PAYING,T_N_PAID_ME, T_PAID_ME];
    var payed = [I_PAID,I_PAID_T_N_PAID_ME];

    $scope.currentMonth = new Date().getMonth();
    $scope.currentYear = new Date().getFullYear();
    $scope.store = {};
    $scope.pay = {};
    $scope.payOrder = "";
    $scope.saveButton = false;
    $scope.loadingPays = true;
    $scope.data = {
        salary: 10000,
        totalToPay: 0,
        totalOthers: 0,
        totalMe: 0
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
    
    $scope.goTo = function(a){
        $location.path(a)
    }

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
                log.info(response)
                if (response.success) {
                    $scope.store.companies = response.optional.companies;
                    $scope.store.owners = response.optional.owners;
                    $scope.loadingPays = false;
                    $scope.store.payments = response.optional.payments;
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
        log.info(response)
        return response
    }

    loadPays();

    $scope.getTotalByCompany = function(pay){
        var result = 0
        for(var i = 0; i < pay.length; i++){
            result += pay[i].amount
        }
        return result.toFixed(2)
    }

    function totals(){
        calculateTotal()
        calculateTotalOthers()
        calculateTotalMe()
    }

});