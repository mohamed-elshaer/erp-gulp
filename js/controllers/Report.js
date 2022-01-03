app.controller("Report", [
  "$scope",
  "ReportService",
  "$timeout",
  function ($scope, ReportService, $timeout) {
    $scope.init = function () {
      document.getElementById("myIFrame").contentWindow.document.location.href =
        ReportService.getPropertysupplierinvoice();

        document.getElementById("myIFrame").contentWindow.document.location.href =
        ReportService.getPropertycollectMoney();

        document.getElementById("myIFrame").contentWindow.document.location.href =
        ReportService.getPropertyLstcollectMoney();
        if(  ReportService.getPropertyPayMoney!=null)

        document.getElementById("myIFrame").contentWindow.document.location.href =
        ReportService.getPropertyPayMoney();
        if(  ReportService.getPropertyLstpayMoney!=null)

        document.getElementById("myIFrame").contentWindow.document.location.href =
        ReportService.getPropertyLstpayMoney();
    };

    $timeout($scope.init, 10);
  },
]);
