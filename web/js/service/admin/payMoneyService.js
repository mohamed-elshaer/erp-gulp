app.factory("payMoney", [
  "API",
  function (API) {
    return {
      addPayMoneySpend: addPayMoneySpend,
      GetPaymentTypesReq: GetPaymentTypesReq,
      addPayMoneySpendForSupSome: addPayMoneySpendForSupSome,
      addPayMoneySpendForSupDelay: addPayMoneySpendForSupDelay,
      addPayMoneyRecieveForCustSome: addPayMoneyRecieveForCustSome,
      addPayMoneyRecieveForCustDelay: addPayMoneyRecieveForCustDelay,
      getPayMoeny:getPayMoeny
    };

    function addPayMoneySpend(data) {
      var req = {
        url: "payMoney/addPaymoneySpend",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function addPayMoneySpendForSupSome(data) {
      var req = {
        url: "payMoney/addPaymoneySpendForSupSome",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function addPayMoneySpendForSupDelay(data) {
      var req = {
        url: "payMoney/addPaymoneySpendForSupDelay",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }
    function addPayMoneyRecieveForCustSome(data) {
      var req = {
        url: "payMoney/addPaymoneyRecieveForCustSome",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function addPayMoneyRecieveForCustDelay(data) {
      var req = {
        url: "payMoney/addPaymoneyRecieveForCustDelay",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function GetPaymentTypesReq() {
      var req = {
        url: "payMoney/GetPaymentType",
        method: "GET",
      };
      return API.execute(req);
    }
    function getPayMoeny(data) {
      var req = {
        url: "PayMoney/GetReceiptsPayMoney",
        method: "get",
        data: data,
      };
      return API.execute(req);
    }
  },
]);
