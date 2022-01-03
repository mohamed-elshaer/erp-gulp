app.factory("supplierinvoice", [
  "API",
  function (API) {
    return {
      AddsupplierinvoiceReq: AddsupplierinvoiceReq,
      GetSupplierinvoices: GetSupplierinvoices,
      AddReturnsInvoicePurchasing: AddReturnsInvoicePurchasing,
    };

    function AddsupplierinvoiceReq(data) {
      var req = {
        url: "SupplierInvoice/AddSupplierInvoice",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }
    function GetSupplierinvoices() {
      var req = {
        url: "SupplierInvoice/GetSuppliersInvoicesByBranch",
        method: "GET",
      };
      return API.execute(req);
    }

    function AddReturnsInvoicePurchasing(data) {
      var req = {
        url: "SupplierInvoice/AddReturnsInvoicePurchasing",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }
  },
]);
