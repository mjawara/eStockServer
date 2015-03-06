/**
 * Edit controller
 */

App.controller('EditController', function ($scope, $routeParams, $location, $filter,
                                           EditService, LxNotificationService, LxDialogService) {

    $scope.purchaseId = $routeParams.id;

    $scope.products = [];

    var promise = EditService.getProductsList();

    promise.then(function (products) {
        $scope.products = products;
        return EditService.getSuppliers();
    }).then(function (suppliers) {
        $scope.suppliers = suppliers;
        return EditService.getPurchase($scope.purchaseId);
    }).then(function (items) {
        $scope.purchaseCode = items.purchase.code;
        $scope.purchaseDate = $filter('toThaiDate')(items.purchase.purchase_date);
        $scope.supplier_name = items.purchase.supplier_name;
        $scope.contact_name = items.purchase.contact_name;

        $scope.selectedSupplier = {id: items.purchase.supplier_id, name: items.purchase.supplier_name};

        $scope.drugs = items.drugs;

        _.forEach($scope.drugs, function (v) {
            $scope.setSelected(v.code);
        });
    }, function (err) {
        console.log(err);
        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
    });

    $scope.setSelected = function (code) {
        var idx = _.findIndex($scope.products, {
            code: code
        });

        if (idx != -1) $scope.products[idx].added = 'Y';
    };

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
            }
        });
    };

    $scope.doSavePurchase = function () {
        if (_.size($scope.drugs)) {

            if ($scope.purchaseCode && $scope.purchaseDate && $scope.supplier) {
                var drugs = [];

                _.forEach($scope.drugs, function (v) {
                    var obj = {};
                    obj.product_code = v.code;
                    obj.purchase_id = $scope.purchaseId;
                    obj.qty = v.qty;
                    drugs.push(obj);
                });

                var purchase = {
                    code: $scope.purchaseCode,
                    //date: moment($scope.purchaseDate).format('YYYY-MM-DD'),
                    supplier_id: $scope.supplier,
                    contact_name: $scope.contact_name,
                    purchase_id: $scope.purchaseId
                };

                EditService.updatePurchases(purchase, drugs)
                    .then(function () {
                        $location.path('/');
                    }, function () {
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                    });
            } else {
                LxNotificationService.error('กรุณากรอกรายละเอียดการเบิกให้ถูกต้อง ครบถ้วน');
            }

        } else {
            LxNotificationService.error('กรุณาเลือกรายการเวชภัณฑ์ที่ต้องการจัดซื้อ');
        }
    };

    $scope.setSupplier = function (id, contact_name) {
        $scope.supplier = id;
        //$scope.contact_name = contact_name;
    };

});
