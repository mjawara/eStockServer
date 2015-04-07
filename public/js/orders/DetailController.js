/**
 * Detail Controller
 */
App.controller('DetailController', function ($scope, $routeParams, $filter, DetailService, LxNotificationService) {

    var orderId = $routeParams.id;

    DetailService.getDetail(orderId)
        .then(function (data) {
            if (data.ok) {
                $scope.orders = data.orders;
                $scope.orders_date = $filter('toThaiDate')($scope.orders.orders_date);

                $scope.orders.hospital = [$scope.orders.hospcode, $scope.orders.hospname].join(' ');

                var data = data.products;
                $scope.products = [];

                _.forEach(data, function (v) {
                    var obj = {};
                    obj.code = v.product_code;
                    obj.name = v.product_name;
                    obj.price = v.price;
                    obj.qty = v.qty;
                    obj.cost = v.cost;
                    obj.units = v.units;
                    obj.approve_qty = v.approve_qty;
                    obj.lot_id = null;
                    obj.lot_name = null;

                    $scope.products.push(obj);
                });

            } else {
                if (angular.isObject(data.msg)) {
                    console.log(data.msg);
                    LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                } else {
                    LxNotificationService.error(data.msg);
                }

            }
        }, function (err) {
            LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
            console.log(err);
        });
});