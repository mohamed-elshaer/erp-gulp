app.factory("currency", [
  "API",
  function (API) {
    return {
      getAllCurrencies: getAllCurrencies,
      addCurrency: addCurrency,
      updateCurrency: updateCurrency,
      getCurrency: getCurrency,
      GetDefaultCurrency: GetDefaultCurrency,
    };

    function getAllCurrencies() {
      var req = {
        url: "currency/GetCurrencies",
        method: "GET",
      };
      return API.execute(req);
    }

    function GetDefaultCurrency() {
      var req = {
        url: "currency/GetDefaultCurrency",
        method: "GET",
      };
      return API.execute(req);
    }
    function getCurrency(id) {
      var req = {
        url: "currency/getCurrency/" + id,
        method: "GET",
      };
      return API.execute(req);
    }
    function addCurrency(data) {
      var req = {
        url: "currency/Add",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function updateCurrency(data, id) {
      var req = {
        url: "currency/Update/" + id,
        method: "PUT",
        data: data,
      };
      return API.execute(req);
    }
  },
]);
