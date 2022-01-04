app.controller('changePasswordCtrl', [
    '$scope',
    'password',
    'Translate',
    '$rootScope',
    '$state',
    'Helpers',
    '$stateParams',
    function (
      $scope,
      password,
      Translate,
      $rootScope,
      $state,
      Helpers,
      $stateParams
    ) {
      $rootScope.lang = localStorage.lang;
      $scope.Translate = Translate;
      $scope.ResetPassword={};
      $scope.changePassword=function(data){
                password.changePassword(data).then(function(res){
                  swal.fire({
                    title: Translate[$rootScope.lang].MSG_SUCCESS,
                    text: Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY,
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText:  Translate[$rootScope.lang].TEXT_LOGOUT,
                    cancelButtonText: Translate[$rootScope.lang].TEXT_LATER,
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                    $rootScope.logout()
                     
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss ===$state.go("menu.dashboard")
                    ) {
                    }
                  })
         $scope.ResetPassword={};
            },(_ex)=>{
              Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_OLD_PASSWORD_INCORRECT);
            })
      }
   
       
    }
  ]);
  