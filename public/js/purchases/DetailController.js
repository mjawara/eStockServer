/**
 * Detail Controller
 */
App.controller('DetailController', function ($scope, $routeParams, DetailService, LxNotificationService) {
    var purchaseId = $routeParams.id;

    DetailService.getPurchase(purchaseId)
        .then(function (items) {
            $scope.purchaseCode = items.purchase.code;
            $scope.purchaseDate = moment(items.purchase.purchase_date);
            $scope.supplier_name = items.purchase.supplier_name;
            $scope.contact_name = items.purchase.contact_name;

            $scope.drugs = items.drugs;
        }, function (err) {
            console.log(err);
            LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
        });

});