App.controller('NewController', function ($scope, NewService, LxDialogService, LxNotificationService) {

    $scope.suppliers = [];
    $scope.products = [];
    $scope.drugs = [];

    NewService.getSuppliers()
        .then(function (data) {
            if (data.ok) {
                $scope.suppliers = data.rows;
            } else {
                console.log(data.msg);
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
            }
        }, function (err) {
            LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
        });

    NewService.getProducts()
        .then(function (data) {
            if (data.ok) {
                $scope.products = data.rows;
            } else {
                console.log(data.msg);
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
            }
        }, function (err) {
            LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
        });

    $scope.showModal = function () {
        LxDialogService.open('mdlNew');
    };

    $scope.addItem = function (code) {
        var qty = prompt('ระบุจำนวนที่ต้องการสั่ง', 0);

        if (qty > 0) {
            var idx = _.findIndex($scope.products, {
                code: code
            });
            $scope.products[idx].added = 'Y';
            $scope.products[idx].qty = qty;

            // add to drugs
            $scope.drugs.push($scope.products[idx]);
        } else {
            LxNotificationService.error('กรุณาระบุจำนวนที่ต้องการสั่งซื้อ');
        }

    };
});
