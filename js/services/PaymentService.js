inApp.service('PaymentService', function($http, $cookies){
     	
    this.addPayment = function(cb, data) {

        var json = { operation: "addPay", 
        userData: { idSession: $cookies.idSession, idUser: $cookies.idUser }, data: data}

        $http.post(__URL__, json)
            .success(function(response) { cb({ succ: response.success, error: response.message })})
            .error(function(){ cb({ succ: false, message: "Ups! Algo no salió como esperaba"})});
    }

    this.addRecurrentPayment = function(cb, description, amount) {

        var json = { operation: "addRecurrentPay", 
        userData: { idSession: $cookies.idSession, idUser: $cookies.idUser }, data: {description: description, amount: (amount?amount:0)}}

        $http.post(__URL__, json)
            .success(function(response) { cb({ succ: response.success, error: response.message })})
            .error(function(){ cb({ succ: false, message: "Ups! Algo no salió como esperaba"})});
    }

});