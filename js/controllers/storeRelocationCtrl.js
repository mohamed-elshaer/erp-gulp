app.controller('storeRelocationCtrl', [
    'storeRelocation',
    '$scope',
    'item',
    'Translate',
    '$rootScope',
    '$state',
    'Helpers',
    '$stateParams',
    'Excel',
    '$timeout',
    function(
        storeRelocation,
        $scope,
        item,
        Translate,
        $rootScope,
        $state,
        Helpers,
        $stateParams,
        Excel,
        $timeout,
    ) {
        $rootScope.lang = localStorage.lang;
        $scope.Translate = Translate;
        $scope.stores = [];
        $scope.producsbystore = [];
        $scope.currentObj = {
            storeIdFrom: null,
            storeIdTo: null,
            productsRelocate: []

        };
        ($scope.addrow = function(data) {
            var a = {
                productId: 0,
                stock: 0,
                outgoingQuantity: 0,
                residual: 0,
            };
            $scope.currentObj.productsRelocate.push(a);

        });
        $scope.removerow = function(row) {
            $scope.currentObj.productsRelocate.pop();

        };
        getallstores();

        function getallstores() {
            item.getallstoreReq().then(function(res) {
                $scope.stores = res.data;
            });
        }
        $scope.getproductbtstore = function(data) {
            item.getallproductByStoreId(data.id).then(function(res) {
                $scope.producsbystore = res.data;
            });
        };
        $scope.stock = function(id, i) {
            item.getProductById(id).then(function(res) {
                $scope.currentObj.productsRelocate[i].stock =
                    res.data.stock;

                console.log($scope.currentObj.productsRelocate[i].stock);
            });
        }

        $scope.addRelocation = function(data) {
            storeRelocation.addStoreRelocation(data).then(function() {
                Helpers.showToaster(Translate[$rootScope.lang].MSG_RELOCATE_SUCCESSFULLY);
                $scope.currentObj = null;
            })
        }
        $scope.filterbyStore = function(id1, id2) {
            storeRelocation.getALLStoreRelocationFrmToStore(id1, id2).then(function(res) {
                $scope.relocateStoreLst = res.data
                console.log($scope.relocateStoreLst);
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