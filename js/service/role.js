app.factory("roles", [
    "API",
    "$rootScope",
    function (API,$rootScope) {
    
      return {
      
        getallroles: getallroles,
        addRole: addRole,
        deleteRole:deleteRole,
        GetAllPermissions:GetAllPermissions,
        AddRolePermission:AddRolePermission
      };
  
      function getallroles() {
     
        var req
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
  
      function addRole(data) {
        var req = {
          url: "Role/addRole",
          method: "POST",
          data: data,
        };
        return API.execute(req);
      }
      function deleteRole(data) {
        var req = {
          url: "Role/DeleteRole/"+data,
          method: "Delete",
          data: data,
        };
        return API.execute(req);
      }
      function GetAllPermissions(id) {
        var req = {
          url: "Role/GetAllPermissions",
          method: "Get",
          params:{roleId:id}
        };
        return API.execute(req);
      }
      function AddRolePermission(data,) {
        var req = {
          url: "Role/AddRolePermisstion",
          method: "post",
          data: data,
        };
        return API.execute(req);
      }
    },
  ]);
 