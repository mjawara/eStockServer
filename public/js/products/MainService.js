App.factory('MainService', function ($q, $http) {

    return {

        getList: function () {
            var q = $q.defer();

            var options = {
                url: '/products/list',
                method: 'POST'
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject('Error status code: ' + status);
                });

            return q.promise;
        },

        save: function (item) {
            var q = $q.defer();

            var options = {
                url: '/products/save',
                method: 'POST',
                data: {
                    item: item
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject('Error status code: ' + status);
                });

            return q.promise;
        }
    };

});