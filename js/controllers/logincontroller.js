app.controller(
  'loginCtrl',
    
  function ($scope, $rootScope, API, $state,$stateParams,user, Helpers, Translate) {
    $rootScope.lang = localStorage.lang ? localStorage.lang : 'rtl';
    $scope.Translate = Translate;
    if(localStorage.token){
      $state.go("menu.dashboard")

    }
    
    $scope.login = function () {
      var req = {
        url: 'Account/login',
        method: 'post',
        data: $scope.user,
      };
      API.execute(req)
        .then(function (_res) {

          if (_res.status == 200) {
            localStorage.token = _res.data.token;
            $rootScope.user = parseJwt(_res.data.token);
            localStorage.userObj = JSON.stringify(parseJwt(_res.data.token));
            $rootScope.$applyAsync();
            Helpers.showToaster(Translate[$rootScope.lang].MSG_LOGIN_SUCCESS);
            localStorage.lang = 'rtl';
            $state.go('menu.dashboard');

          } else if (_res.status == 202) {
            localStorage.token = _res.data.token;
            localStorage.userObj = JSON.stringify(parseJwt(_res.data.token));
            $rootScope.$applyAsync();
            Helpers.showToaster(Translate[$rootScope.lang].MSG_LOGIN_SUCCESS);
            localStorage.lang = 'rtl';
            $state.go('startCompany');
          }
          else if (_res.status == 203&&_res.data.message=="401") {
            Helpers.showErrorMessage(
              Translate[$rootScope.lang].MSG_Login_Failed
            );
          } else if (_res.status == 203&&_res.data.message=="402") {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_ALREADY_LOGIN);
          }else if(_res.status==203 && _res.data.message=="403"){
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOT_ACTIVE_USER);

          
          } else {
            Helpers.ShowError(Translate[$rootScope.lang].MSG_WENT_WRONG);
          }

        }, (_ex) => {
          Helpers.showErrorMessage(_ex.data.message);

        })
    }
      

    $scope.sendEmail = function (data) {
      var req = {
        url: 'Account/forgetpassword/' + data,
        method: 'post',
      };
      API.execute(req)
        .then(function (_res) {
          if (_res.status == 200) {
            Helpers.showToaster(_res.data.message);
            $state.go('successSubmitForm');
          } else {
            Helpers.showErrorMessage(_res.data.message);
          }
        })

        .catch(function (_ex) {
          if (_ex.status == 404) {
            Helpers.showErrorMessage(_ex.data.message);
          } else if (_ex.status == 400) {
            Helpers.showErrorMessage(_ex.data.message);
          } else {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_WENT_WRONG);
          }
        });
    }
  })
