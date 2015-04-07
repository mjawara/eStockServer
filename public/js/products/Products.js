/**
 * Product module
 */
App.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/products/main',
            controller: 'MainController'
        })
        .otherwise({ redirectTo: '/' });

});