App.factory('OrdersService', function ($q, $http) {

    return {
        getOrderList: function (opt) {
            var q = $q.defer(),
                options = {
                    method: 'POST',
                    url: '/orders/list',
                    data: {
                        opt: opt
                    }
                };

            // $http.post('/orders/list', {opt: opt})

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    q.reject('Internet connection failed.')
                })

            return q.promise;
        }
    };
});
