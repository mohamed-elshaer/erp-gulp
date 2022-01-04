app.factory("unit", [
    "API",
    function (API) {
      return {
        getAllUnits: getAllUnits,
        addUnit: addUnit,
        updateUnit: updateUnit,
        getUnit: getUnit,
      };
  
      function getAllUnits() {
        var req = {
          url: "unit/GetAllUnits",
          method: "GET",
        };
        return API.execute(req);
      }
      function getUnit(id) {
        var req = {
          url: "unit/unit/" + id,
          method: "GET",
        };
        return API.execute(req);
      }
      function addUnit(data) {
        var req = {
          url: "unit/AddUnit",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
  
      function updateUnit(data,id) {
        var req = {
          url: "unit/EditUnit/"+id,
          method: "PUT",
          data: data,
        };
        return API.execute(req);
      }
    },
  ]);