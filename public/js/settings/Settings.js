App.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {
            templateUrl: '/partials/settings/index',
            controller: 'IndexController'
        })
        .when('/years', {
            templateUrl: '/partials/settings/peroids',
            controller: 'PeroidsController'
        })
        .otherwise({
            redirectTo: '/'
        });

});
