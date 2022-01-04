app.controller("bankaccountController", [
  "$scope",
  "bank",
  "currency",
  "accounts",
  "Translate",
  "$rootScope",
  "$state",
  "Helpers",
  "$stateParams",
  'Excel',
  '$timeout',
  function (
    $scope,
    bank,
    currency,
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
    $scope.currentObj = {};
    $scope.bankLst = [];
    $scope.currencyLst = [];
    // $scope.defaultCurrancy = {};
    $scope.init = function () {
      bank
        .getAllBanks()
        .then(function (res) {
          $scope.bankLst = res.data;
        })
        .then(
          function () {
            currency.getAllCurrencies().then(function (res) {
              $scope.currencyLst = res.data;
              $scope.defaultCurrancy = $scope.currencyLst.filter(function (
                _obj
              ) {
                return _obj.default === true;
              });
              if ($scope.defaultCurrancy.length > 0) {
                $scope.currentObj.currencyId = $scope.defaultCurrancy[0].id;
              }
            });
          },
          (_ex) => {
            if (_ex.status == 400) {
              Helpers.showErrorMessage(_ex.data.message);
            } else if (_ex.status == 403) {
              Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            }
          }
        );
      bank.getBankAccountsByBranch().then(function (res) {
        $scope.bankAccountLst = res.data;
      });
    };
    $scope.init();
    $scope.addbank = function (data) {
      bank.addBank(data).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          bank.getAllBanks().then(function (res) {
            $scope.bankLst = res.data;
          });
        },
        (_ex) => {
          if (_ex.status == 400) {
            Helpers.showErrorMessage(_ex.data.message);
          } else if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
          }
        }
      );
    };
    $scope.typesLst = [
      {
        id: 1,
        name: "جاري",
      },
      {
        id: 1,
        name: "توفير",
      },
      {
        id: 1,
        name: "وديعه",
      },
    ];
    $scope.addBankAccount = function (data) {
      bank.addBankAccount(data).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          $state.go("menu.bankaccount");
        },
        (_ex) => {
          Helpers.showErrorMessage(_ex.data.message);
        }
      );
    };

    $scope.filldata = function (data) {
      $rootScope.editBankAccount = {
        id: data.id,
        bankId: data.bank.id,
        bankAccountNumber: data.bankAccountNumber,
        bankAccountName: data.bankAccountName,
        bankAccountType: data.bankAccountType,
        currencyId: data.currency.id,
      };

      $state.go("menu.editBankAccount");
    };
    $scope.updateBankAccount = function (data) {
      bank.updateBankAccount(data, data.id).then(
        function (res) {
          Helpers.showToaster(
            Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY
          );
          $state.go("menu.bankaccount");
        },
        (_ex) => {
          if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $state.go("login");
          }
        }
      );
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
