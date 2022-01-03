app.factory('resetPasswordService', ["API", function (API) {

   return{
       resetPassword:resetPassword
   };

 
    function resetPassword(resetPasswordData) {
        var req = {
          url: "Account/ResetPassword",
          method: "POST",
          data:resetPasswordData
        };
        return API.execute(req);
      }



}])
