inApp.service('CompanyService', function($http, $cookies){
     	
    this.addCompany = function(cb, companyName){

    	if(!companyName){
    		cb({message: "Falta el nombre de la empresa"}); return
    	}

    	var json = { operation: "addCompany",
			userData: { idSession: $cookies.idSession, idUser: $cookies.idUser},
			data: { name: companyName } }

		$http.post(__URL__, json)
            .success(function (response) { cb({ succ: response.success, message: response.message }) }).error(function(){ cb({ succ: false, message: "Ups! Algo no salió como esperaba" }) });
    }
});