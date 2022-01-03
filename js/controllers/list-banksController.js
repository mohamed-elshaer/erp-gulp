app.controller('BanksController', ['$scope', 'bank', 'Translate', '$rootScope', '$state', 'Helpers', '$stateParams', 'Excel',
    '$timeout',
    function($scope, bank, Translate, $rootScope, $state, Helpers, $stateParams, Excel,
        $timeout) {
        $rootScope.lang = localStorage.lang;
        $scope.Translate = Translate;
        $scope.bankLst = [];
        $scope.currentObj = {};
        getBankData();

        function getBankData() {
            bank.getAllBanks().then(function(res) {
                $scope.bankLst = res.data;
            }, (_ex) => {
                if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                    $state.go('login')
                }
            });
        }
        $scope.filldata = function(data) {
            $rootScope.editBank = data
        }
        $scope.addbank = function(data) {
            bank.addBank(data).then(
                function(res) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                    getBankData()
                },
                (_ex) => {
                    if (_ex.status == 400) {
                        Helpers.showErrorMessage(_ex.data.message);
                    } else if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go('login')
                    }
                }
            );
        };
        $scope.updatebank = function(data) {
            bank.updateBank(data, data.id).then(function(res) {
                Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);

                $state.go('menu.banks');
            }, (_ex) => {
                if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                    $state.go('login')
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
            $scope.hideLastColumn = false;

            var divContents = document.getElementById('printDiv').innerHTML;
            console.log(divContents);
            var printWindow = window.open('', '', 'height=600,width=600');
            printWindow.document.write('<html><head><title></title>');
            printWindow.document.write(
                '<link rel="stylesheet" href="../../theme/assets/css/dashlite.css">'
            );
            printWindow.document.write('</head><body dir="rtl">');
            printWindow.document.write(divContents);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => { printWindow.print() }, 2000)
            $scope.hideLastColumn = true;

            return true;
        };
    }
]);