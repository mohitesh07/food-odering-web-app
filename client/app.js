var myApp = angular.module("myApp", ["ngRoute"]);

myApp.directive("file", function() {
  return {
    scope: {
      file: "="
    },
    link: function(scope, el, attrs) {
      el.bind("change", function(event) {
        var file = event.target.files[0];
        scope.file = file ? file : undefined;
        scope.$apply();
      });
    }
  };
});

myApp.config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider
      .when("/", {
        controller: "menu",
        templateUrl: "views/menu.html"
      })
      .when("/menu", {
        controller: "menu",
        templateUrl: "views/menu.html"
      })
      .when("/menu/details/:id", {
        controller: "menu",
        templateUrl: "views/item_details.html"
      })
      .when("/menu/add", {
        controller: "menu",
        templateUrl: "views/add_item.html",
        requireAuth: true
      })
      .when("/menu/edit/:id", {
        controller: "menu",
        templateUrl: "views/edit_menu.html",
        requireAuth: true
      })
      .when("/login", {
        controller: "auth",
        templateUrl: "views/login.html"
      })
      .when("/signup", {
        controller: "auth",
        templateUrl: "views/signup.html"
      })
      .when("/orders", {
        controller: "orders",
        templateUrl: "views/orders.html",
        requireAuth: true
      })
      .when("/orders/details/:id", {
        controller: "orders",
        templateUrl: "views/order_details.html",
        requireAuth: true
      })
      .when("/orders/edit/:id", {
        controller: "orders",
        templateUrl: "views/edit_order.html",
        requireAuth: true
      })
      .when("/orders/placeOrder", {
        controller: "orders",
        templateUrl: "views/place_order.html",
        requireAuth: true
      })
      .otherwise({
        redirectTo: "/"
      });
  }
]);
