App.config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('!');
    
    $routeProvider
        .when('/', {
            templateUrl: '/partials/purchases/index',
            controller: 'IndexController'
        })
        .when('/new', {
            templateUrl: '/partials/purchases/new',
            controller: 'NewController'
        })
        .when('/edit/:id', {
            templateUrl: '/partials/purchases/edit',
            controller: 'EditController'
        })
        .when('/detail/:id', {
            templateUrl: '/partials/purchases/detail',
            controller: 'DetailController'
        })
        .otherwise({
            redirectTo: '/'
        });

});
