app.controller("SuppliersController", [
    "$scope",
    "supplier",
    "Translate",
    "$rootScope",
    "$state",
    "Helpers",
    "$timeout",
    "Excel",
    "$stateParams",
    function($scope, supplier, Translate, $rootScope, $state, Helpers, $timeout, Excel, $stateParams) {
        $scope.supplierData = [];
        $rootScope.lang = localStorage.lang;
        $scope.Translate = Translate;
        getSupplierData()

        function getSupplierData() {
            supplier.getAllSuppliers().then(function(res) {
                $scope.supplierData = res.data;
            }, (_ex) => {
                if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                    $state.go('login')
                }
            });
        }

        $scope.addSupplier = function(data) {
            supplier.addSupplier(data).then(function(res) {
                Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                $state.go("menu.suppliers");
            }, (_ex) => {
                if (_ex.status == 400) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_SUPPLIEREXIST);
                } else if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);

                }
            })

        }
        $scope.filldata = function(data) {
            $rootScope.editSupplier = {
                id: data.id,
                supplierName: data.supplierName,
                email: data.email,
                fax: data.fax,
                phoneNumber: data.phoneNumber,
                homeMobile: data.homeMobile,
                address: data.address,
                discount: data.discount
            };
            $state.go("menu.editSupplier");
        };
        $scope.updateSupplier = function(data, id) {
            supplier.updateSupplier(data, id).then(function(res) {
                Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);

                $state.go("menu.suppliers");
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
])