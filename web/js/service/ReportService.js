app.service("ReportService", [
  "API",
  function (API) {
    supplierinvoice="First";
    collectMoney="Second";
    collectLstMoney="Third";
    payMoney="Fourth";
    payLstMoney="Fifth";
    return {
      getPropertysupplierinvoice: function () {
        return supplierinvoice;
      },
      getPropertycollectMoney: function () {
        return collectMoney;
      },
      getPropertyLstcollectMoney: function () {
        return collectLstMoney;
      },
      getPropertyPayMoney: function () {
        return payMoney;
      },
      getPropertyLstpayMoney: function () {
        return payLstMoney;
      },
      setPropertysupplierinvoice: function (value) {
        supplierinvoice = `http://desktop-vj3bht9/ReportServer/Pages/ReportViewer.aspx?%2finvsbuying&supId=${value}&rs:embed=true`;
      },
      setPropertycollectMoney: function (value,branchId) {
        collectMoney = `http://desktop-vj3bht9/ReportServer/Pages/ReportViewer.aspx?%2fcollectMoney&payMoneyId=${value}&branchId=${branchId}&rs:embed=true`;
      },
      setPropertyLstcollectMoney: function (branchId) {
        collectLstMoney = `http://desktop-vj3bht9/ReportServer/Pages/ReportViewer.aspx?%2flistCollectMoney&branchId=${branchId}&rs:embed=true`;
      },
      setPropertyPayMoney: function (value,branchId) {
        payMoney = `http://desktop-vj3bht9/ReportServer/Pages/ReportViewer.aspx?%2fpayReceipt&payMoneyId=${value}&branchId=${branchId}&rs:embed=true`;
      },
      setPropertyLstpayMoney: function (branchId) {
        payLstMoney = `http://desktop-vj3bht9/ReportServer/Pages/ReportViewer.aspx?%2flistPayMoney&branchId=${branchId}&rs:embed=true`;
      },
      
    };
  },
]);
