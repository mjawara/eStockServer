App.factory('AddService', function ($q, $http) {

    var q = $q.defer();

    return {
        doSave: function (data) {

            var options = {
                url: '/suppliers/save',
                method: 'POST',
                data: {
                    data: data
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
