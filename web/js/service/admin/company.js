app.factory("company", [
  "API",
  function (API) {
    return {
      addcompanyReq: addcompanyReq,
      getcurrencies: getcurrencies,
      addbranchREQ: addbranchREQ,
      getbranchesbyuserIdReq: getbranchesbyuserIdReq,
      updatebranchReq: updatebranchReq,
      getcompanyByUserIdReq: getcompanyByUserIdReq,
      updatecomapnyReq: updatecomapnyReq,
      ChangeBranch: ChangeBranch,
      AddSellPriceSetting: AddSellPriceSetting,
      AddPricePolicy: AddPricePolicy,
      GetSellPriceSetting: GetSellPriceSetting,
      GetPricePolicy: GetPricePolicy,
      UpdatePricePolicy: UpdatePricePolicy,
      UpdateSellPriceSetting: UpdateSellPriceSetting,
      getbranchebyuserIdReq:getbranchebyuserIdReq,
      getLookupsReport : getLookupsReport
    };

    function addcompanyReq(data) {
      var req = {
        url: "Company/Add",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function getcurrencies() {
      var req = {
        url: "Currency/GetCurrencies",
        method: "GET",
      };
      return API.execute(req);
    }

    function addbranchREQ(data) {
      var req = {
        url: "Branch/addbranch",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function getbranchesbyuserIdReq() {
      var req = {
        url: "Branch/GetBranchesByUserId",
        method: "GET",
      };
      return API.execute(req);
    }
    function getbranchebyuserIdReq() {
      var req = {
        url: "Branch/GetBrancheByUserId",
        method: "GET",
      };
      return API.execute(req);
    }

    function updatebranchReq(data) {
      var req = {
        url: "Branch/editbranch",
        method: "POST",
        params: { branchId: data.branchId },
        data: data,
      };
      return API.execute(req);
    }

    function getcompanyByUserIdReq() {
      var req = {
        url: "Company/GetCompanyByUserId",
        method: "GET",
      };
      return API.execute(req);
    }
    function getLookupsReport(branchId) {
      var req = {
        url: "Report/AllEndPoints/",
        method: "GET",
        params: { branchId: branchId },
      };
      return API.execute(req);
    }
    function updatecomapnyReq(data) {
      var req = {
        url: "Company/UpdateCompany",
        method: "PUT",
        params: { id: data.companyId },
        data: data,
      };
      return API.execute(req);
    }
    function ChangeBranch(branchId) {
      var req = {
        url: "Account/ChangeBranch",
        method: "GET",
        params: { branchId: branchId },
      };
      return API.execute(req);
    }

    function AddPricePolicy(data) {
      var req = {
        url: "Company/AddPricePolicy",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function UpdatePricePolicy(data) {
      var req = {
        url: "Company/UpdatePricePolicy",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function AddSellPriceSetting(data) {
      var req = {
        url: "Company/AddSellPriceSetting",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function UpdateSellPriceSetting(data) {
      var req = {
        url: "Company/UpdateSellPriceSetting",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function GetSellPriceSetting() {
      var req = {
        url: "Company/GetsellingPriceSetting",
        method: "GET",
      };
      return API.execute(req);
    }

    function GetPricePolicy() {
      var req = {
        url: "Company/GetPricePolicy",
        method: "GET",
      };
      return API.execute(req);
    }
  },
]);
