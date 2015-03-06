App.factory('ApproveService', function ($q, $http) {

    return {

        getDetail: function (orderId) {
            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/orders/detail',
                data: {
                    id: orderId
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (err) {
                    q.reject(err);
                });

            return q.promise;
        },

        getLots: function (code) {
            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/orders/lots',
                data: {
                    code: code
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (err) {
                    q.reject(err);
                });

            return q.promise;
        },

        doSave: function (orderId, statusId, products) {
            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/orders/approve',
                data: {
                    orderId: orderId,
                    statusId: statusId,
                    products: products
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (err) {
                    q.reject(err);
                });

            return q.promise;
        },

        doCancel: function (orderId) {
            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/orders/cancel',
                data: {
                    order_id: orderId
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (err) {
                    q.reject(err);
                });

            return q.promise;
        }

    };

});
