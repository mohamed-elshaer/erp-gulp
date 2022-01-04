app.factory("costcenterservice", [
  "API",
  function (API) {
    return {
      getAllReq: getAllReq,
    };

    function getAllReq(data) {
      var req = {
        url: "CostCenter/GetAll",
        method: "GET",
      };
      return API.execute(req);
    }
  },
]);
