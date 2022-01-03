app.controller("reportsController", [
  "$scope",
  "$rootScope",
  "$state",
  "SSRS",
  "company",
  "accounts",
  "Translate",
  "$timeout",
  "$http",
  "userProfile",
  "$filter",
  "company",
  "Helpers",
  "API",
  function (
    $scope,
    $rootScope,
    $state,
    SSRS,
    company,
    accounts,
    Translate,
    $timeout,
    $http,
    userProfile,
    $filter,
    company,
    Helpers,
    API
  ) {
    $scope.Translate = Translate;
    $scope.perPageCount = 20;
    $scope.reports = [];
    $scope.lstAccount = [];
    $scope.tableView = [];
    $scope.listChildAccounts = [];
    $scope.expenseTypes = [];
    $scope.revenueTypes = [];
    $scope.allAccount = [];
    $scope.updatedreports = [];
    $scope.showPanel = false;
    $scope.todayDate = new Date();
    $scope.todayDate1 = new Date();
    $scope.report;

    $scope.filter = {
      customerId: false,
      paymentTypeId: false,
      currencyId: false,
      storeId: false,
      userId: false,
    };
    $scope.reset = function () {
      $scope.filter = {
        customerId: false,
        paymentTypeId: false,
        currencyId: false,
        storeId: false,
        userId: false,
      };
      $scope.calcfilter = 0;
    };
    $scope.calcfilter = 0;
    $scope.getchange = function () {
      $scope.calcfilter = 0;
      for (const property in $scope.filter) {
        if ($scope.filter[property] == true) {
          $scope.calcfilter += 1;
        }
      }

      console.log($scope.calcfilter);
    };

    $scope.done = false;
    $scope.load = function () {
      company.getbranchesbyuserIdReq().then(function (res) {
        $scope.branchForUser = res.data;
      });
      accounts
        .getaccountReq()
        .then(function (res) {
          $scope.allAccount = res.data;
        })
        .then(function () {
          var req = {
            url:
              "Report/AllEndPoints" + "/" + $scope.defaultObj.branch.branchId,
            method: "get",
          };
          API.execute(req).then(function (_res) {
            if (_res.status == 200) {
              $scope.lookups = _res.data;

              $scope.lookups.push({
                key: "branch",
                value: $scope.branchForUser,
              });
              $scope.lookups.push({
                key: "allAcounts",
                value: $scope.allAccount,
              });

              $scope.done = true;
              console.log($scope.lookups);
            } else {
              Helpers.ShowError(Translate[$rootScope.lang].MSG_WENT_WRONG);
            }
          });
        });
    };
    $scope.getReports = function () {
      $http.get("reports.json").success(function (data) {
        $scope.reports = data;
        $scope.updatedreports.Supplier = data.Supplier;
        $scope.updatedreports.accounts = data.accounts;
        $scope.updatedreports.customers = data.customers;
        $scope.updatedreports.items = data.items;
        $scope.updatedreports.purchase = data.purchase;
        $scope.updatedreports.sales = data.sales;
        $scope.updatedreports.Supplier = $scope.updatedreports.Supplier.filter(
          function (_item) {
            return Helpers.CheckPermission(_item.Perm);
          }
        );
        $scope.updatedreports.accounts = $scope.updatedreports.accounts.filter(
          function (_item) {
            return Helpers.CheckPermission(_item.Perm);
          }
        );
        $scope.updatedreports.customers =
          $scope.updatedreports.customers.filter(function (_item) {
            return Helpers.CheckPermission(_item.Perm);
          });
        $scope.updatedreports.items = $scope.updatedreports.items.filter(
          function (_item) {
            return Helpers.CheckPermission(_item.Perm);
          }
        );
        $scope.updatedreports.purchase = $scope.updatedreports.purchase.filter(
          function (_item) {
            return Helpers.CheckPermission(_item.Perm);
          }
        );
        $scope.updatedreports.sales = $scope.updatedreports.sales.filter(
          function (_item) {
            return Helpers.CheckPermission(_item.Perm);
          }
        );
        $scope.reports.Supplier = $scope.updatedreports.Supplier;
        $scope.reports.accounts = $scope.updatedreports.accounts;
        $scope.reports.customers = $scope.updatedreports.customers;
        $scope.reports.items = $scope.updatedreports.items;
        $scope.reports.purchase = $scope.updatedreports.purchase;
        $scope.reports.sales = $scope.updatedreports.sales;
      });
    };
    $scope.getReports();
    $scope.getLookup = function (i) {
      if ($scope.done == true) {
        return $scope.lookups[i].value;
      }
    };
    $scope.setReport = function (r) {
      for (let i = 0; i < r.parametars.length; i++) {
        const element = r.parametars[i].name;
        if (element == "branchId") {
          r.parametars[i].default = $scope.defaultObj.branch.branchId;
        }
      }
      $scope.report = r;
      $scope.load();
    };

    $scope.loadReport = function () {
      var frm = document.getElementById("repFrame");
      var urlParams = "?";
      $scope.report.parametars.forEach((element) => {
        var i = $scope.report.parametars.indexOf(element);
        var Check = document.getElementById("txtDate" + i);
        if (Check != null && $scope.report.parametars[i].type == "date") {
          element.default = $filter("date")(element.default, "M/d/yyyy");
          $scope.report.parametars[i].default = element.default;
        }
        urlParams +=
          element.name + "=" + $scope.report.parametars[i].default + "&";
        $scope.$applyAsync();
      });
      var lastparams = urlParams.slice(0, -1);
      $timeout(function () {
        window.open(SSRS.url + $scope.report.link + lastparams);
      }, 500);
    };
  },
]);
