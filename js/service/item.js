app.factory("item", [
  "API",
  function (API) {
    return {
      addproductReq: addproductReq,
      addcategoryReq: addcategoryReq,
      addstoreReq: addstoreReq,
      getallstoreReq: getallstoreReq,
      getallcategoryReq: getallcategoryReq,
      getallproductReq: getallproductReq,
      updateproductReq: updateproductReq,
      getallproductByStoreId: getallproductByStoreId,
      getProductById:getProductById,
      updateCategoryReq:updateCategoryReq,
      updateStoreReq:updateStoreReq,
      CheckProductCode:CheckProductCode
    };

    function addproductReq(data) {
      var req = {
        url: "Product/AddProduct",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }
 
    function getallproductReq() {
      var req = {
        url: "Product/GetProductsByBranch",
        method: "GET",
      };
      return API.execute(req);
    }

    function getallproductByStoreId(data) {
      var req = {
        url: "Product/GetAllProductsByStoreId",
        method: "GET",
        params: { storeId: data },
      };
      return API.execute(req);
    }

    function addcategoryReq(data) {
      var req = {
        url: "Category/AddCategory",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }
    function addstoreReq(data) {
      var req = {
        url: "Store/AddStore",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function getallcategoryReq() {
      var req = {
        url: "Category/GetCategoriesByBranch",
        method: "GET",
      };
      return API.execute(req);
    }
    function updateCategoryReq(id,data) {
      var req = {
        url: "Category/EditCategory/"+id,
        method: "Put",
        data:data,
      };
      return API.execute(req);
    }
    function getallstoreReq() {
      var req = {
        url: "Store/GetStoresByBranch",
        method: "GET",
      };
      return API.execute(req);
    }
    function updateStoreReq(id,data) {
      var req = {
        url: "Store/EditStore/"+id,
        method: "Put",
        data:data,
      };
      return API.execute(req);
    }
    function updateproductReq(data) {
      var req = {
        url: "Product/UpdateProduct",
        method: "PUT",
        params: { productId: data.id },
        data: data,
      };
      return API.execute(req);
    }

    function getProductById(id) {
      var req = {
        url: "Product/Product/"+id,
        method: "get",
        
      };
      return API.execute(req);
    }
    function CheckProductCode(productCode) {
      var req = {
        url: "Product/CheckProductCode/"+productCode,
        method: "get",
        
      };
      return API.execute(req);
    }
  },
]);
