App.controller('NewController', function ($scope, $location, NewService, LxDialogService, LxNotificationService) {

    $scope.suppliers = [];
    $scope.supplier = null;
    $scope.contact_name = null;
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
        var qty = prompt('ระบุจำนวนที่ต้องการสั่ง', '0');

        if (qty > 0) {
            var idx = _.findIndex($scope.products, {
                code: code
            });

            if(idx != -1) {
                $scope.products[idx].added = 'Y';
                $scope.products[idx].qty = qty;
            }
            // add to drugs
            $scope.drugs.push($scope.products[idx]);

        } else {
            LxNotificationService.error('กรุณาระบุจำนวนที่ต้องการสั่งซื้อ');
        }

    };

    $scope.doEdit = function (code, oldQty) {
        var idx = _.findIndex($scope.drugs, {
            code: code
        });

        var qty = prompt('ระบุจำนวนที่ต้องการแก้ไข', oldQty);

        if (qty && qty > 0) {
            $scope.drugs[idx].qty = qty;
        } else {
            LxNotificationService.error('กรุณาระบุจำนวนที่ต้องการสั่งซื้อ');
        }
    };

    $scope.doRemove = function (code) {
        var idx = _.findIndex($scope.drugs, {
            code: code
        });

        var idxProduct = _.findIndex($scope.products, {
            code: code
        });

        LxNotificationService.confirm('ยืนยันการลบ', 'คุณต้องการลบรายการนี้ออกจากการสั่งซื้อ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการลบ',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                $scope.products[idxProduct].added = 'N';
                $scope.drugs.splice(idx, 1);
                console.log(idx);
                console.log($scope.drugs);
            }
        });
    };

    $scope.setSupplier = function (id, contact_name) {
        $scope.supplier = id;
        $scope.contact_name = contact_name;
    };

    $scope.doSavePurchase = function () {
        if (_.size($scope.drugs)) {

            if ($scope.purchaseCode && $scope.purchaseDate && $scope.supplier) {
                var drugs = [];

                _.forEach($scope.drugs, function (v) {
                    var obj = {};
                    obj.code = v.code;
                    obj.qty = v.qty;
                    drugs.push(obj);
                });

                var purchase = {};
                purchase.code = $scope.purchaseCode;
                purchase.date = moment($scope.purchaseDate).format('YYYY-MM-DD');
                purchase.supplier = $scope.supplier;
                purchase.contact_name = $scope.contact_name;

                NewService.savePurchase(purchase, drugs)
                    .then(function (data) {
                        if (data.ok) {
                            LxNotificationService.success('บันทึกรายการเสร็จเรียบร้อยแล้ว');
                            $location.path('/');
                        } else {
                            console.log(data.msg);
                            LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                        }
                    }, function (err) {
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                    });
            } else {
                LxNotificationService.error('กรุณากรอกรายละเอียดการเบิกให้ถูกต้อง ครบถ้วน');
            }

        } else {
            LxNotificationService.error('กรุณาเลือกรายการเวชภัณฑ์ที่ต้องการจัดซื้อ');
        }
    };
});
