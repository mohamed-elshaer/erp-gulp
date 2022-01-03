app.controller('CustomersController', [
    '$scope',
    'customer',
    'Translate',
    '$rootScope',
    '$state',
    'Helpers',
    '$stateParams',
    'Excel',
    '$timeout',
    function(
        $scope,
        customer,
        Translate,
        $rootScope,
        $state,
        Helpers,
        $stateParams,
        Excel,
        $timeout
    ) {
        $scope.customerData = [];
        $scope.customerForm = {};
        $scope.perPageCount = 20;
        $rootScope.lang = localStorage.lang;
        $scope.Translate = Translate;
        getCustomerData();

        function getCustomerData() {
            customer.getAllCustomers().then(
                function(res) {
                    $scope.customerData = res.data;
                    console.log($scope.customerData);
                },
                (_ex) => {
                    if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go('login');
                    }
                }
            );
        }

        $scope.addCustomer = function(data) {
            customer.addCustomer(data).then(
                function(res) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                    $state.go('menu.customers');
                },
                (_ex) => {
                    if (_ex.status == 400) {
                        Helpers.showErrorMessage(
                            Translate[$rootScope.lang].MSG_CUSTOMEREXIST
                        );
                    } else if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go('login');
                    }
                }
            );
        };
        $scope.updateCustomer = function(data) {
            customer.updateCustomer(data, data.id).then(
                function(res) {
                    Helpers.showToaster(
                        Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY
                    );
                    $state.go('menu.customers');
                },
                (_ex) => {
                    if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $rootScope.logOut();
                    }
                }
            );
        };
        $scope.filldata = function(data) {
            $rootScope.editCustomer = data;
            $state.go('menu.editCustomer');
            // $scope.customerForm = $rootScope.editCustomer;
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