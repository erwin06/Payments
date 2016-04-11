inApp.service('LoginService', function($http, $cookies, $cookieStore, $location, $q){
     	
    this.logIn = function(user, password, cb){
        $http.post(gUrl("login"), { user: user, password: password })
            .success(function(response) {
                if(response.succ){
                    $cookies.put("hash",response.data.hash)
                    cb.success();
                } else {
                    cb.fail(response.message);
                }
            });
    }

    this.logOut = function(){

        $cookieStore.remove('idUser');
        $cookieStore.remove('idSession');
        $location.path('/login');

    }

});