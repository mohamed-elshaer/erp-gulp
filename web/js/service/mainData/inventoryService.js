app.factory("inventory", [
    "API",
    function (API) {
      return {
        getAllInventories: getAllInventories,
        addInventory: addInventory,
        updateInventory: updateInventory,
      };
  
      function getAllInventories() {
        var req = {
          url: "Inventory/GetInventorysByBranch",
          method: "GET",
        };
        return API.execute(req);
      }
      function addInventory(data) {
        var req = {
            url: "Inventory/AddInventory",
            method: "POST",
          data: data,
        };
        return API.execute(req);
      }
  
      function updateInventory(data,id) {
        var req = {
          url: "Inventory/UpdateInventory/"+id,
          method: "PUT",
          data: data,
        };
        return API.execute(req);
      }
    },
  ]);