/**
 * Edit Factory
 */

App.factory('EditService', function ($q, $http) {

    return {

        // Get purchase
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
        },

        // Get purchase detail
        getProducts: function (id) {
            var q = $q.defer();

            var options = {
                url: '/purchases/edit/products',
                method: 'POST',
                data: {
                    id: id
                }
            };

            $http(options)
                .success(function (data) {
                    if (data.ok) q.resolve(data.rows);
                    else {
                        console.log(data.msg);
                        q.reject();
                    }
                })
                .error(function (data, status) {
                    q.reject(status);
                });

            return q.promise;
        },

        getProductsList: function () {
            var q = $q.defer();

            var options = {
                url: '/products/list',
                method: 'POST'
            };

            $http(options)
                .success(function (data) {
                    if (data.ok) q.resolve(data.rows);
                    else {
                        console.log(data.msg);
                        q.reject();
                    }
                })
                .error(function (data, status) {
                    console.log('Error code: ' + status);
                    q.reject();
                });

            return q.promise;
        },

        updatePurchases: function (purchase, drugs) {
            var q = $q.defer();

            var options = {
                url: '/purchases',
                method: 'PUT',
                data: {
                    purchase: purchase,
                    drugs: drugs
                }
            };

            $http(options)
                .success(function (data) {
                    if (data.ok) q.resolve();
                    else {
                        console.log(data.msg);
                        q.reject();
                    }
                })
                .error(function (data, status) {
                    console.log('Error code: ' + status);
                    q.reject();
                });

            return q.promise;
        },

        getSuppliers: function () {
            var q = $q.defer();

            var options = {
                url: '/suppliers/list',
                method: 'POST'
            };

            $http(options)
                .success(function (data) {
                    if (data.ok) {
                        q.resolve(data.rows);
                    } else {
                        console.log(data.msg);
                        q.reject();
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
