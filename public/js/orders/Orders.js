/**
 * Orders module
 */
App.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/partials/orders/main',
            controller: 'MainController'
        })
        .when('/approve/:id', {
            templateUrl: '/partials/orders/approve',
            controller: 'ApproveController'
        })
        .when('/detail/:id', {
            templateUrl: '/partials/orders/detail',
            controller: 'DetailController'
        })
        .otherwise({ redirectTo: '/' });

});