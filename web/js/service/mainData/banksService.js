app.factory("bank", [
    "API",
    function (API) {
      return {
        getAllBanks: getAllBanks,
        addBank: addBank,
        updateBank: updateBank,
        getBank: getBank,
        addBankAccount: addBankAccount,
        getBankAccountsByBranch:getBankAccountsByBranch,
        updateBankAccount:updateBankAccount
      };
  
      function getAllBanks() {
        var req = {
          url: "bank/GetBanksByBranch",
          method: "GET",
        };
        return API.execute(req);
      }
      function getBank(id) {
        var req = {
          url: "bank/bank/" + id,
          method: "GET",
        };
        return API.execute(req);
      }
      function addBank(data) {
        var req = {
          url: "bank/AddBank",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
      function addBankAccount(data) {
        var req = {
          url: "bankAccount/AddBankAccount",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
      function getBankAccountsByBranch(data) {
        var req = {
          url: "BankAccount/GetBankAccountsByBranch",
          method: "GET",
          data: data,
        };
        return API.execute(req);
      }
      function updateBankAccount(data,id) {
        var req = {
          url: "BankAccount/EditBankAccount/"+id,
          method: "PUT",
          data: data,
        };
        return API.execute(req);
      }
      function updateBank(data,id) {
        var req = {
          url: "bank/EditBank/"+id,
          method: "PUT",
          data: data,
        };
        return API.execute(req);
      }
    },
  ]);