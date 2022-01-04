var semaphore;
app.controller('startCompanycontroller', [
  '$scope',
  '$rootScope',
  'company',
  'currency',
  'user',
  'Translate',
  '$timeout',
  '$state',
  '$location',
  'Helpers',
  function (
    $scope,
    $rootScope,

    company,
    currency,
    user,
    Translate,
    $timeout,
    $state,
    $location,
    Helpers
  ) {
    $scope.Translate = Translate;
    semaphore = $scope;
    $scope.companyform = {};
    $scope.nextBranch = false;
    $scope.nextcurrency = false;
    $scope.startmode = false;
    $scope.finsih=false;
    //if 403 error
    $rootScope.logout = function () {
      var userObj=JSON.parse(localStorage.userObj);
       user.UpdateLoggedIn(userObj.userId);
     delete localStorage.menu;
     delete localStorage.token;
     delete localStorage.userObj;
    
      $state.go("login");
    };
    $scope.addbranchAfterCompany = function (data) {
      company.addbranchREQ(data).then(
        function (res) {
          
          if (res.status == 201 || res.status == 200) {
            // $scope.nextcurrency = true;
            $scope.allNextBtn();
            $scope.finsih=true;
            $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
            Helpers.showToaster(
              Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY
            );
            company.getcurrencies().then(function (res) {
              $scope.currencyLst = res.data;
            });
          }
        },
        (_ex) => {
          
          if (_ex.status == 400) {
            Helpers.showErrorMessage(
              Translate[$rootScope.lang].MSG_BRANCHNAMEEXIST
            );
          } else if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $rootScope.logout()

          }
        }
      );
    };

    $scope.addCurrency = function (data) {
      currency.addCurrency(data).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          $('#currencyModal').modal('hide');
          $scope.currencyObj = null;
          $scope.init();
        },
        (_ex) => {
          Helpers.showErrorMessage(_ex.data.message);
        }
      );
    };
    $scope.addcompany = function (data) {
      company.addcompanyReq(data).then(
        function (res) {
          if (res.status == 200 || res.status == 201) {
            // $scope.nextBranch = true;
            $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
            Helpers.showToaster(
              Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY
            );
           
          }
        },
        (_ex) => {
          if (_ex.status == 400) {
            Helpers.showErrorMessage(
              Translate[$rootScope.lang].MSG_COMPANYNAMEEXIST
            );
          } else if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $rootScope.logout()
          }
        }
      );
    };
   
    $scope.allNextBtn = function () {
      $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
    };
    $scope.selectPicture = function () {
      document.getElementById('file').click();
    };
    $scope.imageSizeError = function () {
      $('#MaxSize').modal('show');
    };
    $scope.getallcurrencies = function () {
      company.getcurrencies().then(function (res) {
        $scope.currencies = res.data;
      });
    };
    $scope.update=function(data){
      currency.updateCurrency(data , data.id).then(function (res) {
        Helpers.showToaster(Translate[$rootScope.lang].MSG_DEFAULTCURRENCYADDED);
        $state.go("menu.dashboard")
      },(_ex)=>{
        if(_ex.status==400)
        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_DEFAULTCURRENCYEXIST);

      })
     
    }
  },
]);
function convertToBase64(event) {
  var files = document.getElementById('file').files;
  if (files.length > 0) {
    getBase64(files[0]);
  }

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (file.size <= 500000) {
        semaphore.companyform.companyLogo = reader.result;

        semaphore.$apply();
      } else {
        semaphore.imageSizeError();
      }
    };
    reader.onerror = function (error) {};
  }
}
