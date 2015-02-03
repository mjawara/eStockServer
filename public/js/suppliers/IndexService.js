App.factory('IndexService', function ($q, $http) {

    return {
        getList: function () {

            var q = $q.defer();

            var options = {
                url: '/suppliers/list',
                method: 'POST'
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
        doRemove: function (id) {

            var q = $q.defer();

            var options = {
                url: '/suppliers/remove',
                method: 'POST',
                data: {id: id}
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
