App.controller('IndexController', function ($scope, IndexService, LxNotificationService) {

    $scope.suppliers = [];

    $scope.getList = function () {
        IndexService.getList()
            .then(function (data) {
                if (data.ok) {
                    $scope.suppliers = data.rows;
                } else {
                    LxNotificationService.error(data.msg);
                }
            }, function (err) {
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
            })
    };

    $scope.doRemove = function (id) {
        LxNotificationService.confirm('กรุณายืนยันข้อมูล', 'คุณต้องการลบรายการนี้ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการลบ',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                IndexService.doRemove(id)
                    .then(function (data) {
                        if (data.ok) {
                            LxNotificationService.success('ลบรายการเสร็จเรียบร้อยแล้ว');
                            $scope.getList();
                        } else {
                            LxNotificationService.error('ไม่สามารถลบรายการได้: ' + data.msg);
                        }
                    }, function (err) {
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                    });
            }
        });
    };
    // Get suppliers
    $scope.getList();

});
