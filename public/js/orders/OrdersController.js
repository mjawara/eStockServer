App.controller('OrdersController', function ($scope, OrdersService,
    LxNotificationService, LxProgressService) {

    $scope.onlyApproved = false;

    $scope.orderStatus = [{
        val: '1',
        name: 'รออนุมัติ'
    }, {
        val: '2',
        name: 'อนุมัติ'
    }, {
        val: '3',
        name: 'ยกเลิก'
    }];

    $scope.status = {
        val: '1',
        name: 'รออนุมัติ'
    };

    $scope.getOrders = function (opt) {

        LxProgressService.linear.show('#5fa2db', '#progress');

        OrdersService.getOrderList(opt)
            .then(function (data) {
                if (data.ok) {
                    $scope.orders = data.rows;
                    LxProgressService.linear.hide();
                } else {
                    console.log(data.msg);
                    LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log.');
                    LxProgressService.linear.hide();
                }

            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log.');
                LxProgressService.linear.hide();
            });

    };

    $scope.getOrders('1');

    $scope.setStatus = function (status) {
        $scope.statusCode = status;
    };

    $scope.changeSatus = function () {
        $scope.getOrders($scope.statusCode);
    };

});
