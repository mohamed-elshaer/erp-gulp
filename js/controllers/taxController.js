app.controller('taxController', [
    '$scope',
    'tax',
    'Translate',
    '$rootScope',
    '$state',
    'Helpers',
    '$stateParams',
    '$timeout',
    'Excel',
    function(
        $scope,
        tax,
        Translate,
        $rootScope,
        $state,
        Helpers,
        $stateParams,
        $timeout,
        Excel,
    ) {
        $rootScope.lang = localStorage.lang;
        $scope.Translate = Translate;
        $scope.taxLst = [];
        $scope.taxObj = {};
        $scope.init = function() {
            tax.getAllTaxes().then(function(res) {
                $scope.taxLst = res.data;
            });
        };
        //reset modal if close 
        $('#sbtn2').on('click', function() {
            $scope.taxObj = null
            $scope.init();
        });
        $('#sbtn3').on('click', function() {
            $scope.taxObj = null
            $scope.init();
        });
        $('#close').on('click', function() {
            $scope.taxObj = null
            $scope.init();
        });
        //end reset modal if close
        $scope.init();
        $scope.filldata = function(data) {
            $('#taxModal').modal('show');
            tax.getTax(data.id).then(function(res) {

                $scope.taxObj = res.data;
            });
            $scope.$applyAsync();
        };
        $scope.addTax = function(data) {
            if (!data.id) {
                tax.addTax(data).then(
                    function(res) {
                        Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                        $('#taxModal').modal('hide');
                        $scope.taxObj = null
                        $scope.init();
                    },
                    (_ex) => {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_TAXEXIST);
                    }
                );
            } else {
                tax.updateTax(data, data.id).then(function(res) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);
                    $('#taxModal').modal('hide');
                    $scope.taxObj = null

                    $scope.init();
                });
            }
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