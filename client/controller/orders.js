var myApp = angular.module("myApp");

myApp.controller("orders", [
  "$scope",
  "$http",
  "$location",
  "$route",
  "$routeParams",
  function($scope, $http, $location, $route, $routeParams) {
    $scope.user = window.localStorage.user;
    $scope.getOrders = function() {
      $http
        .get("/api/orders/user/" + window.localStorage.user, {
          headers: {
            Authorization: `Basic ${window.localStorage.token}`
          },
          transformRequest: angular.identity,
          transformResponse: angular.identity
        })
        .then(
          function(response) {
            $scope.countItems = JSON.parse(response.data).count;
            $scope.orderItems = JSON.parse(response.data).orders;
          },
          function(err) {
            console.log(err.data);
          }
        );
    };

    $scope.getAllOrders = function() {
      $http
        .get("/api/orders", {
          headers: {
            Authorization: `Basic ${window.localStorage.token}`
          },
          transformRequest: angular.identity,
          transformResponse: angular.identity
        })
        .then(
          function(response) {
            $scope.countItems = JSON.parse(response.data).count;
            $scope.orderItems = JSON.parse(response.data).orders;
          },
          function(err) {
            console.log(err.data);
          }
        );
    };

    $scope.getOrderDetails = function() {
      var id = $routeParams.id;
      $http
        .get("/api/orders/" + id, {
          headers: {
            Authorization: `Basic ${window.localStorage.token}`
          },
          transformRequest: angular.identity,
          transformResponse: angular.identity
        })
        .then(
          function(response) {
            $scope.orderItem = JSON.parse(response.data).order;
          },
          function(err) {
            console.log(err.data);
          }
        );
    };

    $scope.getMenuItems = function() {
      $http.get("/api/menu").then(
        function(response) {
          $scope.countItems = response.data.count;
          $scope.menu = response.data.items;
        },
        function(err) {
          console.log(err.message);
        }
      );
    };

    $scope.getMenuItem = function() {
      var id = $routeParams.id;
      $http.get("/api/menu/" + id).then(
        function(response) {
          $scope.menuItem = response.data.item;
        },
        function(err) {
          console.log(err.message);
        }
      );
    };

    $scope.$on("$routeChangeStart", function(angularEvent, newUrl) {
      // check if the custom property exist
      if (newUrl.requireAuth && !window.localStorage.token) {
        // user isn’t authenticated
        $location.path("/login");
      }
    });

    $scope.placeOrder = function(itemId, quantity) {
      var data = {
        itemId: itemId,
        quantity: quantity,
        userId: window.localStorage.user,
        address: window.localStorage.userAddress
      };
      $http
        .post("/api/orders", JSON.stringify(data), {
          headers: {
            Authorization: `Basic ${window.localStorage.token}`,
            "Content-Type": "application/json"
          },
          transformRequest: angular.identity,
          transformResponse: angular.identity
        })
        .then(
          function(data) {
            window.alert("Order Recieved");
            window.location.reload();
          },
          function(data) {
            console.log(data.data);
          }
        );
    };

    $scope.deleteOrder = function(id) {
      $http
        .delete("/api/orders/" + id, {
          headers: {
            Authorization: `Basic ${window.localStorage.token}`,
            "Content-Type": "application/json"
          },
          transformRequest: angular.identity,
          transformResponse: angular.identity
        })
        .then(
          function(data) {
            $route.reload();
          },
          function(data) {
            console.log(data.data);
          }
        );
    };

    $scope.logout = function() {
      window.localStorage.token = "";
      window.localStorage.user = "";
      window.localStorage.userAddresss = "";
      $scope.loggedOut = true;
    };
  }
]);
