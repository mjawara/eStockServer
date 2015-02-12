App.controller('EditController', function ($scope, $routeParams, $location,
    EditService, LxNotificationService) {

    $scope.id = $routeParams.id;

    $scope.get = function (id) {
        EditService.get($scope.id)
            .then(function (data) {
                if (data.ok) {
                    $scope.client = data.rows;
                } else {
                    if (angular.isObject(data.msg)) {
                        console.log(data.msg);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                    } else {
                        LxNotificationService.error(data.msg);
                    }
                }
            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
            });
    };

    $scope.update = function () {

        LxNotificationService.confirm('ยืนยันการแก้ไข', 'คุณต้องการแก้ไขข้อมูล ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการแก้ไข',
            cancel: 'ไม่ใช่'
        }, function (resp) {
            if (resp) {
                EditService.update($scope.client)
                    .then(function (data) {
                        if (data.ok) {
                            $location.path('/');
                        } else {
                            if (angular.isObject(data.msg)) {
                                console.log(data.msg);
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

    $scope.get();

});
