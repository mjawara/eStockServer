App.factory('MainService', function ($q, $http) {

    return {
        getTopTen: function () {
            var q = $q.defer();
            var options = {
                url: '/reports/topten',
                method: 'POST'
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject('Connection failed');
                });

            return q.promise;
        }
    };

});