app.controller("accountcontroller", [
  "$scope",
  "$rootScope",
  "accounts",
  "Translate",
  "$timeout",
  "$state",
  "Helpers",
  "currency",

  function (
    $scope,
    $rootScope,
    accounts,
    Translate,
    $timeout,
    $state,
    Helpers,
    currency,
  ) {
    $scope.init = function () {
      accounts.getaccountReq().then(function (res) {
        $scope.accounts = res.data;
      });
      accounts.getAllAccountLevel().then(function (res) {
        $scope.levels = res.data;
      });
      accounts.getAllAccountNature().then(function (res) {
        $scope.natures = res.data;
      });
      accounts.getAllReportTypes().then(function (res) {
        $scope.reporttypes = res.data;
      });

      $scope.credit = false;
      $scope.debit = false;
      $scope.opening = false;
      currency.GetDefaultCurrency().then(function (res) {
        $scope.currency = res.data;
      });
      //GET();
    };

    $timeout($scope.init, 10);

    $scope.accountform = {
      accountId: 0,
      accountName: "",
      accountNameArabic: "",
      debit: 0,
      credit: 0,
      parentId: null,
      accountLevelId: null,
      accountNatureId: null,
      reportTypeId: null,
    };

    $scope.addopenbalance = function () {
      $scope.opening = true;
    };
    $scope.setaccountnature = function (data) {
      if (data.accountNatureName == "Debit") {
        $scope.debit = true;
      } else {
        $scope.credit = true;
      }
    };

    $scope.addaccount = function (data) {
      accounts
        .AddAccount(data)
        .then(function (res) {
          if (res.status == 201) {
            Helpers.showToaster(
              Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY
            );
            $state.go("menu.tree");
          }
        })
        .catch(function (res) {
          Helpers.showErrorMessage( Translate[$rootScope.lang].MSG_ACCOUNT_EXIST);
        });
    };
  },
]);
