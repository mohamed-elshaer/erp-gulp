var semaphore;
app.controller('companycontroller', [
  '$scope',
  'company',
  'Translate',
  '$timeout',
  '$state',
  '$rootScope',
  '$location',
  'Helpers',
  function (
    $scope,
    company,
    Translate,
    $timeout,
    $state,
    $rootScope,
    $location,
    Helpers,
  ) {
    $scope.Translate = Translate;
    semaphore = $scope;
    $scope.companyform = {};
    // $scope.currencies={}
    $scope.init = function () {
      company.getcurrencies().then(function (res) {
        $scope.currencies = res.data;
      });
      company.getcompanyByUserIdReq().then(function (res) {
        $scope.companyform = res.data;
      });
    };
    $scope.init();
    $scope.addcompany = function (data) {
      if (data.id > 0) {
        company.addcompanyReq(data).then(function (res) {
          if (res.status == 200) {
            alert('add success');
            $state.go('menu.addbranch');
          }
        });
      } else {
        company.updatecomapnyReq(data).then(function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);
          // $state.go("menu.dashboard");
        });
      }
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
