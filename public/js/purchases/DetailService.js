/**
 * Detail Service
 */
App.factory('DetailService', function ($q, $http) {

    return {
        getPurchase: function (id) {
            var q = $q.defer();

            var options = {
                url: '/purchases/edit/detail',
                method: 'POST',
                data: {
                    id: id
                }
            };

            $http(options)
                .success(function (data) {
                    if (data.ok) q.resolve(data);
                    else {
                        q.reject(data.msg);
                    }
                })
                .error(function (data, status) {
                    console.log('Error code: ' + status);
                    q.reject();
                });

            return q.promise;
        }
    };

});