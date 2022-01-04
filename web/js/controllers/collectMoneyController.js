app.controller("collectMoneyController", [
    "$scope",
    "collectMoney",
    "ReportService",
    "company",
    "currency",
    "accounts",
    "Translate",
    "$rootScope",
    "$state",
    "Helpers",
    "$stateParams",
    "$timeout",
    "Excel",
    function (
        $scope,
        collectMoney,
        ReportService,
        company,
        currency,
        accounts,
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
        $scope.currentObj = {};
        $scope.accounttype = [];
        $scope.currencyLst = [];
        $scope.currentObj.date = new Date();
        $scope.init = function () {
            accounts
                .getallinvandbankacc()
                .then(function (res) {
                    $scope.accounttype = res.data;
                    $scope.accounttype.forEach((element) => {
                        element.groupby = element.accountParent.accountNameArabic;
                    });
                })
                .then(
                    function () {
                        currency.getAllCurrencies().then(function (res) {
                            $scope.currencyLst = res.data;
                            currency.getAllCurrencies().then(function(res) {
                                $scope.currencyLst = res.data;
                                currency.GetDefaultCurrency().then(function(res) {
                                    $scope.currentObj.currencyId = res.data.id;
                                    $scope.currentfactor=res.data.factor
                                  
                                });
                            
                            });
                        });
                    },
                    (_ex) => {
                        if (_ex.status == 400) {
                            Helpers.showErrorMessage(_ex.data.message);
                        } else if (_ex.status == 403) {
                            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                            $state.go("login");
                        }
                    }
                );
            accounts.getaccountReq().then(function (res) {
                $scope.allaccounttype = res.data;
                $scope.allaccounttype.forEach((element) => {
                    if (element.accountParent != null) {
                        element.groupby = element.accountParent.accountNameArabic;
                    }
                });
            });
        };
        $scope.init();
        $scope.setFromAccBalance = function (_i) {
            $scope.currentObj.fromAccountBalance = _i.balance;
        };
        $scope.setToAccBalance = function (_i) {
            $scope.currentObj.toAccountBalance = _i.balance;
        };
        $scope.getFactory = function (_i) {
            $scope.currentObj.factorWithPound = 1 * _i.factor;
            $scope.currentObj.factorWithDolar =
                _i.factor / $scope.currentObj.factorWithPound;
        };
        $scope.addCollectMoney = function (data) {
            collectMoney.addCollectMoney(data).then(
                function (res) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                    $scope.init();
                    $scope.currentObj = {};
                },
                (_ex) => {
                    Helpers.showErrorMessage(_ex.data.message);
                }
            );
        };
        $scope.addCollectMoneyAndPrint = function(data) {
            collectMoney.addCollectMoney(data).then(
                function(res) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                    $scope.currentObj = {};
                    

                    var mywindow = window.open(`https://reports.code-iss.com/Report/CollectMoney?payMoneyId=${res.data}&branchId=${$scope.branchId}`,'_blank');
                    mywindow.focus(); // necessary for IE >= 10*/
                  
                    $scope.init();
                },
                (_ex) => {
                    if (_ex.status == 400) {
                        Helpers.showErrorMessage(_ex.data.message);
                    } else if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go("login");
                    }
                }
            );
        };
        $scope.updatecurrency = function () {
            $scope.currencydata.factor = $scope.currentfactor;
            currency
                .updateCurrency($scope.currencydata,  $scope.currencydata.id)
                .then(function (res) { });
        };
        $scope.calccurrency = function (data) {
            $scope.currencydata = data;
            $scope.currentfactor = data.factor;
        };
        GetDefaultCurrency();

        function GetDefaultCurrency() {
            currency.GetDefaultCurrency().then(function (res) {
                $scope.defaultCurrency = res.data;
            });
        }
        getCollectMoney();

        function getCollectMoney() {
            collectMoney.getCollectMoney().then(function (res) {
                $scope.LstCollectMoney = res.data;
            });
        }
        $scope.exportToExcel = function (_tableId) {
            // ex: '#my-table'
            Helpers.ShowLoader();
            $scope.hideLastColumn = true;
            $timeout(function () {
                $scope.exportHref = Excel.tableToExcel(_tableId, 'export');
                // location.href = $scope.exportHref;
                Helpers.HideLoader();
                $scope.hideLastColumn = false;
                $scope.$applyAsync();
            }, 500); // trigger download
        };
        $scope.exportToPdf = function (_tableId) {
            $scope.perPageCount = 100;
            $scope.hideLastColumn = true;
            $scope.hideLastTop = false;
            html2canvas(document.getElementById(_tableId), {
                onrendered: function (canvas) {
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
                        },],
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
            // company.getbranchesbyuserIdReq().then(function (res) {
            //     $scope.branches = res.data;

            //     for (let index = 0; index < $scope.branches.length; index++) {
            //         if (res.data[index].view) {
            //             $scope.defaultObj.branch = $scope.branches[index]

            //         }
            //         $scope.branchId=$scope.defaultObj.branch.branchId
            //         console.log($scope.defaultObj);
            //         console.log($scope.branchId);
            //     }

            // });
       $scope.doTafqit = function () {
           $scope.tafqite = tafqit($scope.currentObj.amount) + ' ' + $scope.defaultCurrency.currencyNameArabic
       }
        $scope.print = function () {
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
        company.getbranchesbyuserIdReq().then(function (res) {
            $scope.branches = res.data;

            for (let index = 0; index < $scope.branches.length; index++) {
                if (res.data[index].view) {
                    $scope.defaultObj.branch = $scope.branches[index]

                }
                $scope.branchId=$scope.defaultObj.branch.branchId
            }

        });
    },
]);