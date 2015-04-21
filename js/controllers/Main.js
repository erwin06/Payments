angular.module('Main', []).controller('main', function ($scope, $cookies, $location, $http) {

    $scope.store = {};

    $scope.store.payments = [
        {
            idCompany: 1,
            name: "Nevada",
            usePrice: 75.62,
            minMonth: 9,
            minYear: 2014,
            maxMonth: 8,
            maxYear: 2015,
            months: [],
            pays: [
                {
                    idProduct: 1,
                    name: "Horno",
                    payments: [
                        {idPayment: 1, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 9, year: 2014},
                        {idPayment: 2, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 10, year: 2014},
                        {idPayment: 3, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 11, year: 2014},
                        {idPayment: 4, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 12, year: 2014},
                        {idPayment: 5, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 1, year: 2015},
                        {idPayment: 6, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 2, year: 2015},
                        {idPayment: 7, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 3, year: 2015},
                        {idPayment: 8, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 4, year: 2015},
                        {idPayment: 9, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 5, year: 2015},
                        {idPayment: 10, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 6, year: 2015},
                        {idPayment: 11, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 7, year: 2015},
                        {idPayment: 12, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 8, year: 2015}
                    ]
                }, {
                    idProduct: 2,
                    name: "Celular",
                    payments: [
                        {idPayment: 13, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 11, year: 2014},
                        {idPayment: 14, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 12, year: 2014},
                        {idPayment: 15, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 1, year: 2015},
                        {idPayment: 16, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 2, year: 2015},
                        {idPayment: 17, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 3, year: 2015},
                        {idPayment: 18, price: 291.33, status: T_N_PAID_ME, owner: 1, nameOwner: "Natti", month: 4, year: 2015}
                    ]
                }, {
                    idProduct: 3,
                    name: "Celular",
                    payments: [
                        {idPayment: 19, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 12, year: 2015},
                        {idPayment: 20, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 1, year: 2015},
                        {idPayment: 21, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 2, year: 2015},
                        {idPayment: 22, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 3, year: 2015},
                        {idPayment: 23, price: 416.50, status: T_PAID_ME, owner: 1, nameOwner: "Natti", month: 4, year: 2015},
                        {idPayment: 24, price: 416.50, status: T_N_PAID_ME, owner: 1, nameOwner: "Natti", month: 5, year: 2015},
                    ]
                }
            ]
        }, 
        {
            idCompany: 2,
            name: "Naranja",
            usePrice: 75.62,
            minMonth: 9,
            minYear: 2014,
            maxMonth: 8,
            maxYear: 2015,
            months: [],
            pays: [
                {
                    idProduct: 1,
                    name: "Horno",
                    payments: [
                        {idPayment: 1, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 9, year: 2014},
                        {idPayment: 2, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 10, year: 2014},
                        {idPayment: 3, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 11, year: 2014},
                        {idPayment: 4, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 12, year: 2014},
                        {idPayment: 5, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 1, year: 2015},
                        {idPayment: 6, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 2, year: 2015},
                        {idPayment: 7, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 3, year: 2015},
                        {idPayment: 8, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 4, year: 2015},
                        {idPayment: 9, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 5, year: 2015},
                        {idPayment: 10, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 6, year: 2015},
                        {idPayment: 11, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 7, year: 2015},
                        {idPayment: 12, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 8, year: 2015}
                    ]
                }, {
                    idProduct: 2,
                    name: "Celular",
                    payments: [
                        {idPayment: 13, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 11, year: 2014},
                        {idPayment: 14, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 12, year: 2014},
                        {idPayment: 15, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 1, year: 2015},
                        {idPayment: 16, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 2, year: 2015},
                        {idPayment: 17, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 3, year: 2015},
                        {idPayment: 18, price: 291.33, status: T_N_PAID_ME, owner: 1, nameOwner: "Natti", month: 4, year: 2015}
                    ]
                }, {
                    idProduct: 3,
                    name: "Celular",
                    payments: [
                        {idPayment: 19, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 12, year: 2015},
                        {idPayment: 20, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 1, year: 2015},
                        {idPayment: 21, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 2, year: 2015},
                        {idPayment: 22, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 3, year: 2015},
                        {idPayment: 23, price: 416.50, status: T_PAID_ME, owner: 1, nameOwner: "Natti", month: 4, year: 2015},
                        {idPayment: 24, price: 416.50, status: T_N_PAID_ME, owner: 1, nameOwner: "Natti", month: 5, year: 2015},
                    ]
                },{
                    idProduct: 1,
                    name: "Horno",
                    payments: [
                        {idPayment: 1, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 9, year: 2014},
                        {idPayment: 2, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 10, year: 2014},
                        {idPayment: 3, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 11, year: 2014},
                        {idPayment: 4, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 12, year: 2014},
                        {idPayment: 5, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 1, year: 2015},
                        {idPayment: 6, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 2, year: 2015},
                        {idPayment: 7, price: 144.08, status: I_PAID, owner: -1, nameOwner: "", month: 3, year: 2015},
                        {idPayment: 8, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 4, year: 2015},
                        {idPayment: 9, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 5, year: 2015},
                        {idPayment: 10, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 6, year: 2015},
                        {idPayment: 11, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 7, year: 2015},
                        {idPayment: 12, price: 144.08, status: PAYING, owner: -1, nameOwner: "", month: 8, year: 2015}
                    ]
                }, {
                    idProduct: 2,
                    name: "Celular",
                    payments: [
                        {idPayment: 13, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 11, year: 2014},
                        {idPayment: 14, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 12, year: 2014},
                        {idPayment: 15, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 1, year: 2015},
                        {idPayment: 16, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 2, year: 2015},
                        {idPayment: 17, price: 291.33, status: I_PAID, owner: 1, nameOwner: "Natti", month: 3, year: 2015},
                        {idPayment: 18, price: 291.33, status: T_N_PAID_ME, owner: 1, nameOwner: "Natti", month: 4, year: 2015}
                    ]
                }, {
                    idProduct: 3,
                    name: "Celular",
                    payments: [
                        {idPayment: 19, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 12, year: 2015},
                        {idPayment: 20, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 1, year: 2015},
                        {idPayment: 21, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 2, year: 2015},
                        {idPayment: 22, price: 416.50, status: I_PAID, owner: 1, nameOwner: "Natti", month: 3, year: 2015},
                        {idPayment: 23, price: 416.50, status: T_PAID_ME, owner: 1, nameOwner: "Natti", month: 4, year: 2015},
                        {idPayment: 24, price: 416.50, status: T_N_PAID_ME, owner: 1, nameOwner: "Natti", month: 5, year: 2015},
                    ]
                }
            ]
        }
    ];

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

    $scope.getClass = function (status) {
        switch (status) {
            case PAYING:
                return "bg-ligth-green";
            case I_PAID:
                return "bg-ligth-blue";
            case T_PAID_ME:
                return "bg-ligth-red";
            case T_N_PAID_ME:
                return "bg-ligth-violete";
            case I_PAID_T_N_PAID_ME:
                return "bg-ligth-yellow";

        }
        return "";
    };

//    $scope.getProducts = function (company) {
//        var pays = company.pays;
//        var pC = pays.length;
//
//        var result = [];
//        for (var i = 0; i < pC; i++) {
//            result.push({
//                name: pays[i].name
//            });
//        }
//        console.log("prd");
//        return result;
//    };

//    $scope.ll = $scope.getProducts($scope.store.payments[0]);

    $scope.getMonthName = function (number) {
        return MONTH[number];
    };

    $scope.getPrice = function (index, comp, month, year) {
        var payments = comp.pays[index];
        if (payments) {
            payments = payments.payments;
            var cPays = payments.length;
            for (var i = 0; i < cPays; i++) {
                if (payments[i].month == month && payments[i].year == year) {
                    return payments[i];
                }
            }
        }

        return "";
    };

});