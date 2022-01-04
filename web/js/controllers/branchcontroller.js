app.controller("branchcontroller", [
    "$scope",
    "company",
    "Translate",
    "$timeout",
    "$state",
    "$rootScope",
    "$location",
    "Helpers",
    'Excel',
    '$timeout',
    function(
        $scope,
        company,
        Translate,
        $timeout,
        $state,
        $rootScope,
        $location,
        Helpers,
        Excel,
        $timeout,
    ) {
        // $scope.currencies={}
        $scope.init = function() {
            company.getbranchesbyuserIdReq().then(function(res) {
                $scope.branches = res.data;

            }, (_ex) => {
                if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS)
                    $state.go('login')
                }
            });
            $scope.Translate = Translate;
        };

        $timeout($scope.init);

        $scope.addbranchAfterCompany = function(data) {
            company.addbranchREQ(data).then(function(res) {

                if (res.status == 201 || res.status == 200) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                    $state.go("defaultCurrency");
                }
            }, (_ex) => {
                if (_ex.status == 400) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_BRANCHNAMEEXIST);
                } else if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                    $state.go('login')

                }
            });
        };

        $scope.addbranch = function(data) {
            company.addbranchREQ(data).then(function(res) {

                if (res.status == 201 || res.status == 200) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                    $state.go("menu.branches");
                    $rootScope.getallbranch()
                }
            }, (_ex) => {
                if (_ex.status == 400) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_BRANCHNAMEEXIST);
                } else if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                    $state.go('login')

                }
            });
        };

        $scope.filldata = function(data) {
            $rootScope.editbranch = {
                branchName: data.branchName,
                branchId: data.branchId,
                address: data.address,
                phoneNumber: data.phoneNumber,
                landNumber: data.landNumber,
                email: data.email,
                companyId: data.companyId,
            };
            $state.go("menu.editbranch");
        };

        $scope.updatebranch = function(data) {
            company.updatebranchReq(data).then(function(res) {
                Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY)
                $state.go("menu.branches");
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
            $scope.hideLastColumn = true;
            var divContents = document.getElementById('printDiv').innerHTML;
            var printWindow = window.open('', '', 'height=600,width=600');
            printWindow.document.write('<html><head><title></title>');
            printWindow.document.write(
                '<link rel="stylesheet" href="../../theme/assets/css/theme.css">'
            );
            printWindow.document.write('</head><body dir="rtl">');
            printWindow.document.write(divContents);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => { printWindow.print() }, 2000)
            printWindow.onafterprint = printWindow.close;
            $scope.hideLastColumn = false;
            return true;
        };
    },
]);