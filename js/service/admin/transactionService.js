app.factory("transactions", [
    "API",
    function (API) {
      return {
        getAllTransactions: getAllTransactions,
        addTransaction: addTransaction,
        GetTransactionByDate : GetTransactionByDate,
        GetTransactionByDateAndAccount:GetTransactionByDateAndAccount,
      };
      function getAllTransactions() {
        var req = {
          url: "transactions/GetAllTransaction",
          method: "GET",
        };
        return API.execute(req);
      }
      function addTransaction(data) {
        var req = {
          url: "transactions/addTransaction",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
      function GetTransactionByDate(data) {
        var req = {
          url: "transactions/GetTransactionByDate",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
      function GetTransactionByDateAndAccount(data) {
        var req = {
          url: "transactions/GetTransactionByDateAndAccount",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
    },
  ]);