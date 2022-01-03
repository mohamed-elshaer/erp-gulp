app.factory("customerInvoice", [
  "API",
  function (API) {
    return {
      AddCustomerinvoiceReq: AddCustomerinvoiceReq,
      GetCustomerinvoices: GetCustomerinvoices,
      GetSellPriceForUnit: GetSellPriceForUnit,
      GetSellPriceForUnitNext: GetSellPriceForUnitNext,
      AddReturnsInvoiceSelling: AddReturnsInvoiceSelling,
    };

    
   

    function AddCustomerinvoiceReq(data) {
      var req = {
        url: "CustomerInvoice/AddCustomerInvoice",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function GetCustomerinvoices() {
      var req = {
        url: "CustomerInvoice/GetCustomersInvoicesByBranch",
        method: "GET",
      };
      return API.execute(req);
    }

    function GetSellPriceForUnit(data) {
      var req = {
        url: "CustomerInvoice/GetSellPriceForUnit",
        method: "GET",
        params: { unitId: data },
      };
      return API.execute(req);
    }

    function GetSellPriceForUnitNext(data) {
      var req = {
        url: "CustomerInvoice/GetSellPriceForUnitNext",
        method: "GET",
        params: { unitId: data },
      };
      return API.execute(req);
    }

    function AddReturnsInvoiceSelling(data) {
      var req = {
        url: "CustomerInvoice/AddReturnsInvoiceSelling",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

  },
]);
