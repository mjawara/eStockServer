/**
 * Index Service
 */

App.factory('IndexService', function ($q, $http) {

    return {
        /**
         * Get purchases list
         */
        getList: function () {
            var q = $q.defer();

            var options = {
                url: '/purchases/list',
                method: 'POST'
            };

            $http(options)
                .success(function (data) {
                    if (data.ok) {
                        q.resolve(data.rows);
                    } else {
                        q.reject(data.msg);
                    }
                })
                .error(function (data, status) {
                    console.log('Status code: ' + status);
                    q.reject('Connection failed.');
                });

            return q.promise;
        },

        /**
         * Remove purchase
         */

        doRemove: function (id) {
            var q = $q.defer();

            var options = {
                url: '/purchases/remove',
                method: 'POST',
                data: {
                    id: id
                }
            };

            $http(options)
                .success(function (data) {
                    if (data.ok) {
                        q.resolve();
                    } else {
                        console.log(data.msg);
                        q.reject();
                    }
                })
                .error(function (data, status) {
                    console.log('Status code: ' + status);
                    q.reject();
                });

            return q.promise;
        },

        doImport: function (id) {
            var q = $q.defer();

            var options = {
                url: '/purchases/import',
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
                    console.log('Status code: ' + status);
                    q.reject();
                });

            return q.promise;
        }
    };

});
