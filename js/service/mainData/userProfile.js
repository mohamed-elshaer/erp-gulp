app.factory("userProfile", [
    "API",
    function (API) {
      return {
        userData:userData,
        editUserProfile:editUserProfile
      };
  
  
      function userData() {
        var req = {
          url: "User/GetUser",
          method: "get",
         
        };
        return API.execute(req);
      }
      function editUserProfile(data) {
        var req = {
          url: "User/EditUserProfile",
          method: "post",
          data:data
         
        };
        return API.execute(req);
      }
     
    },
  ]);
  