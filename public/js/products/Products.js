/**
 * Product module
 */
App.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/products/main',
            controller: 'MainController'
        })
        .when('/card/:code', {
            templateUrl: '/partials/products/card',
            controller: 'CardController'
        })
        .otherwise({ redirectTo: '/' });

});