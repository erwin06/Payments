inApp.controller('main', function ($scope, $cookies, $location, $http) {

    var toPay = [PAYING,T_PAID_ME];
    var payed = [I_PAID,I_PAID_T_N_PAID_ME];

    $scope.store = {};
    $scope.pay = {};
    $scope.payOrder = "productName";
    $scope.personalData = {
        salary: 10000
    }
    $scope.store.payments = [
        {
            idProduct:1,
            productName: "aTest",
            payNumber: 1,
            totalPays: 12,
            amount: 123.33,
            status: 1,
            idCompany: 1,
            companyName: "Garbarino",
            idOwner: 1,
            ownerName: "Yo"
        },{
            idProduct:2,
            productName: "bTest",
            payNumber: 1,
            totalPays: 12,
            amount: 123.33,
            status: 2,
            idCompany: 1,
            companyName: "Garbarino",
            idOwner: 1,
            ownerName: "Yo"
        },{
            idProduct:3,
            productName: "cTest",
            payNumber: 1,
            totalPays: 12,
            amount: 123.33,
            status: 3,
            idCompany: 2,
            companyName: "Frávega",
            idOwner: 1,
            ownerName: "Yo"
        },{
            idProduct:4,
            productName: "dTest",
            payNumber: 1,
            totalPays: 12,
            amount: 123.33,
            status: 5,
            idCompany: 3,
            companyName: "Frávega",
            idOwner: 1,
            ownerName: "Yo"
        },{
            idProduct:5,
            productName: "eTest",
            payNumber: 1,
            totalPays: 12,
            amount: 123.33,
            status: 4,
            idCompany: 3,
            companyName: "Amazon",
            idOwner: 2,
            ownerName: "Otra persona"
        }
    ];

    $scope.store.owners = [
        {idOwner: 1, name: "Yo"},
        {idOwner: 2, name: "Otra persona"}
    ]

    $scope.getCompanyName = function(id){
        var count = $scope.store.companies.length;
        for(var i = 0; i < count; i++){
            if($scope.store.companies[i].idCompany == id)
                return $scope.store.companies[i].name
        }

        return "Desconocido";
    }

    $scope.getOwnerName = function(id){
        var count = $scope.store.owners.length;
        for(var i = 0; i < count; i++){
            if($scope.store.owners[i].idOwner == id)
                return $scope.store.owners[i].name
        }

        return "Desconocido";
    }

    function setMonths(payment) {
        payment.months = [];

        while (payment.minMonth <= payment.maxMonth || payment.minYear < payment.maxYear) {
            payment.months.push({
                number: payment.minMonth,
                year: payment.minYear
            });

            payment.minMonth++;
            if (payment.minMonth == 13) {
                payment.minMonth = 1;
                payment.minYear++;
            }
        }
    }

    setMonths($scope.store.payments[0]);
    setMonths($scope.store.payments[1]);

    $scope.getStatusClass = function (status) {
        switch (status) {
            case PAYING:
                return "bg-green";
            case I_PAID:
                return "bg-dark-blue";
            case T_PAID_ME:
                return "bg-red";
            case T_N_PAID_ME:
                return "bg-violette";
            case I_PAID_T_N_PAID_ME:
                return "bg-orange";


        }
        return "";
    };

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
        return total;
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
        return total;
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
        return total;
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

});