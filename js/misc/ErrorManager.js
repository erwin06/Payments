var errorManager = {
    errorsList: {
        noPermission: 1,
        noLogged: 2,
        genericError: 3
    },
    proccessError: function (data, $location, $cookies) {
        alert.hide();
        var optional = data.optional;
        if (optional) {

            switch (optional.errorid) {
                case errorManager.errorsList.noLogged:
                    alert.error(data.message);
                    try {
                        $cookies.sessionid = null;
                        $cookies.userid = null;
                    } catch (e) {
                        
                    }
                    $location.path('/login');
                case errorManager.errorsList.genericError:
                    $location.path('/error');
            }


        } else {
            alert.error(data.message);
        }
    }

};
