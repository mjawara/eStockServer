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
        LxNotificationService.confirm('ยืนยันการลบรายการ', 'คุณต้องการลบรายการนี้ ใช่หรือไม่?', {ok: 'ใช่, ฉันต้องการลบ', cancel: 'ไม่ใช่'}, function (resp) {
            if (resp) {
                IndexService.doRemove(id)
                .then(function () {
                    LxNotificationService.success('ลบรายการเสร็จเรียบร้อยแล้ว');
                    $scope.getList();
                }, function () {
                    LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                });
            }
        });
    };
});
