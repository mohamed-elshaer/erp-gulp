app.factory("backup", [
    "API",
    function (API) {
      return {
        backup: backup,
        GetBackup:GetBackup,
        restore:restore
      };
  
      function backup() {
        var req = {
          url: "backup/backup",
          method: "GET",
        };
        return API.execute(req);
      }
      
      function GetBackup() {
        var req = {
          url: "backup/GetBackup",
          method: "GET",
        };
        return API.execute(req);
      }
      function restore(data) {
        var req = {
          url: `backup/Restorebackup?fileName=${data}`,
          method: "post",
        //   data:data
        
        };
        return API.execute(req);
      }
    },
  ]);