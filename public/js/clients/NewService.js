App.factory('NewService', function ($q, $http) {

    return {
        doSave: function (client) {
            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/clients/save',
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
