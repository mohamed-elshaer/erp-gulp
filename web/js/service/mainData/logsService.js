app.factory("logs", [
    "API",
    function (API) {
      return {
        getAllLogs: getAllLogs,
        getAllLogsForSuperAdmin:getAllLogsForSuperAdmin,
        GetLogsSettings:GetLogsSettings,
        LogInterval:LogInterval,
        updateIntervalForSuperAdmin:updateIntervalForSuperAdmin,
        updateIntervalForAdmin:updateIntervalForAdmin
      };
  
      function getAllLogs() {
        var req = {
          url: "Log/logs",
          method: "GET",
        };
        return API.execute(req);
      }
      function getAllLogsForSuperAdmin() {
        var req = {
          url: "Log/logsForSuperAdmin",
          method: "GET",
        };
        return API.execute(req);
      }
     function GetLogsSettings(){
      var req = {
        url: "Log/LogsSetting",
        method: "GET",
      };
      return API.execute(req);
     }
     function updateIntervalForSuperAdmin(interval){
      
      var req = {
        url: "Log/EditLogIntervalForSuperAdmin/"+interval,
        method: "POST",
      };
      return API.execute(req);
     }
     function updateIntervalForAdmin(interval){
      
      var req = {
        url: "Log/EditLogIntervalForAdmin/"+interval,
        method: "POST",
      };
      return API.execute(req);
     }
     function LogInterval(){
      
      var req = {
        url: "Log/LogInterval",
        method: "GET",
      };
      return API.execute(req);
     }
    },
  ]);