App.controller('MainController', function ($scope, MainService) {

    $scope.chartTopTenConfig = {
        options: {
            chart: {
                type: 'column'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.1,
                borderWidth: 0
            }
        },
        series: [],
        title: {
            text: 'สรุปยอกเบิก/จ่ายสูงสุด'
        },
        xAxis: {
            labels: {
                rotation: -45,
                style: {
                    fontSize: '9px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            categories: [],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'จำนวน'
            }
        },
        loading: false

    };

    MainService.getTopTen()
        .then(function (data) {

            $scope.items = data.rows;

            var qtyIn = [];
            var qtyOut = [];
            _.forEach(data.rows, function (v) {
                $scope.chartTopTenConfig.xAxis.categories.push(v.name);
                qtyIn.push(v.totalIn);
                qtyOut.push(v.totalOut);
            });

            $scope.chartTopTenConfig.series.push({ name: 'รับ', data: qtyIn });
            $scope.chartTopTenConfig.series.push({ name: 'จ่าย', data: qtyOut });

        }, function (err) {
            console.log(err);
        });
});