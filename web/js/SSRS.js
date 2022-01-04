app.factory("SSRS", [
  "$http",
  "$rootScope",
  "$state",
  "Helpers",
  function ($http, $rootScope, $state, Helpers) {
    var _url = "https://reports.code-iss.com:443/Report/";
    return {
      name: "SSRS",
      url: _url,
      print: function (_report) {
        var url = _url + _report;
        var p = window.open(
          url,
          "_blank",
          "location=yes,height=1000,width=1000,scrollbars=yes,status=yes"
        );
        p.print();
      },
      run: function (_report) {
        var url = _url + _report;
        w = window.open(
          url,
          "_blank",
          "location=yes,height=1000,width=1000,scrollbars=yes,status=yes"
        );
        w.print();
      },
    };
  },
]);
