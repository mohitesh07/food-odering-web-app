var myApp = angular.module("myApp");

myApp.controller("menu", [
  "$scope",
  "$http",
  "$location",
  "$route",
  "$routeParams",
  function($scope, $http, $location, $route, $routeParams) {
    $scope.user = window.localStorage.user;
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

    $scope.addMenuItem = function() {
      var myFormData = new FormData();
      myFormData.append("name", $scope.name);
      myFormData.append("price", $scope.price);
      myFormData.append("itemImage", $scope.file);
      $http
        .post("/api/menu", myFormData, {
          headers: {
            Authorization: `Basic ${window.localStorage.token}`,
            "Content-Type": undefined
          },
          transformRequest: angular.identity,
          transformResponse: angular.identity
        })
        .then(
          function(data) {
            //console.log(data.data);
            window.location.reload();
          },
          function(data) {
            console.log(data.data);
          }
        );
    };

    $scope.updateMenuItem = function() {
      var id = $route.current.params.id;
      var data = [];
      if ($scope.name) {
        data.push({ propName: "name", value: $scope.name });
      }
      if ($scope.price) {
        data.push({ propName: "price", value: $scope.price });
      }
      $http
        .patch("/api/menu/" + id, JSON.stringify(data), {
          headers: {
            Authorization: `Basic ${window.localStorage.token}`
          },
          transformRequest: angular.identity,
          transformResponse: angular.identity
        })
        .then(
          function(data) {
            // console.log(data.data);
            window.location = "#!/";
          },
          function(data) {
            console.log(data.data);
          }
        );
    };

    $scope.deleteMenuItem = function(id) {
      $http
        .delete("/api/menu/" + id, {
          headers: {
            Authorization: `Basic ${window.localStorage.token}`,
            "Content-Type": "application/json"
          },
          transformRequest: angular.identity,
          transformResponse: angular.identity
        })
        .then(
          function(data) {
            console.log(data.data);
            window.location = "/";
          },
          function(data) {
            console.log(data.data);
          }
        );
    };

    $scope.logout = function() {
      window.localStorage.token = "";
      window.localStorage.user = "";
      window.localStorage.userAddress = "";
      $scope.loggedOut = true;
    };
  }
]);
