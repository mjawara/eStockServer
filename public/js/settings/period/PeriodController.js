/**
 * Year controller
 */

App.controller('PeriodController', function ($scope, PeriodService, LxNotificationService,
    LxDialogService) {

    $scope.id = null;

    $scope.getYearList = function () {

        PeriodService.all()
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

            var promise = null;

            if ($scope.id) {
                promise = PeriodService.update($scope.id, year);
            } else {
                promise = PeriodService.save(year);
            }

            promise.then(function (data) {
                if (data.ok) {
                    if ($scope.id) {
                        var idx = _.findIndex($scope.years, {id: $scope.id});
                        $scope.years[idx].name = $scope.name;
                        $scope.years[idx].start_date = $scope.startDate;
                        $scope.years[idx].end_date = $scope.endDate;
                    } else {
                        $scope.years.push({
                            id: data.id,
                            name: year.n,
                            start_date: year.s,
                            end_date: year.e
                        });
                    }

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
                PeriodService.delete(id)
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

    $scope.edit = function (idx) {

        var year = $scope.years[idx];

        $scope.id = year.id;
        $scope.name = year.name;
        $scope.startDate = moment(year.start_date);
        $scope.endDate = moment(year.end_date);

        LxDialogService.open('mdlNew');

    };

    $scope.closingDialog = function () {
        $scope.name = null;
        $scope.startDate = moment();
        $scope.endDate = moment();
        $scope.id = null;
    };

});
