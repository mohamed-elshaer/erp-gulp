app.factory("user", [
  "API",
  "$rootScope",
  function (API, $rootScope) {
    return {
      getallusers: getallusers,
      getallroles: getallroles,
      adduser: adduser,
      updateuser: updateuser,
      getuserbyid: getuserbyid,
      UpdateLoggedIn:UpdateLoggedIn
    };

    function getallusers() {
      var req;
      if ($rootScope.userrole == "SuperAdmin") {
        req = {
          url: "User/getallusers",
          method: "GET",
        };
      } else {
        req = {
          url: "User/getallusersForAdmin",
          method: "GET",
        };
      }

      return API.execute(req);
    }

    function getallroles() {
      var req;
      if ($rootScope.userrole == "SuperAdmin") {
        req = {
          url: "Role/getallRoles",
          method: "GET",
        };
      } else {
        req = {
          url: "Role/getallRolesForAdmin",
          method: "GET",
        };
      }

      return API.execute(req);
    }

    function adduser(data) {
      var req = {
        url: "Account/Adduser",
        method: "POST",
        data: data,
      };
      return API.execute(req);
    }

    function updateuser(data) {
      var req = {
        url: "Account/EditUser",
        method: "PUT",
        data: data,
      };
      return API.execute(req);
    }

    function getuserbyid(id) {
      var req = {
        url: "Account/getuser",
        method: "GET",
        params: { userId: id },
      };
      return API.execute(req);
    }
    function UpdateLoggedIn(data){
      var req = {
        url: "Account/UpdteLoggedIn/"+data,
        method: "Post",
      };
      return API.execute(req);
    }
  },
]);
