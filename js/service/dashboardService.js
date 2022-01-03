app.factory("dashboard", [
    "API",
    function (API) {
      return {
        getProductsData: getProductsData,
        getTotalExpenses: getTotalExpenses,
        getBalance: getBalance,
        getTransactions: getTransactions,
        getTopFiveCustomers: getTopFiveCustomers,
        getTopFiveSuppliers: getTopFiveSuppliers,
        getTotalRevenues: getTotalRevenues,
        getCustomersCount: getCustomersCount,
        getSuppliersCount: getSuppliersCount,
        getUsersCount: getUsersCount,
        getProductsCount: getProductsCount
      };
      function getProductsData() {
        var req = {
          url: "Report/ProductsReport",
          method: "GET",
        };
        return API.execute(req);
      }
      function getTransactions() {
        var req = {
          url: "Report/TransactionReport",
          method: "GET",
        };
        return API.execute(req);
      }
      function getTopFiveCustomers() {
        var req = {
          url: "Report/TopFiveCustomers",
          method: "GET",
        };
        return API.execute(req);
      }
      function getTopFiveSuppliers() {
        var req = {
          url: "Report/TopFiveSuppliers",
          method: "GET",
        };
        return API.execute(req);
      }
      function getTotalRevenues() {
        var req = {
          url: "Report/TotalRevenues",
          method: "GET",
        };
        return API.execute(req);
      }
      function getTotalExpenses() {
        var _req = {
          url: "Report/TotalExpenses",
          method: "GET",
        };
        return API.execute(_req);
      }
      function getBalance() {
        var _req = {
          url: "Report/TotalBalance",
          method: "GET",
        };
        return API.execute(_req);
      }
      function getCustomersCount() {
        var _req = {
          url: "Report/CustomersCount",
          method: "GET",
        };
        return API.execute(_req);
      }
      function getSuppliersCount() {
        var _req = {
          url: "Report/SuppliersCount",
          method: "GET",
        };
        return API.execute(_req);
      }
      function getUsersCount() {
        var _req = {
          url: "Report/UsersCount",
          method: "GET",
        };
        return API.execute(_req);
      }
      function getProductsCount() {
        var _req = {
          url: "Report/ProductsCount",
          method: "GET",
        };
        return API.execute(_req);
      }
    },
  ]);
  