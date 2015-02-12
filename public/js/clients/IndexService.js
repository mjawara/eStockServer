App.factory('IndexService', function ($q, $http) {

    return {
        all: function () {
            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/clients/all'
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
        setActive: function (id, status) {

            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/clients/active',
                data: {
                    id: id,
                    status: status
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

        remove: function (id) {
            var q = $q.defer();

            var options = {
                url: '/clients/remove',
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
        }
    };

});
