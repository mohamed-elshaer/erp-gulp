app.controller("transactionController", [
  "$scope",
  "transactions",
  "accounts",
  "Translate",
  "$rootScope",
  "$state",
  "Helpers",
  "$stateParams",
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
    Excel,
    $timeout
  ) {
    $rootScope.lang = localStorage.lang;
    $scope.Translate = Translate;
    $scope.transactionLst = [];
    $scope.transactionDetails = [];
    $scope.listChildAccounts = [];
    $scope.currentObj = {};
    $scope.currentObj.transactionDate = new Date();
    $scope.init = function () {
      transactions
        .getAllTransactions()
        .then(function (res) {
          $scope.transactionLst = res.data;
        })
        .then(function () {
          accounts.GetAccountForTransaction().then(function (res) {
            $scope.listChildAccounts = res.data;
            console.log($scope.listChildAccounts);
          });
        });
    };
    $scope.init();
    $scope.addAccountDetails = function (_o) {
      _o.credit = 0;
      _o.debit = 0;
      $scope.transactionDetails.push(angular.copy(_o));
    };
    $scope.remove = function (_obj) {
      var indx = $scope.transactionDetails.indexOf(_obj);
      $scope.transactionDetails.splice(indx, 1);
    };
    $scope.getTotal = function (_type) {
      var totalCredit = 0;
      var totalDebit = 0;

      angular.forEach($scope.transactionDetails, function (el) {
        if (el && el.credit) {
          totalCredit += el.credit;
        }
        if (el && el.debit) {
          totalDebit += el.debit;
        }
      });
      if (_type == "credit") {
        return totalCredit;
      } else {
        return totalDebit;
      }
    };
    $scope.filterbyDate = function (_obj) {
      transactions.GetTransactionByDate(_obj).then(function (res) {
        $scope.transactionLst = res.data;
      });
    };
    $scope.filldata = function (data) {
      // $('#transactionModal').modal('show');
      transactions.getTax(data.id).then(function (res) {
        Helpers.showToaster(res.data.message);
        $scope.transactionObj = res.data;
      });
      $scope.$applyAsync();
    };
    $scope.addTransaction = function (data) {
      var req = {
        refrenceId: data.refrenceId,
        transactionDate: data.transactionDate,
        description: data.description,
        // Debit: $scope.getTotal('Debit'),
        // Credit: $scope.getTotal('Credit'),
        transactionDetailsViewModels: $scope.transactionDetails,
      };
      transactions.addTransaction(req).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          //   $('#transactionModal').modal('hide');
          $scope.init();
          $scope.transactionDetails = [];
          $scope.currentObj = {};
        },
        (_ex) => {
          Helpers.showErrorMessage(_ex.data.message);
        }
      );
    };
    $scope.exportToExcel = function (_tableId) {
      // ex: '#my-table'
      Helpers.ShowLoader();
      $scope.hideLastColumn = true;
      $timeout(function () {
        $scope.exportHref = Excel.tableToExcel(_tableId, "export");
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
              normal: "DroidKufi-Regular.ttf",
              bold: "DroidKufi-Regular.ttf",
              italics: "DroidKufi-Regular.ttf",
              bolditalics: "DroidKufi-Regular.ttf",
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
              font: "DroidKufi",
            },
          };
          pdfMake.createPdf(docDefinition).download("export.pdf");
          $scope.hideLastColumn = false;
          $scope.hideLastTop = true;
          $scope.perPageCount = 20;
        },
      });
    };
    $scope.print = function () {
      var divContents = document.getElementById("printDiv").innerHTML;
      console.log(divContents);
      var printWindow = window.open("", "", "height=1000,width=1000");
      printWindow.document.write("<html><head><title></title>");
      printWindow.document.write(
        '<link rel="stylesheet" href="../../css/bootstrap.min.css">'
      );
      printWindow.document.write("</head><body>");
      printWindow.document.write(divContents);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();
      printWindow.onafterprint = printWindow.close;
      setTimeout(() => {
        printWindow.print();
      }, 2000);
      return true;
    };
  },
]);
