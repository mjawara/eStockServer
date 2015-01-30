App.factory('ClientService', function($q, $http) {

    return {
        doSave: function(client) {
            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/clients/save',
                data: {
                    client: client
                }
            };

            $http(options)
                .success(function(data) {
                    q.resolve(data);
                })
                .error(function(data, status) {
                    q.reject(status);
                });

            return q.promise;
        },

        getList: function() {
            var q = $q.defer();

            var options = {
                method: 'POST',
                url: '/clients/list'
            };

            $http(options)
                .success(function(data) {
                    if (data.ok) {
                        q.resolve(data.rows);
                    } else {
                        q.reject(data.msg);
                    }
                })
                .error(function(data, status) {
                    q.reject(status);
                });

            return q.promise;
        },

        doActive: function(id, status) {
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
                .success(function(data) {
                    if (data.ok) {
                        q.resolve();
                    } else {
                        q.reject(data.msg);
                    }
                })
                .error(function(data, status) {
                    q.reject(status);
                });

            return q.promise;
        }
    };

});
