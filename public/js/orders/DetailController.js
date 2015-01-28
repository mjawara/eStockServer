App.controller('DetailController', function ($scope, DetailService, LxNotificationService, LxDialogService) {

    var orderId = angular.element('#orderId').val();

    DetailService.getDetail(orderId)
        .then(function (data) {
            if (data.ok) {
                $scope.orders = data.orders;
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
                    obj.approve_qty = 0;

                    $scope.products.push(obj);
                });

            } else {
                console.log(data.err);
                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
            }
        }, function (err) {
            console.log(err);
            LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
        });

    $scope.showApprove = function (code, name, qty) {

        $scope.orderQty = 0;
        $scope.productCode = null;
        $scope.productName = null;
        $scope.lot = null;
        $scope.expd = null;
        $scope.mfd = null;

        DetailService.getLots(code)
            .then(function (data) {
                if (data.ok) {
                    $scope.lots = data.rows;
                    $scope.productCode = code;
                    $scope.productName = name;
                    $scope.orderQty = qty;

                    LxDialogService.open('mdlApprove');
                } else {
                    console.log(err);
                    LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                }

            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
            });

    };

    $scope.setLot = function (lotId) {

        var idx = _.findIndex($scope.lots, {
            lot_id: lotId
        });

        if (idx == -1) {
            $scope.lot = null;
            $scope.expd = null;
            $scope.mfd = null;
        } else {
            var lot = $scope.lots[idx];
            $scope.lot = lot.lot_id;
            $scope.expd = lot.expd;
            $scope.mfd = lot.mfd;
        }

    };

});