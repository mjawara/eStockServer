/**
 * User Controller
 */
App.controller('UsersController', function ($scope, UsersService, LxNotificationService,
    LxDialogService) {

    $scope.isEdit = false;
    $scope.id = null;

    /**
     * Get users list
     */
    $scope.getList = function () {

        UsersService.all()
            .then(function (data) {
                if (data.ok) {
                    $scope.users = data.rows;
                } else {
                    console.log(data.msg);
                    LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                }
            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
            });

    };

    /**
     * Get users list
     */
    $scope.getList();

    $scope.showModal = function () {

        LxDialogService.open('mdlNew');

    };

    /**
     * Save users
     */
    $scope.save = function () {

        if ($scope.isEdit) {
            if (!$scope.fullname) {
                LxNotificationService.error('กรุณาตรวจสอบข้อมูลให้ถูกต้อง และ ครบถ้วน');
            } else {
                var items = {};
                items.fullname = $scope.fullname;
                items.isAdmin = $scope.isAdmin ? 'Y' : 'N';
                items.isActive = $scope.isActive ? 'Y' : 'N';
                items.id = $scope.id;

                UsersService.update(items)
                    .then(function () {

                        $scope.getList();
                        LxNotificationService.success('ปรับปรุงข้อมูลเสร็จเรียบร้อยแล้ว');
                        LxDialogService.close('mdlNew');

                    }, function (err) {
                        console.log(err);
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                    });
            }
        } else {
            if (!$scope.username || !$scope.fullname || !$scope.password || !$scope.password2) {
                LxNotificationService.error('กรุณาตรวจสอบข้อมูลให้ถูกต้อง และ ครบถ้วน');
            } else {
                if ($scope.password != $scope.password2) {
                    LxNotificationService.error('รหัสผ่านทั้งสองช่องไม่ตรงกัน');
                } else {
                    // do save
                    var items = {};
                    items.fullname = $scope.fullname;
                    items.username = $scope.username;
                    items.isAdmin = $scope.isAdmin ? 'Y' : 'N';
                    items.isActive = $scope.isActive ? 'Y' : 'N';
                    items.password = $scope.password;

                    UsersService.save(items)
                        .then(function (data) {
                            if (data.ok) {
                                $scope.getList();
                                LxNotificationService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
                                LxDialogService.close('mdlNew');
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
            }
        }


    };

    /**
     * Remove user
     */
    $scope.remove = function (id, fullname) {
        LxNotificationService.confirm('ยืนยันการลบ', 'คุณต้องการลบผู้ใช้ [' + fullname + '] ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการลบ',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                UsersService.remove(id)
                    .then(function (data) {
                        if (data.ok) {
                            $scope.getList();
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

    /**
     * Show edit user
     */
    $scope.edit = function (item) {

        $scope.fullname = item.fullname;
        $scope.username = item.username;
        $scope.isAdmin = item.is_admin == 'Y' ? true : false;
        $scope.isActive = item.is_active == 'Y' ? true : false;
        $scope.isEdit = true;
        $scope.id = item.id;
        // Show modal
        LxDialogService.open('mdlNew');

    };

    /**
     * Clear data when dialog was closing
     */
    $scope.closingDialog = function () {
        $scope.fullname = null;
        $scope.username = null;
        $scope.isAdmin = false;
        $scope.isActive = false;
        $scope.isEdit = false;
        $scope.password = null;
        $scope.password2 = null;
        $scope.id = null;
    };

});
