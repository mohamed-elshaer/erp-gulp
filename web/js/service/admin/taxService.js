app.factory("tax", [
    "API",
    function (API) {
      return {
        getAllTaxes: getAllTaxes,
        addTax: addTax,
        updateTax: updateTax,
        getTax: getTax,
      };
  
      function getAllTaxes() {
        var req = {
          url: "tax/GetTaxes",
          method: "GET",
        };
        return API.execute(req);
      }
      function getTax(id) {
        var req = {
          url: "tax/getTax/" + id,
          method: "GET",
        };
        return API.execute(req);
      }
      function addTax(data) {
        var req = {
          url: "tax/Add",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
  
      function updateTax(data,id) {
        var req = {
          url: "tax/Update/"+id,
          method: "PUT",
          data: data,
        };
        return API.execute(req);
      }
    },
  ]);