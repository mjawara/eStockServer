App.factory('EditService', function ($q, $http) {

    return {
        getDetail: function (id) {

            var q = $q.defer();

            var options = {
                url: '/suppliers/detail',
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
                    console.log(status);
                    q.reject(status);
                });

            return q.promise;
        },

        doUpdate: function (supplier) {

            var q = $q.defer();

            var options = {
                url: '/suppliers/update',
                method: 'POST',
                data: {
                    supplier: supplier
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    console.log(status);
                    q.reject(status);
                });

            return q.promise;
        }
    };

});
