/**
 * User service
 */

App.factory('UsersService', function ($q, $http) {

    return {

        /**
         * Get all users
         */
        all: function () {
            var q = $q.defer();

            var options = {
                url: '/settings/users/all',
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

        /**
         * Save service
         */
        save: function (items) {
            var q = $q.defer();

            var options = {
                url: '/settings/users/save',
                method: 'POST',
                data: {
                    items: items
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

        /**
         * Remove service
         */
        remove: function (id) {
            var q = $q.defer();

            var options = {
                url: '/settings/users/remove',
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

        /**
         * Update service
         */
        update: function (user) {
            var q = $q.defer();

            var options = {
                url: '/settings/users/update',
                method: 'POST',
                data: {
                    user: user
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
