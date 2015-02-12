App.controller('NewController', function ($scope, NewService, LxProgressService, LxNotificationService) {

    $scope.doSave = function () {
        var client = {
            hospcode: $scope.hospcode,
            hospname: $scope.hospname,
            privatekey: $scope.privateKey
        };

        LxProgressService.linear.show('#5fa2db', '#progress');

        NewService.doSave(client)
            .then(function (data) {
                if (data.ok) {
                    window.location.href = '/clients';
                } else {
                    if (angular.isObject(data.msg)) {
                        console.log(data.msg);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                    } else {
                        LxNotificationService.error(data.msg);
                        LxProgressService.linear.hide();
                    }

                }

            }, function (err) {
                console.log(err);
                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู log');
                LxProgressService.linear.hide();
            })
    };


});
