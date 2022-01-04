app.factory("collectMoney", [
    "API",
    function (API) {
      return {
        addCollectMoney: addCollectMoney,
        getCollectMoney:getCollectMoney
      };
  
      function addCollectMoney(data) {
        var req = {
          url: "PayMoney/addPaymoneyRecieve",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
      function getCollectMoney(data) {
        var req = {
          url: "PayMoney/GetCatchReceiptPayMoney",
          method: "get",
          data: data,
        };
        return API.execute(req);
      }
    },
  ]);
  