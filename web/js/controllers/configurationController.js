var semaphore;
app.controller('configurationController', [
  '$scope',
  'Translate',
  '$timeout',
  '$state',
  '$rootScope',
  '$location',
  'Helpers',
  function (
    $scope,
    Translate,
    $timeout,
    $state,
    $rootScope,
    $location,
    Helpers,
  ) {
    $scope.Translate = Translate;
    $scope.currentObj = {};
    // $scope.currencies={}
    $scope.init = function () {

    };
  }]);
