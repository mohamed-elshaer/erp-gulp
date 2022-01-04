app.controller('userProfileCtrl', [
    '$scope',
    'userProfile',
    'Translate',
    '$rootScope',
    '$state',
    'Helpers',
    '$stateParams',
    function (
      $scope,
      userProfile,
      Translate,
      $rootScope,
      $state,
      Helpers,
      $stateParams
    ) {
      $rootScope.lang = localStorage.lang;
      $scope.Translate = Translate;
      userInfo()
    function userInfo(){
        userProfile.userData().then(function(res){
            $scope.userData=res.data;
            console.log($scope.userData);
        })
    }
    $scope.editUserProfile=function(data){
        userProfile.editUserProfile(data).then(function(res){
            Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);
            userInfo()
            $rootScope.getUserProfileData();
        },(_ex)=>{
            Helpers.showToaster(_ex);

        })
    }
       
    }
  ]);
  