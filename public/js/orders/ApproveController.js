App.controller('ApproveController', function ($scope, $location, $routeParams, $filter, ApproveService,
                                              MainService, LxNotificationService, LxDialogService) {

    var orderId = $routeParams.id;

    $scope.statusId = null;

    $scope.getOrderStatusList = function () {
        MainService.getOrderStatusList()
            .then(function (data) {
                $scope.orderStatus = data.rows;
            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log.');
            });
    };

    $scope.setStatus = function (data) {
        if (data) {
            $scope.statusId = data.id;
        }
    };

    // Get orders status list
    $scope.getOrderStatusList();

    ApproveService.getDetail(orderId)
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
                    obj.approve_qty = 0;
                    obj.lot_id = null;
                    obj.lot_name = null;

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
        $scope.approveQty = 0;

        $scope.productCode = null;
        $scope.productName = null;
        $scope.lots = [];
        $scope.expd = null;
        $scope.mfd = null;

        ApproveService.getLots(code)
            .then(function (data) {
                if (data.ok) {
                    $scope.lots = data.rows;
                    $scope.productCode = code;
                    $scope.productName = name;
                    $scope.orderQty = qty;

                    var idx = _.findIndex($scope.products, {
                        code: code
                    });

                    if ($scope.products[idx].approve_qty) {
                        $scope.lotNumber = {
                            lot_id: $scope.products[idx].lot_id,
                            lot_name: $scope.products[idx].lot_name
                        };

                        $scope.lot_id = $scope.products[idx].lot_id;
                        $scope.lot_name = $scope.products[idx].lot_name;

                        $scope.approveQty = $scope.products[idx].approve_qty;
                    } else {
                        $scope.approveQty = $scope.orderQty;
                    }

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
            $scope.lot_id = null;
            $scope.lot_name = null;
            $scope.expd = null;
            $scope.mfd = null;
        } else {
            var lot = $scope.lots[idx];
            $scope.lot_id = lot.lot_id;
            $scope.lot_name = lot.lot_name;
            $scope.expd = $filter('toThaiDate')(lot.expd);
            $scope.mfd = $filter('toThaiDate')(lot.mfd);
        }

    };

    $scope.doAddApproveItem = function () {
        var idx = _.findIndex($scope.products, {
            code: $scope.productCode
        });

        if ($scope.lots.length) {
            if (!$scope.lot_id) {
                LxNotificationService.warning('กรุณาระบุ Lot');
            } else if ($scope.approveQty === 0) {
                LxNotificationService.warning('กรุณาระบุจำนวนอนุมัติ');
            } else {
                $scope.products[idx].lot_id = $scope.lot_id;
                $scope.products[idx].lot_name = $scope.lot_name;
                $scope.products[idx].approve_qty = $scope.approveQty;

                LxDialogService.close('mdlApprove');
            }
        } else {
            if ($scope.approveQty === 0) {
                LxNotificationService.warning('กรุณาระบุจำนวนอนุมัติ');
            } else {
                $scope.products[idx].lot_id = $scope.lot_id;
                $scope.products[idx].lot_name = $scope.lot_name;
                $scope.products[idx].approve_qty = $scope.approveQty;

                LxDialogService.close('mdlApprove');
            }
        }
    };

    $scope.doSave = function () {
        //console.log($scope.products);

        LxNotificationService.confirm('ยืนยันการอนุมัติ', 'คุณต้องการบันทึกรายการนี้ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการบันทึก',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                if ($scope.statusId) {
                    var products = [];

                    _.forEach($scope.products, function (v) {
                        var obj = {};
                        obj.code = v.code;
                        obj.qty = v.approve_qty;
                        obj.lot = v.lot_id;

                        products.push(obj);
                    });

                    //console.log(products);
                    ApproveService.doSave(orderId, $scope.statusId, products)
                        .then(function (data) {
                            if (data.ok) {
                                LxNotificationService.success('บันทึกรายการเสร็จเรียบร้อยแล้ว');
                                // Redirect to main page
                                $location.path('/');
                            } else {
                                LxNotificationService.error(data.msg);
                            }
                        }, function (err) {
                            console.log(err);
                            LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                        });

                } else {
                    LxNotificationService.warning('กรุณาระบุสถานะใบสั่งเวชภัณฑ์');
                }
            }
        });

    };

    $scope.doCancel = function () {
        LxNotificationService.confirm('กรุณายืนยัน', 'คุณต้องยกเลิกรายการขอเบิกนี้ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการยกเลิก',
            cancel: 'ไม่'
        }, function (res) {
            if (res) {
                ApproveService.doCancel(orderId)
                    .then(function (data) {
                        if (data.ok) {
                            $location.path('/');
                        } else {
                            console.log(data.msg);
                            LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                        }
                    }, function (err) {
                        console.log(err);
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                    });
            }
        });
    };

});
