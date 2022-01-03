app.controller('rolepermissioncontroller',
 ['$scope', 'roles','$rootScope','$stateParams','Translate','Helpers','$state','$timeout', 
 function ($scope, roles,$rootScope,$stateParams,Translate,Helpers, $state,$timeout) {
  
  $rootScope.lang = localStorage.lang;
  $scope.Translate = Translate;
      $scope.updatePermission=function(data){
          roles.AddRolePermission(data).then(function(){
            Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATE_PERMISSION_SUCCESS);
            $state.go('menu.roles')
          },(_ex)=>{
            if(_ex.status==403){
              Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_WENT_WRONG);

            }
          })
      }
      //checkAll permissions by one checkbox
      $scope.checkAll = function () {
      
        angular.forEach($scope.permissions.roleClaims, function (item) {
            item.isSelected = $scope.selectedAll;
            $scope.isSelected=$scope.selectedAll
        });

    };

    $scope.CheckUncheckHeader = function () {
      $scope.selectedAll = true;
      angular.forEach($scope.permissions.roleClaims, function (item) {        
          if (!item.isSelected) {
              $scope.selectedAll = false;
              
          }
      })
  };
          //checkAll  permissions row by one checkbox

    $scope.checkRow=function(key,select){
      angular.forEach($scope.permissions.roleClaims, function (item) {
        
         if(item.model===key){
         
           if(select){
           item.isSelected =true
           }
         else if(!select)
          item.isSelected = false;
       
         }
    })
    $scope.CheckUncheckHeader()

  
    }
    
    
    $scope.init=function(){
      roles.GetAllPermissions($stateParams.id).then(function(response){
        $scope.permissions=response.data
        //checkUnCheck SelectAll checkbox after enter first time if one row false checkAllBox will be false and otherwise
        const found =  $scope.permissions.roleClaims.some(el => el.isSelected === false);
       if(found){
        $scope.selectedAll=false
        $scope.isSelected=false
       }
       else{
        $scope.selectedAll=true
        $scope.isSelected=true
       } 
        
      })
      
    }
    $timeout($scope.init);

}])
