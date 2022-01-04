app.controller('resetPasswordCtrl', function($scope,$window,$stateParams,Helpers,Translate,$state,$location,Translate,resetPasswordService) {
  
    $scope.Translate = Translate;
    $scope.ResetPassword = {}
    $scope.ChangePassword = function () {
        $scope.ResetPassword.token= $location.search()['token']
        resetPasswordService.resetPassword($scope.ResetPassword).then(function (response) {
           Helpers.showToaster(response.data.message)
            $state.go ("login");
        }, function (_ex) {
          Helpers.showErrorMessage(_ex.data.message)
        })
    }
});