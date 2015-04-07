App.factory('CardService', function ($q, $http) {

    return {
        getCard: function (code, startDate, endDate) {
            var q = $q.defer();

            var options = {
                url: '/products/card',
                method: 'POST',
                data: {
                    code: code,
                    startDate: startDate,
                    endDate: endDate
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject('Connection failed.');
                });

            return q.promise;
        }
    };

});