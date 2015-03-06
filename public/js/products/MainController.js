/** Main Controller **/
App.controller('MainController', function ($scope, MainService, LxNotificationService, LxDialogService) {

    $scope.isEdit = false;
    $scope.isActive = true;

    $scope.getList = function () {

        MainService.getList()
            .then(function (data) {
                if (data.ok) {
                    $scope.products = data.rows;
                } else {
                    if (angular.isObject(data.msg)) {
                        console.log(data.msg);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                    } else {
                        LxNotificationService.error(data.msg);
                    }
                }
            }, function (err) {
                LxNotificationService.error(err);
            });
    };

    // Get product list
    $scope.getList();

    $scope.showModal = function () {

        LxDialogService.open('mdlNew');

    };
    /**
     * Show edit modal
     * @param id
     */
    $scope.showEdit = function (id, code, name, units, cost, price, stdcode, is_active) {
        $scope.id = id;
        $scope.code = code;
        $scope.name = name;
        $scope.units = units;
        $scope.cost = cost;
        $scope.price = price;
        $scope.stdcode = stdcode;
        $scope.isActive = is_active == 'Y' ? true : false;
        $scope.isEdit = true;

        LxDialogService.open('mdlNew');
    };
    /**
     * Save product
     */
    $scope.save = function () {
        var item = {};
        item.code = $scope.code;
        item.name = $scope.name;
        item.units = $scope.units;
        item.cost = $scope.cost;
        item.price = $scope.price;
        item.stdcode = $scope.stdcode;
        item.id = $scope.id;
        item.is_active = $scope.isActive ? 'Y' : 'N';

        if (!item.code || !item.name || !item.code || !item.cost) {
            LxNotificationService.error('ข้อมูลไม่สมบูรณ์ กรุณาตรวจสอบ');
        } else if (!angular.isNumber(item.cost) || !angular.isNumber(item.price)) {
            LxNotificationService.error('กรุณาระบุราคาซื้อ และ ราคาขายเป็นตัวเลขเท่านั้น');
        } else {
            LxNotificationService.confirm('ยืนยันการบันทึก', 'คุณต้องการบันทึกข้อมูล ใช่หรือไม่?', {
                ok: 'ใช่, ฉันต้องการบันทึก',
                cancel: 'ไม่ใช่'
            }, function (res) {
               if (res) {

                   var promise = null;

                   if ($scope.isEdit) {
                       promise = MainService.update(item);
                   } else {
                       promise = MainService.save(item);
                   }

                   promise.then(function (data) {
                       if (data.ok) {
                           $scope.getList();
                           LxNotificationService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
                           LxDialogService.close('mdlNew');
                       } else {
                           if (angular.isObject(data.msg)) {
                               console.log(data.msg);
                               LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                           } else {
                               LxNotificationService.error(data.msg);
                           }
                       }
                   }, function (err) {
                       console.log(err);
                       LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                   });
               }
            });
        }

    };

    $scope.closingDialog = function () {
        $scope.id = null;
        $scope.code = null;
        $scope.name = null;
        $scope.units = null;
        $scope.cost = 0;
        $scope.price = 0;
        $scope.stdcode = null;
        $scope.isActive = true;
        $scope.isEdit = false;

    };

    $scope.remove = function (code) {
        LxNotificationService.confirm('ยืนยันการลบ', 'คุณต้องการลบรายการ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการลบ',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                MainService.remove(code)
                    .then(function (data) {
                        if (data.ok) {
                            $scope.getList();
                            LxNotificationService.success('ลบรายการเสร็จเรียบร้อยแล้ว');
                        } else {
                            if (angular.isObject(data.msg)) {
                                console.log(data.msg);
                                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                            } else {
                                LxNotificationService.error(data.msg);
                            }
                        }
                    }, function (err) {
                        console.log(err);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                    });
            }
        });
    };

});