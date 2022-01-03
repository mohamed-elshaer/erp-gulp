app.controller('inventoryController', ['$scope', 'inventory', 'currency', 'accounts', 'Translate', '$rootScope', '$state', 'Helpers', '$stateParams', 'Excel',
    '$timeout',
    function($scope, inventory, currency, accounts, Translate, $rootScope, $state, Helpers, $stateParams, Excel,
        $timeout) {
        $rootScope.lang = localStorage.lang;
        $scope.Translate = Translate;
        $scope.inventoryLst = [];
        $scope.currentObj = {};
        $scope.accounttype = [];
        $scope.currencies = []
        $scope.editMood = false;
        getInventoryData();
        getCurrencies()

        function getInventoryData() {
            inventory.getAllInventories().then(function(res) {
                $scope.inventoryLst = res.data;
                console.log($scope.inventoryLst);
            }, (_ex) => {
                if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                    $state.go('login')
                }
            });
        }

        function getCurrencies() {
            currency.getAllCurrencies().then(function(res) {
                $scope.currencyLst = res.data;

            });
        }
        $scope.init = function() {
            accounts.getaccountReq().then(function(res) {
                $scope.accounttype = res.data;
                currency.getAllCurrencies().then(function(res) {
                    $scope.currencyLst = res.data;
                    $scope.defaultCurrancy = $scope.currencyLst.filter(function(
                        _obj
                    ) {
                        return _obj.default === true;
                    });
                    if ($scope.defaultCurrancy.length > 0) {
                        $scope.currentObj.currencyId = $scope.defaultCurrancy[0].id;
                    }
                });
            }, (_ex) => {
                if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                    $state.go('login')
                }
            });
        }
        $scope.init();

        $scope.addInventory = function(data) {
            inventory.addInventory(data).then(
                function(res) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                    $scope.init();
                    $scope.currentObj = {};

                    getInventoryData();

                },
                (_ex) => {
                    if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go('login')
                    } else if (_ex.status == 400) {
                        Helpers.showErrorMessage(_ex.data.message);

                    }

                }
            );
        };
        $scope.updateInventory = function(data, id) {
            inventory.updateInventory(data, data.id).then(function(res) {
                Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);
            }, (_ex) => {
                if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                    $state.go('login')
                }
            });
        };
        //fill data function when click edit button to fill form
        $scope.filldata = function(data) {
            $rootScope.editInventory = data;
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
    }
]);