App.controller('MainController', function ($scope, MainService,
    LxNotificationService, LxProgressService) {

    $scope.onlyApproved = false;
    $scope.orderStatus = [];

    $scope.getOrders = function (status) {

        var statusId;

        LxProgressService.linear.show('#5fa2db', '#progress');

        if (!status) {
            statusId = -1;
        } else {
            statusId = status;
        }

        MainService.getOrderList(statusId)
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

    $scope.getOrderStatusList = function () {
        MainService.getOrderStatusList()
            .then(function (data) {
                $scope.orderStatus = data.rows;
            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log.');
            });
    };

    /**
     * Set status
     */
    $scope.setStatus = function (data) {
        if (data) {
            $scope.getOrders(data.id);
        }
    };
    // Initial
    $scope.getOrders();
    $scope.getOrderStatusList();

});
