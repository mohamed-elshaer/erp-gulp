app.factory("supplier", [
  "API",
  function (API) {
    return {
      getAllSuppliers: getAllSuppliers,
      addSupplier: addSupplier,
      updateSupplier: updateSupplier,
      getAllSuppliersacc: getAllSuppliersacc,
      getAllSupplierBycode: getAllSupplierBycode,
    };

    function getAllSuppliers() {
      var req = {
        url: "Supplier/GetSuppliersByBranch",
        method: "GET",
      };
      return API.execute(req);
    }

    function getAllSupplierBycode(data) {
      var req = {
        url: "Supplier/GetSuppliersByCode",
        method: "GET",
        params: { code: data },
      };
      return API.execute(req);
    }

    function getAllSuppliersacc() {
      var req = {
        url: "Supplier/GetSuppliersAccounts",
        method: "GET",
      };
      return API.execute(req);
    }

    function addSupplier(data) {
      var req = {
        url: "Supplier/AddSupplier",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function updateSupplier(data, id) {
      var req = {
        url: "Supplier/UpdateSupplier/" + id,
        method: "PUT",
        data: data,
      };
      return API.execute(req);
    }
  },
]);
