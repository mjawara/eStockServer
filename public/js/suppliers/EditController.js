App.controller('EditController', function ($scope, $routeParams, EditService, LxNotificationService, LxProgressService) {
    var id = $routeParams.id;

    LxProgressService.linear.show('#5fa2db', '#progress');

    EditService.getDetail(id)
        .then(function (data) {
            if (data.ok) {
                $scope.supplier = data.rows;
                LxProgressService.linear.hide();
            } else {
                LxNotificationService.error(data.msg);
                LxProgressService.linear.hide();
            }
        }, function (err) {
            LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
            LxProgressService.linear.hide();
        });

    $scope.doUpdate = function () {
        LxNotificationService.confirm('ยืนยันการแก้ไข', 'คุณต้องการบันทึกการแก้ไขข้อมูล ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการแก้ไข',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                LxProgressService.linear.show('#5fa2db', '#progress');

                EditService.doUpdate($scope.supplier)
                    .then(function (data) {
                        if (data.ok) {
                            LxNotificationService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
                            LxProgressService.linear.hide();
                        } else {
                            LxNotificationService.error(data.msg);
                            LxProgressService.linear.hide();
                        }
                    }, function (err) {
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                        LxProgressService.linear.hide();
                    });
            }
        });
    };

});
