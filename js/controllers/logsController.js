app.controller('logsController', 
['$scope', 'logs', 'Translate', '$rootScope', '$state', 'Helpers', '$stateParams', '$timeout', 'Excel', function($scope, logs, Translate, $rootScope, $state, Helpers, $stateParams, $timeout, Excel) {
    $rootScope.lang = localStorage.lang;
    $scope.Translate = Translate;
    $scope.UserLogs = [];
    $scope.perPageCount = 10

    $rootScope.userrole = JSON.parse(
        window.atob(localStorage.token.split(".")[1])
    ).role;
    getLogs();
    GetLogsSettings();

    logs.LogInterval().then(function(res){
       $scope.logsInterval=res.data;
       console.log(res.data)
    })

function GetLogsSettings(){
    logs.GetLogsSettings().then(function(res){
        $rootScope.intervalValue={
            interval:res.data.interval
        }
      
    })
}
   
    function getLogs() {
        if ($rootScope.userrole == "Admin") {
            logs.getAllLogs().then(function(res) {
                $scope.UserLogs = res.data;
            }, (_ex) => {
                if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                    $state.go('login')
                }
            });
        } else {
            logs.getAllLogsForSuperAdmin().then(function(res) {
                $scope.UserLogsForSuperAdmin = res.data;
            }, (_ex) => {
                if (_ex.status == 403) {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                    $state.go('login')
                }
            });
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

        $scope.updateSuperAdminLogInterval=function(interval){
            logs.updateIntervalForSuperAdmin(interval).then(function(){
                Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);

            })
        }
        $scope.updateAdminLogInterval=function(interval){
            logs.updateIntervalForAdmin(interval).then(function(){
                Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);

            })
        }
    }
}]);