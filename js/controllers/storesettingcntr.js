app.controller("storesettingcntr", [
    "$scope",
    "transactions",
    "company",
    "Translate",
    "$rootScope",
    "$state",
    "Helpers",
    "$stateParams",
    "$timeout",
    "Excel",
    function(
        $scope,
        transactions,
        company,
        Translate,
        $rootScope,
        $state,
        Helpers,
        $stateParams,
        $timeout,
        Excel
    ) {
        $rootScope.lang = localStorage.lang;
        $scope.Translate = Translate;

        $scope.init = function() {
            getpricepolicy();
            getsellpricesetting();
        };
        $timeout($scope.init, 10);
        $scope.init();

        function getpricepolicy() {
            company.GetPricePolicy().then(function(res) {
                $scope.mypricepolicy = res.data;
                console.log(res.data);
            });
        }

        function getsellpricesetting() {
            company.GetSellPriceSetting().then(function(res) {
                $scope.mysellpricesetting = res.data;
                console.log(res.data);
            });
        }
        $scope.addpricesetting = function(data) {
            company.AddPricePolicy(data).then(function(res) {
                if (res.status == 201) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                }
            });
        };

        $scope.addsellsetting = function(data) {
            company.AddSellPriceSetting(data).then(function(res) {
                if (res.status == 201) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                }
            });
        };

        $scope.filldatapolicy = function(data) {
            $scope.editPricePolicy = {
                id: data.id,
                first: data.first,
                medium: data.medium,
                last: data.last,
            };
        };
        $scope.filldatasell = function(data) {
            $scope.editsellprice = {
                id: data.id,
                amount: data.amount,
                percent: data.percent,
            };
        };

        $scope.updatesellprice = function(data) {
            company.UpdateSellPriceSetting(data).then(function(res) {
                if (res.status == 200) {
                    getsellpricesetting();
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                }
            });
        };

        $scope.updatepricepolicy = function(data) {
            company.UpdatePricePolicy(data).then(function(res) {
                if (res.status == 200) {
                    getpricepolicy();
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                }
            });
        };
        $scope.exportToExcel = function(_tableId) {
            // ex: '#my-table'
            Helpers.ShowLoader();
            $scope.hideLastColumn = true;
            $timeout(function() {
                $scope.exportHref = Excel.tableToExcel(_tableId, 'export');
                // location.href = $scope.exportHref;
                Helpers.HideLoader();
                $scope.hideLastColumn = false;
                $scope.$applyAsync();
            }, 500); // trigger download
        };
        $scope.exportToPdf = function(_tableId) {
            $scope.perPageCount = 100;
            $scope.hideLastColumn = true;
            $scope.hideLastTop = false;
            html2canvas(document.getElementById(_tableId), {
                onrendered: function(canvas) {
                    pdfMake.fonts = {
                        DroidKufi: {
                            normal: 'DroidKufi-Regular.ttf',
                            bold: 'DroidKufi-Regular.ttf',
                            italics: 'DroidKufi-Regular.ttf',
                            bolditalics: 'DroidKufi-Regular.ttf',
                        },
                    };
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500,
                        }, ],
                        defaultStyle: {
                            font: 'DroidKufi',
                        },
                    };
                    pdfMake.createPdf(docDefinition).download('export.pdf');
                    $scope.hideLastColumn = false;
                    $scope.hideLastTop = true;
                    $scope.perPageCount = 20;
                },
            });
        };
        $scope.print = function() {
            var divContents = document.getElementById('printDiv').innerHTML;
            console.log(divContents);
            var printWindow = window.open('', '', 'height=1000,width=1000');
            printWindow.document.write('<html><head><title></title>');
            printWindow.document.write(
                '<link rel="stylesheet" href="../../css/bootstrap.min.css">'
            );
            printWindow.document.write('</head><body dir="rtl">');
            printWindow.document.write(divContents);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.onafterprint = printWindow.close;
            setTimeout(() => { printWindow.print() }, 2000)
            return true;
        };
    },
]);