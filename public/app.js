let jetbrains = angular.module("jetbrains", []);

jetbrains.controller("AppCtrl", ($scope, $http) => {
  let url = `http://localhost:3000`;

  $scope.saveProduct = (newProduct) => {
    $http.post(url + "/add", {name:newProduct}).then(()=>{
      loadProducts();
    });
  };
  

  function loadProducts() {
    console.log("loadProducts");
    $http.get(url).then((products) => {
      $scope.products = products;
    }, (error) => {
      console.log("loadProducts error");
    });
  }

  loadProducts();
});