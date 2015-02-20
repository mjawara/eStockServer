App.config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {
            templateUrl: '/partials/clients/index',
            controller: 'IndexController'
        })
        .when('/new', {
            templateUrl: '/partials/clients/new',
            controller: 'NewController'
        })
        .when('/edit/:id', {
            templateUrl: '/partials/clients/edit',
            controller: 'EditController'
        })
        .otherwise({
            redirectTo: '/'
        });

});
