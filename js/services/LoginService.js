inApp.service('LoginService', function($http, $cookies, $cookieStore, $location){
     	
    this.logIn = function(cb, email, password){

    	if(!email){
    		cb({message: "Falta el email"}); return
    	}

        if(!password){
            cb({message: "Falta la contraseña"}); return
        }

    	var json = { operation: "login", data: { email: email, password: password } }

		$http.post(__URL__, json)
            .success(function (response) { 
                if(response.success){
                    $cookies.idUser = response.optional.idUser;
                    $cookies.idSession = response.optional.idSession;
                }
                cb({ succ: response.success, message: response.message }) }).error(function(){ cb({ succ: false, message: "Ups! Algo no salió como esperaba" }) });
    }

    this.logOut = function(){

        $cookieStore.remove('idUser');
        $cookieStore.remove('idSession');
        $location.path('/login');

    }

});