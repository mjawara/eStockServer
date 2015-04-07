App.controller('CardController', function ($scope, $routeParams, CardService, LxProgressService, LxNotificationService) {

    $scope.code = $routeParams.code;

    $scope.startDate = moment().startOf('month');
    $scope.endDate = moment().endOf('month');

    $scope.doGetCard = function () {

        LxProgressService.linear.show('#5fa2db', '#progress');

        var _startDate = moment($scope.startDate).format('YYYY-MM-DD');
        var _endDate = moment($scope.endDate).format('YYYY-MM-DD');

        CardService.getCard($scope.code, _startDate, _endDate)
            .then(function (data) {
                $scope.drugName = data.detail.name;
                $scope.drugCode = $scope.code;

                $scope.totalQtyIn = 0;
                $scope.totalQtyOut = 0;
                $scope.totalQty = 0;

                if (_.size(data.cards)) {
                    var _products = [];
                    var _currentTotal = 0;

                    _.forEach(data.cards, function (v) {
                        _currentTotal += v.qty_in;
                        _currentTotal -= v.qty_out;
                        $scope.totalQtyIn += v.qty_in;
                        $scope.totalQtyOut += v.qty_out;

                        var obj = {
                            cdate: v.cdate,
                            ccode: v.ccode,
                            hospname: v.hospname,
                            supplier_name: v.supplier_name,
                            qty_in: v.qty_in,
                            qty_out: v.qty_out,
                            currentTotal: _currentTotal
                        };

                        _products.push(obj);
                    });

                    $scope.totalQty = $scope.totalQtyIn - $scope.totalQtyOut;
                    $scope.products = _products;
                    LxProgressService.linear.hide();
                } else {
                    LxNotificationService.error('ไม่พบข้อมูลที่ต้องการ กรุณาระบุช่วงเวลาใหม่');
                    LxProgressService.linear.hide();
                }

            }, function (err) {
                console.log(err);
                LxNotificationService.error('Oop!');
                LxProgressService.linear.hide();
            });

    };

    $scope.doGetCard();

});