app.factory("password", [
    "API",
    function (API) {
      return {
        changePassword:changePassword
      };
  
  
      function changePassword(data) {
        var req = {
          url: "User/ChangePassowrd",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
  
     
    },
  ]);
  