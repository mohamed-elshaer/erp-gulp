app.factory("customer", [
  "API",
  function (API) {
    return {
      getAllCustomers: getAllCustomers,
      addCustomer: addCustomer,
      updateCustomer: updateCustomer,
      getAllCustomerBycode: getAllCustomerBycode,
      getAllCustomersacc: getAllCustomersacc,
    };

    function getAllCustomers() {
      var req = {
        url: "Customer/GetCustomersByBranch",
        method: "GET",
      };
      return API.execute(req);
    }

    function getAllCustomerBycode(data) {
      var req = {
        url: "Customer/GetCustomersByCode",
        method: "GET",
        params: { code: data },
      };
      return API.execute(req);
    }

    function getAllCustomersacc() {
      var req = {
        url: "Customer/GetCustomersAccounts",
        method: "GET",
      };
      return API.execute(req);
    }

    function addCustomer(data) {
      var req = {
        url: "Customer/AddCustomer",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function updateCustomer(data, id) {
      var req = {
        url: "Customer/UpdateCustomer/" + id,
        method: "PUT",
        data: data,
      };
      return API.execute(req);
    }
  },
]);
