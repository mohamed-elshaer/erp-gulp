app.controller("transactionsReportController", [
  "$scope",
  "transactions",
  "accounts",
  "Translate",
  "$rootScope",
  "$state",
  "Helpers",
  "$stateParams",
  "currency",
  "Excel",
  "$timeout",
  function (
    $scope,
    transactions,
    accounts,
    Translate,
    $rootScope,
    $state,
    Helpers,
    $stateParams,
    currency,
    Excel,
    $timeout,
  ) {
    $rootScope.lang = localStorage.lang;
    $scope.Translate = Translate;
    $scope.transactionLst = [];
    $scope.accounttype = [];
    $scope.currentObj = {};
    $scope.init = function () {
      console.log(accounts);
      accounts.getaccountReq().then(function (res) {
        $scope.accounttype = res.data;
      });
      currency.GetDefaultCurrency().then(function (res) {
        $scope.currency = res.data;
      });
    };
    $scope.init();
    $scope.showdata = false;
    $scope.filterbyDate = function (_obj) {
      transactions.GetTransactionByDateAndAccount(_obj).then(function (res) {
        $scope.transactionLst = res.data;
        $scope.showdata = true;
      });
    };
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
            content: [
              {
                image: data,
                width: 500,
              },
            ],
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
    $scope.print = function () {
      var divContents = document.getElementById('printDiv').innerHTML;
      console.log(divContents);
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
      printWindow.print();
      printWindow.onafterprint = printWindow.close;
      return true;
    };
  },
]);
