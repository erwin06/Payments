inApp.service('ProductService', function($http, $cookies){
     	
    this.getAllProducts = function(cb){

    	var json = {operation: "getAllProducts",userData:{idSession: $cookies.idSession, idUser: $cookies.idUser}}

        $http.post(__URL__, json)
    	    .success(function (response) {
    	    	cb({succ:response.success, message: response.message, products: response.optional})
    	    }).error(function(){cb({message: "Ups! Algo no salió como esperaba" })});
    }

    this.deleteProduct = function(cb, idProduct){

    	if(!idProduct){
    		cb({message: "Falta el id del product"}); return
    	}

		var json = { operation: "deleteProduct", userData: { idSession: $cookies.idSession, idUser: $cookies.idUser }, data: { idProduct: idProduct, idUser: $cookies.idUser }}

        $http.post(__URL__, json).success(function (response) {cb({succ: response.success, message: response.message})}).error(function(){cb({message: "Ups! Algo no salió como esperaba"})});
    }
});