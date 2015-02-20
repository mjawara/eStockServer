/**
 * Product module
 */
App.config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {
            templateUrl: '/partials/products/main',
            controller: 'MainController'
        })
        .otherwise({ redirectTo: '/' });

});