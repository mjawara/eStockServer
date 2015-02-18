App.controller('IndexController', function ($scope, IndexService, LxNotificationService) {

    $scope.getList = function () {
        IndexService.getList()
            .then(function (rows) {
                $scope.purchases = rows;
            }, function (err) {
                LxNotificationService.error(err);
            });
    };

    /**
     * Get purchases list
     */

    $scope.getList();

    /**
     * Remove purchase
     */

    $scope.doRemove = function (id) {
        LxNotificationService.confirm('ยืนยันการลบรายการ', 'คุณต้องการลบรายการนี้ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการลบ',
            cancel: 'ไม่ใช่'
        }, function (resp) {
            if (resp) {
                IndexService.doRemove(id)
                    .then(function (data) {
                        if (data.ok) {
                            LxNotificationService.success('ลบรายการเสร็จเรียบร้อยแล้ว');
                            $scope.getList();
                        } else {
                            if (angular.isObject(data.msg)) {
                                console.log(data.msg);
                                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                            } else {
                                LxNotificationService.error(data.msg);
                            }
                        }

                    }, function (err) {
                        console.log(err);
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                    });
            }
        });
    };

    /**
     * Import data to stockcard
     */
    $scope.doImport = function (id) {
        LxNotificationService.confirm('ยืนยันการตัดสต๊อก', 'คุณต้องการทำการตัดสต๊อกรายการนี้ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการนำเข้า',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                IndexService.doImport(id)
                    .then(function (data) {
                        if (data.ok) {
                            $scope.getList();
                            LxNotificationService.success('ตัดสต๊อกเสร็จเรียบร้อยแล้ว');
                        } else {
                            if (angular.isObject(data.msg)) {
                                console.log(data.msg);
                                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                            } else {
                                LxNotificationService.error(data.msg);
                            }
                        }
                    }, function (err) {
                        console.log(err);
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                    });
            }
        });
    };
});
