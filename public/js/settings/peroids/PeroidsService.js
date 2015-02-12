/**
 * Year Service
 */
App.factory('PeroidsService', function ($q, $http) {


    return {
        all: function () {

            var q = $q.defer();

            var options = {
                url: '/settings/peroids/all',
                method: 'POST'
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
        get: function (id) {

            var q = $q.defer();

            var options = {
                url: '/settings/peroids/detail',
                method: 'POST',
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

        save: function (year) {
            var q = $q.defer();

            var options = {
                url: '/settings/peroids/save',
                method: 'POST',
                data: {
                    n: year.n,
                    s: year.s,
                    e: year.e
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

        delete: function (id) {
            var q = $q.defer();

            var options = {
                url: '/settings/peroids/remove',
                method: 'POST',
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

        update: function (id, year) {

            var q = $q.defer();

            var options = {
                url: '/settings/peroids/update',
                method: 'POST',
                data: {
                    id: id,
                    n: year.n,
                    s: year.s,
                    e: year.e
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

    }

});
