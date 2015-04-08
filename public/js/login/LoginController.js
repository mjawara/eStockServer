App.controller('LoginController', function ($scope, $window, LoginService, LxNotificationService, LxProgressService) {

    $scope.year = null;
    // Get year
    LoginService.getYear()
        .then(function (data) {
            if (data.ok) {
                $scope.years = data.rows;
            }
        }, function (err) {
            LxNotificationService.error(err);
        });

    $scope.doLogin = function () {
        if (!$scope.year) {
            LxNotificationService.error('กรุณาเลือกปีงบประมาณ');
        } else {
            LxProgressService.circular.show('#5fa2db', '#progress');
            var startYear = moment($scope.year.start_date).format('YYYY-MM-DD');
            var endYear = moment($scope.year.end_date).format('YYYY-MM-DD');

            LoginService.doLogin($scope.username, $scope.password, startYear, endYear)
                .then(function (data) {
                    if (data.ok) {
                        $window.location.href = '/';
                    } else {
                        if (angular.isObject(data.msg)) {
                            console.log(data.msg);
                            LxNotificationService.error('Oop!, Error found.');
                            LxProgressService.circular.hide();
                        } else {
                            LxNotificationService.error(data.msg);
                            LxProgressService.circular.hide();
                        }
                    }
                }, function (err) {
                    LxNotificationService.error(err);
                    LxProgressService.circular.hide();
                });
        }

    };

    $scope.setSelected = function (data) {
        $scope.year = data;
    };

});