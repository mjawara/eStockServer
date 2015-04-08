App.factory('LoginService', function ($q, $http) {
    return {
        doLogin: function (username, password, startYear, endYear) {
            var q = $q.defer();

            var options = {
                url: '/login',
                method: 'POST',
                data: {
                    username: username,
                    password: password,
                    startYear: startYear,
                    endYear: endYear
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject('Connection failed');
                });

            return q.promise;
        },

        getYear: function () {
            var q = $q.defer();

            var options = {
                url: '/year',
                method: 'GET'
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