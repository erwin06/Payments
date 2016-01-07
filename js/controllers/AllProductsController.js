inApp.controller('AllProducts', function($scope, ProductService) {

    $scope.store = { querys:[] };
    $scope.data = {}

    function loadProducts(){
        ProductService.getAllProducts(function(response){
            if(response.succ){
                $scope.store.products = response.products
            } else {
                alert.error(response.message)
            }
        });
    }


    $scope.deleteProduct = function(idProduct){
    	confirm.info("¿Estás seguro que quieres eliminar?",function(button){
           if(button == "Aceptar"){
                ProductService.deleteProduct(function(response){
                    if(response.succ) loadProducts();
                    else
                        alert.error(response.message)
                }, idProduct)
        }});
    }

    loadProducts();

});