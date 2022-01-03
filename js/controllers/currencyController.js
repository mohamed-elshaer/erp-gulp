app.controller('currencyController', [
    '$scope',
    'currency',
    'Translate',
    '$rootScope',
    '$state',
    'Helpers',
    '$stateParams',
    'Excel',
    '$timeout',
    function(
        $scope,
        currency,
        Translate,
        $rootScope,
        $state,
        Helpers,
        $stateParams,
        Excel,
        $timeout
    ) {
        $rootScope.lang = localStorage.lang;
        $scope.Translate = Translate;
        $scope.currencyLst = [];
        $scope.currencyObj = {};
        $scope.init = function() {
            currency.getAllCurrencies().then(function(res) {
                $scope.currencyLst = res.data;
            });
        };
        $scope.init();
        //reset modal if close 
        $('#sbtn2').on('click', function() {
            $scope.currencyObj = null
            $scope.init();
        });
        $('#sbtn3').on('click', function() {
            $scope.currencyObj = null
            $scope.init();
        });
        $('#close').on('click', function() {
            $scope.currencyObj = null
            $scope.init();
        });
        //end reset modal if close
        $scope.filldata = function(data) {
            $('#currencyModal').modal('show');
            currency.getCurrency(data.id).then(function(res) {
                $scope.currencyObj = res.data;
            });
            $scope.$applyAsync();
            // $scope.currencyObj = $rootScope.data;
        };
        $scope.reseatObj = function() {
            $scope.currencyObj = {};
        }
        $scope.addCurrency = function(data) {
            if (!data.id) {
                currency.addCurrency(data).then(
                    function(res) {
                        $('#currencyModal').modal('hide');


                        Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                        currency.getAllCurrencies().then(function(res) {
                            $scope.currencyLst = res.data;
                        });
                        $scope.currencyObj = null;
                        $scope.init();
                    },
                    (_ex) => {
                        Helpers.showErrorMessage(_ex.data.message);
                    }
                );
            } else {
                currency.updateCurrency(data, data.id).then(function(res) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);
                    $('#currencyModal').modal('hide');
                    $scope.currencyObj = null;

                    $scope.init();
                }, (_ex) => {
                    if (_ex.status == 400)
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_DEFAULTCURRENCYEXIST);
                });
            }
        };
        $scope.update = function(data) {
            currency.updateCurrency(data, data.id).then(function(res) {
                Helpers.showToaster(Translate[$rootScope.lang].MSG_DEFAULTCURRENCYADDED);
                $state.go("menu.dashboard")
            }, (_ex) => {
                if (_ex.status == 400)
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_DEFAULTCURRENCYEXIST);

            })

        }
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