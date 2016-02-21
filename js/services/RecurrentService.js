inApp.service('RecurrentService', function($http, $cookies){
     	
    this.generatePayment = function(cb, idRecurrent, amount, month, year){

    	var json = {operation: "generatePayment",userData:{idSession: $cookies.idSession, idUser: $cookies.idUser},
      data:{ idRecurrent: idRecurrent, amount: amount, month: month, year: year }}

        $http.post(__URL__, json)
    	    .success(function (response) {
            console.log(response)
    	    	cb({succ:response.success, message: response.message})
    	    }).error(function(){cb({message: "Ups! Algo no salió como esperaba" })});
    }


    this.getRecurrentById = function(cb, idRecurrent){
        var json = {
            operation: "getRecurrentById",
            userData: { idSession: $cookies.idSession, idUser: $cookies.idUser },
            data: { idRecurrent: idRecurrent }
        }
        $http.post(__URL__, json).success(function (response) {
            console.log(response)
            cb({succ: response.success, message: response.message, recurrent: response.optional })})
        .error(function(){cb({message: "Ups! Algo no salió como esperaba"})});
    }
});