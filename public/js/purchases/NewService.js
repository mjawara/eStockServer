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
        },

        savePurchase: function (purchase, drugs) {
            var q = $q.defer();

            var options = {
                url: '/purchases/save',
                method: 'POST',
                data: {
                    purchase: purchase,
                    drugs: drugs
                }
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
