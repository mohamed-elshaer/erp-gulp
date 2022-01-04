app.controller('backupController', 
['$scope', 'backup', 'Translate', '$rootScope', '$state', 'Helpers', '$stateParams', '$timeout', 'Excel', function($scope, backup, Translate, $rootScope, $state, Helpers, $stateParams, $timeout, Excel) {
    $rootScope.lang = localStorage.lang;
    $scope.Translate = Translate;
    $scope.backups ={
        fileName:""
    }
    
    $scope.backup=function(){
        backup.backup().then(function(){
            Helpers.showToaster(Translate[$rootScope.lang].MSG_BACKUP_SUCCESS);
            getBackup();
        })
    }
    getBackup();
    function getBackup(){
        backup.GetBackup().then(function(res){
            $scope.backups=res.data;
        })
    }
    $scope.Restorebackup=function(data){
        backup.restore(data).then(function(res){
            Helpers.showToaster(Translate[$rootScope.lang].MSG_RESTORE_SUCCESS);

        })
    }
    
   
}]);