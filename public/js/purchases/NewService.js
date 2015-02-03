App.factory('NewService', function ($q, $http) {

    return {
        getSuppliers: function () {
            var q = $q.defer();

            var options = {
                url: '/suppliers/list',
                method: 'POST'
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    console.log(status);
                    q.reject(status);
                });

            return q.promise;
        },
        getProducts: function () {
            var q = $q.defer();

            var options = {
                url: '/products/list',
                method: 'POST'
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    console.log(status);
                    q.reject(status);
                });

            return q.promise;
        }

    };

});
