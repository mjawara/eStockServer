App.factory('EditService', function ($q, $http) {

    return {
        get: function (id) {
            var q = $q.defer();

            var options = {
                url: '/clients/get',
                method: 'POSt',
                data: {
                    id: id
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject(status);
                });

            return q.promise;
        },
        update: function (client) {
            var q = $q.defer();

            var options = {
                url: '/clients/update',
                method: 'POSt',
                data: {
                    client: client
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject(status);
                });

            return q.promise;
        }
    };

});
