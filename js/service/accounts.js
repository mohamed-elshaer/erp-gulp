app.factory("accounts", [
  "API",
  function (API) {
    return {
      getaccountReq: getaccountReq,
      getallaccounttypeReq: getallaccounttypeReq,
      getaccountbytypeId: getaccountbytypeId,
      getaccountbyParentId: getaccountbyParentId,
      get_account_tree: get_account_tree,
      getallinvandbankacc: getallinvandbankacc,
      getAllAccountLevel: getAllAccountLevel,
      getAllAccountNature: getAllAccountNature,
      getAllReportTypes: getAllReportTypes,
      AddAccount: AddAccount,
      GetAccountForTransaction: GetAccountForTransaction,
    };

    function AddAccount(data) {
      var req = {
        url: "Accounting/AddAccount",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }
    function getaccountReq() {
      var req = {
        url: "Accounting/GetAllAccountsByBranch",
        method: "GET",
      };
      return API.execute(req);
    }

    function getAllAccountLevel() {
      var req = {
        url: "Accounting/getAllAccountLevel",
        method: "GET",
      };
      return API.execute(req);
    }

    function getAllAccountNature() {
      var req = {
        url: "Accounting/getAllAccountnature",
        method: "GET",
      };
      return API.execute(req);
    }
    function getAllReportTypes() {
      var req = {
        url: "Accounting/getAllReportTypes",
        method: "GET",
      };
      return API.execute(req);
    }
    function getallaccounttypeReq() {
      var req = {
        url: "Accounting/getAllAccounttypeByBranch",
        method: "GET",
      };
      return API.execute(req);
    }

    function getaccountbytypeId(TypeId) {
      var req = {
        url: "Accounting/GetAllAccountsByTypeId",
        method: "GET",
        params: { TypeId: TypeId },
      };
      return API.execute(req);
    }

    function getaccountbyParentId(ParentId) {
      var req = {
        url: "Accounting/GetAllAccountsByParentId",
        method: "GET",
        params: { ParentId: ParentId },
      };
      return API.execute(req);
    }

    function get_account_tree() {
      var _req = {
        url: "Accounting/GetTree",
        method: "GET",
      };
      return API.execute(_req);
    }
    function getallinvandbankacc() {
      var _req = {
        url: "Accounting/getallinvandbankacc",
        method: "GET",
      };
      return API.execute(_req);
    }

    function GetAccountForTransaction() {
      var _req = {
        url: "Accounting/GetAccountForTransaction",
        method: "GET",
      };
      return API.execute(_req);
    }
  },
]);
