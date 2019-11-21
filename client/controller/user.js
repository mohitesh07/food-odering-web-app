"use strict";

angular.module("myApp").controller("auth", [
  "$scope",
  "$location",
  "$http",
  function($scope, $location, $http) {
    $scope.login = function() {
      var formData = {
        email: $scope.email,
        password: $scope.password
      };

      $http.post("/api/user/login", formData).then(
        function(response) {
          window.alert(response.data.message);
          window.localStorage.token = response.data.token;
          window.localStorage.user = $scope.email;
          window.localStorage.userAddress = response.data.address;
          $scope.loggedOut = false;
          window.location = "/";
        },
        function(err) {
          window.alert(err.data.message);
        }
      );
    };

    $scope.signup = function() {
      var formData = {
        email: $scope.email,
        password: $scope.password,
        address: $scope.address
      };

      $http.post("/api/user/signup", formData).then(
        function(response) {
          window.alert(response.data.message);
          window.location = "#!/login";
        },
        function(err) {
          window.alert(err.data.message);
        }
      );
    };

    // $scope.signup = function() {
    //   var formData = {
    //     email: $scope.email,
    //     password: $scope.password
    //   };

    //   Main.save(
    //     formData,
    //     function(res) {
    //       if (res.type == false) {
    //         alert(res.data);
    //       } else {
    //         $localStorage.token = res.data.token;
    //         window.location = "/";
    //       }
    //     },
    //     function() {
    //       $rootScope.error = "Failed to signup";
    //     }
    //   );
    // };
    $scope.token = window.localStorage.token;
  }
]);
