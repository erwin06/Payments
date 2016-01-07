inApp.service('OwnerService', function($http, $cookies){
     	
    this.addOwner = function(cb, ownerNane){

    	if(!ownerNane){
    		cb({succ: false, message: "Falta el nombre del responsable"}); return
    	}

        var json = { operation: "addOwner",
            userData: { idSession: $cookies.idSession, idUser: $cookies.idUser },
            data: { name: ownerNane }}

        $http.post(__URL__, json)
            .success(function (response) { cb({ succ: response.success, error: response.message }) }).error(function(){ cb({ succ: false, message: "Ups! Algo no salió como esperaba" }) });

    }
});