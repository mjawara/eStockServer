App.config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {
            templateUrl: '/partials/suppliers/index',
            controller: 'IndexController'
        })
        .when('/add', {
            templateUrl: '/partials/suppliers/add',
            controller: 'AddController'
        })
        .when('/edit/:id', {
            templateUrl: '/partials/suppliers/edit',
            controller: 'EditController'
        })
        .otherwise({
            redirectTo: '/'
        });

});
