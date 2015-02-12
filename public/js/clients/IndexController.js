App.controller('IndexController', function ($scope, IndexService, LxNotificationService, LxProgressService) {

    $scope.all = function () {

        LxProgressService.linear.show('#5fa2db', '#progress');

        IndexService.all()
            .then(function (data) {
                if (data.ok) {
                    $scope.clients = data.rows;
                    LxProgressService.linear.hide();
                } else {
                    if (angular.isObject(data.msg)) {
                        console.log(err);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                    } else {
                        LxNotificationService.error(data.msg);
                    }
                }

            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                LxProgressService.linear.hide();
            });

    };

    // Deactive client
    $scope.setActive = function (id, status) {
        LxNotificationService.confirm('ยืนยันการแก้ไขสิทธิ', 'คุณต้องการแก้ไขสิทธิการใช้งานของหน่วยงานนี้ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการแก้ไข',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                IndexService.setActive(id, status)
                    .then(function (data) {
                        if (data.ok) {
                            LxNotificationService.success('แก้ไขรายการเสร็จเรียบร้อยแล้ว');
                            $scope.all();
                        } else {
                            if (angular.isObject(data.msg)) {
                                console.log(err);
                                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                            } else {
                                LxNotificationService.error(data.msg);
                            }
                        }

                    }, function (err) {
                        console.log(err);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                    });
            }
        });
    };

    $scope.remove = function (id) {
        LxNotificationService.confirm('ยืนยันการแก้ไขสิทธิ', 'คุณต้องการแก้ไขสิทธิการใช้งานของหน่วยงานนี้ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการแก้ไข',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                IndexService.remove(id)
                    .then(function (data) {
                        if (data.ok) {
                            LxNotificationService.success('ลบรายการเสร็จเรียบร้อยแล้ว');
                            $scope.all();
                        } else {
                            if (angular.isObject(data.msg)) {
                                console.log(err);
                                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                            } else {
                                LxNotificationService.error(data.msg);
                            }
                        }

                    }, function (err) {
                        console.log(err);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                    });
            }
        });

    };

    // Get clients list
    $scope.all();

});
