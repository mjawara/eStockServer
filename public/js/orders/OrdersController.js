App.controller('OrdersController', function ($scope, OrdersService, LxNotificationService) {

    $scope.getOrders = function (opt) {

        OrdersService.getOrderList(opt)
            .then(function (data) {
                if (data.ok) {
                    $scope.orders = data.rows;
                } else {
                    console.log(data.msg);
                    LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log.');
                }

            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log.');
            });

    };

    $scope.getOrders('N');

});