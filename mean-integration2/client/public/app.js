angular.module('meanProduct', [])
  .controller('mainCtrl', function ($http) {
    var main = this;

    main.addProduct = addProduct;

    // initial population
    getProducts();

    function addProduct() {
      if (!main.newProductName || !main.newProductCode)
        return false;

      $http({
        method: 'POST',
        url: '/api/products',
        data: {
          product: {
            name: main.newProductName,
            code: main.newProductCode
          }
        }
      }).then(function (res) {
        if (res.status === 201) {
          getProducts();
        }

        var consoleMessage = (res.status === 201)
            ? 'new product "' + main.newProductName + '" has been stored'
            : 'server response was "' + res.data + '" with http status ' + res.status;
        console.log(consoleMessage);
      });
    }

    function getProducts() {
      $http.get('/api/products').then(function (response) {
        main.products = response.data;
      });
    }
  });