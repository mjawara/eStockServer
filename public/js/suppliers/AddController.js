App.controller('AddController', function ($scope, AddService, LxNotificationService, LxProgressService) {

    $scope.products = [];

    $scope.doSave = function () {
        var data = {};
        data.name = $scope.name;
        data.contact_name = $scope.contact_name;
        data.address = $scope.address;
        data.telephone = $scope.telephone;
        data.fax = $scope.fax;

        LxProgressService.linear.show('#5fa2db', '#progress');

        AddService.doSave(data)
            .then(function (data) {
                if (data.ok) {
                    LxNotificationService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
                    $scope.name = null;
                    $scope.contact_name = null;
                    $scope.address = null;
                    $scope.telephone = null;
                    $scope.fax = null;
                    LxProgressService.linear.hide();
                } else {
                    LxNotificationService.error(data.msg);
                    LxProgressService.linear.hide();
                }

            }, function (err) {
                LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                LxProgressService.linear.hide();
            });

    };

    

});
