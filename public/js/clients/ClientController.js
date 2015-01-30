App.controller('ClientController', function($scope, ClientService, LxNotificationService, LxProgressService) {

    $scope.doSave = function() {
        var client = {
            hospcode: $scope.hospcode,
            hospname: $scope.hospname,
            privatekey: $scope.privateKey
        };

        LxProgressService.linear.show('#5fa2db', '#progress');

        ClientService.doSave(client)
            .then(function(data) {
                if (data.ok) {
                    window.location.href = '/clients';
                } else {
                    LxNotificationService.error(data.msg);
                    LxProgressService.linear.hide();
                }

            }, function(err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                LxProgressService.linear.hide();
            })
    };

    $scope.getList = function() {
        LxProgressService.linear.show('#5fa2db', '#progress');

        ClientService.getList()
            .then(function(rows) {
                $scope.clients = rows;
                LxProgressService.linear.hide();
            }, function(err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                LxProgressService.linear.hide();
            });

    };

    // Deactive client
    $scope.active = function(id, status) {
        LxNotificationService.confirm('ยืนยันการแก้ไขสิทธิ', 'คุณต้องการแก้ไขสิทธิการใช้งานของหน่วยงานนี้ ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการแก้ไข',
            cancel: 'ไม่ใช่'
        }, function(res) {
            if (res) {
                ClientService.doActive(id, status)
                    .then(function() {
                        LxNotificationService.success('แก้ไขรายการเสร็จเรียบร้อยแล้ว');
                        $scope.getList();
                    }, function(err) {
                        console.log(err);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                    });
            }
        });
    };

    // Get clients list
    $scope.getList();

});
