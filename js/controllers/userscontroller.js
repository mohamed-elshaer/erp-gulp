app.controller('userscontroller', [
  '$scope',
  'user',
  'Translate',
  '$rootScope',
  '$state',
  'Helpers',
  'Excel',
  '$timeout',
  function (
    $scope,
    user,
    Translate,
    $rootScope,
    $state,
    Helpers,
    Excel,
    $timeout
  ) {
    $scope.usersdata = [];
    $scope.roles = [];
    $scope.userform = {};
    $rootScope.lang = localStorage.lang;

    $scope.Translate = Translate;
    $scope.init = function () {
      $scope.Translate = Translate;
      $rootScope.userrole = JSON.parse(
        window.atob(localStorage.token.split('.')[1])
      ).role;
    };
    $scope.getusersdataForAdmin = function () {
      user.getallusers().then(
        function (res) {
          $scope.usersdata = res.data;
          console.log($scope.usersdata);
        },
        (_ex) => {
          if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $state.go('login');
          }
        }
      );
    };
    $scope.getroles = function () {
      user.getallroles().then(
        function (res) {
          $scope.roles = res.data;
        },
        (_ex) => {
          if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $state.go('login');
          }
        }
      );
    };
    $scope.getusersdataForAdmin();
    $scope.getroles();
    $scope.submit = function (data) {
      user.adduser(data).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          $state.go('menu.users');
        },
        (_ex) => {
          if (_ex.status == 406) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSg_USEREXIST);
          } else if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $state.go('login');
          }
        }
      );
    };

    $scope.updateuser = function (data) {
      user.updateuser(data).then(
        function (res) {
          Helpers.showToaster(
            Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY
          );
          $state.go('menu.users');
        },
        (_ex) => {
          if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $state.go('login');
          }
        }
      );
    };

    $scope.filldata = function (data) {
      $rootScope.edituser = {
        email: data.email,
        id: data.id,
        isActive: data.isActive,
        phoneNumber: data.phone,
        role: data.role,
        userName: data.userName,
      };
      console.log($rootScope.edituser);
      $state.go('menu.edituser');
    };
    $scope.exportToExcel = function (_tableId) {
      // ex: '#my-table'
      Helpers.ShowLoader();
      $scope.hideLastColumn = true;
      $timeout(function () {
        $scope.exportHref = Excel.tableToExcel(_tableId, 'export');
        // location.href = $scope.exportHref;
        Helpers.HideLoader();
        $scope.hideLastColumn = false;
        $scope.$applyAsync();
      }, 500); // trigger download
    };
    $scope.exportToPdf = function (_tableId) {
      $scope.perPageCount = 100;
      $scope.hideLastColumn = true;
      $scope.hideLastTop = false;
      html2canvas(document.getElementById(_tableId), {
        onrendered: function (canvas) {
          pdfMake.fonts = {
            DroidKufi: {
              normal: 'DroidKufi-Regular.ttf',
              bold: 'DroidKufi-Regular.ttf',
              italics: 'DroidKufi-Regular.ttf',
              bolditalics: 'DroidKufi-Regular.ttf',
            },
          };
          var data = canvas.toDataURL();
          var docDefinition = {
            content: [
              {
                image: data,
                width: 500,
              },
            ],
            defaultStyle: {
              font: 'DroidKufi',
            },
          };
          pdfMake.createPdf(docDefinition).download('export.pdf');
          $scope.hideLastColumn = false;
          $scope.hideLastTop = true;
          $scope.perPageCount = 20;
        },
      });
    };
    $scope.print = function () {
      var divContents = document.getElementById('printDiv').innerHTML;
      console.log(divContents);
      var printWindow = window.open('', '', 'height=1000,width=1000');
      printWindow.document.write('<html><head><title></title>');
      printWindow.document.write(
        '<link rel="stylesheet" href="../../css/bootstrap.min.css">'
      );
      printWindow.document.write('</head><body dir="rtl">');
      printWindow.document.write(divContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.onafterprint = printWindow.close;
      setTimeout(() => {
        printWindow.print();
      }, 2000);
      return true;
    };
    
    $scope.checkboxModel = {
      symbols : true,
      numbers : true,
      upperCase : true,
      lowerCase : true
    };
     $scope.passwordLength = 15;
     $scope.password = '';
     $scope.upperCaseArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
     $scope.lowerCaseArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
     $scope.numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
     $scope.symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '}', '[', ']', '|', '\\', ':',
';', '"', '\'', '<', '>', ',', '.', '?', '/',
'`', '~'];
     $scope.generatePassword = function(){
     $scope.password = "";
     for (var i=0; i<$scope.passwordLength; i++) {

       /*
       upperCase : true,
       lowerCase : true,
       numbers   : true,
       symbols   : true
       */
        if($scope.checkboxModel.upperCase === true && $scope.checkboxModel.lowerCase === true && $scope.checkboxModel.numbers === true && $scope.checkboxModel.symbols === true){
         $scope.upperLowerArray = $scope.upperCaseArray.concat($scope.lowerCaseArray); 
         $scope.numbersSymbolsArray = $scope.numbersArray.concat($scope.symbolsArray); 
         $scope.upperLowerSymbolsNumbersArray = $scope.upperLowerArray.concat($scope.numbersSymbolsArray); 
         $scope.temp = Math.floor(Math.random()*$scope.upperLowerSymbolsNumbersArray.length);
         $scope.password += $scope.upperLowerSymbolsNumbersArray[$scope.temp]; 
         $scope.userform.password = $scope.password
       }
       else{
         // nothing happens
       }
    
     }
    };
  },
]);
