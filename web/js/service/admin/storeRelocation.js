app.factory("storeRelocation", [
    "API",
    function (API) {
      return {
        addStoreRelocation: addStoreRelocation,
         getALLStoreRelocationFrmToStore:getALLStoreRelocationFrmToStore
      };
      function addStoreRelocation(data) {
        var req = {
          url: "StoreRelocation/RelocateFrmToStor",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
      function getALLStoreRelocationFrmToStore(id1,id2){
        var req = {
            url: "StoreRelocation/GetRelocateToFromStore",
            method: "get",
            params: {storeIdFrom:id1,storeIdTo:id2},
          };
          return API.execute(req);
     }
    
    },
  ]);
  