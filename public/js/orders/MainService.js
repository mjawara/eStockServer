App.factory('MainService', function ($q, $http) {

    return {
        getOrderList: function (statusId) {
            var q = $q.defer(),
                options = {
                    method: 'POST',
                    url: '/orders/list',
                    data: {
                        status: statusId
                    }
                };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function () {
                    q.reject('Internet connection failed.')
                });

            return q.promise;
        },

        getOrderStatusList: function () {
            var q = $q.defer(),
                options = {
                    method: 'POST',
                    url: '/orders/status/list'
                };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function () {
                    q.reject('Internet connection failed.')
                });

            return q.promise;
        }
    };
});
