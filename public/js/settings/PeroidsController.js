/**
 * Year controller
 */

App.controller('PeroidsController', function ($scope, PeroidsService, LxNotificationService,
    LxDialogService) {

    $scope.getYearList = function () {

        PeroidsService.all()
            .then(function (data) {
                if (data.ok) {
                    $scope.years = data.rows;
                } else {
                    console.log(data.msg);
                    LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                }
            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
            });

    };

    // Get list
    $scope.getYearList();

    $scope.showModal = function () {
        LxDialogService.open('mdlNew');
    };

    $scope.save = function () {

        if (!$scope.name || !$scope.startDate || !$scope.endDate) {
            LxNotificationService.error('กรุณาระบุข้อมูลให้ครบถ้วน');
        } else {
            var year = {};
            year.n = $scope.name;
            year.s = moment($scope.startDate).format('YYYY-MM-DD');
            year.e = moment($scope.endDate).format('YYYY-MM-DD');

            PeroidsService.save(year)
                .then(function (data) {
                    if (data.ok) {
                        $scope.years.push({
                            name: year.n,
                            start_date: year.s,
                            end_date: year.e
                        });
                        LxNotificationService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
                        LxDialogService.close('mdlNew');
                    } else {
                        console.log(data.msg);
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                    }

                }, function (err) {
                    console.log(err);
                    LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                });
        }

    };

    $scope.remove = function (idx, id) {

        LxNotificationService.confirm('ยืนยันการลบรายการ', 'คุณต้องการลบรายการนี้ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการลบ',
            cancel: 'ไม่ใช่'
        }, function (resp) {
            if (resp) {
                PeroidsService.delete(id)
                    .then(function (data) {
                        if (data.ok) {
                            $scope.years.splice(idx, 1); // Remove year
                            LxNotificationService.success('ลบรายการเสร็จเรียบร้อยแล้ว');
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
