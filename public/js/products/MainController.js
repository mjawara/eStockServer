/** Main Controller **/
App.controller('MainController', function ($scope, MainService, LxNotificationService, LxDialogService) {

    $scope.getList = function () {

        MainService.getList()
            .then(function (data) {
                if (data.ok) {
                    $scope.products = data.rows;
                } else {
                    if (angular.isObject(data.msg)) {
                        console.log(data.msg);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                    } else {
                        LxNotificationService.error(data.msg);
                    }
                }
            }, function (err) {
                LxNotificationService.error(err);
            });
    };

    // Get product list
    $scope.getList();

    $scope.showModal = function () {

        LxDialogService.open('mdlNew');

    };

    /**
     * Save product
     */
    $scope.save = function () {
        var item = {};
        item.code = $scope.code;
        item.name = $scope.name;
        item.units = $scope.units;
        item.cost = $scope.cost;
        item.price = $scope.price;
        item.stdcode = $scope.stdcode;

        console.log(item);

        if (!item.code || !item.name || !item.code || !item.cost) {
            LxNotificationService.error('ข้อมูลไม่สมบูรณ์ กรุณาตรวจสอบ');
        } else if (!angular.isNumber(item.cost) || !angular.isNumber(item.price)) {
            LxNotificationService.error('กรุณาระบุราคาซื้อ และ ราคาขายเป็นตัวเลขเท่านั้น');
        } else {
            LxNotificationService.confirm('ยืนยันการบันทึก', 'คุณต้องการบันทึกข้อมูล ใช่หรือไม่?', {
                ok: 'ใช่, ฉันต้องการบันทึก',
                cancel: 'ไม่ใช่'
            }, function (res) {
               if (res) {
                   MainService.save(item)
                       .then(function (data) {
                           if (data.ok) {
                               LxNotificationService.success('บันทึกข้อมูลเสร็จเรียบร้อยแล้ว');
                               LxDialogService.close('mdlNew');
                           } else {
                               if (angular.isObject(data.msg)) {
                                   console.log(data.msg);
                                   LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                               } else {
                                   LxNotificationService.error(data.msg);
                               }
                           }
                       }, function (err) {
                           console.log(err);
                           LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                       });
               }
            });
        }

    };

    $scope.closingDialog = function () {
        $scope.code = null;
        $scope.name = null;
        $scope.units = null;
        $scope.cost = 0;
        $scope.price = 0;
        $scope.stdcode = null;
    };

});