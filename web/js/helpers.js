app.factory('Helpers', [
  '$http',
  '$rootScope',
  '$state',
  function ($http, $rootScope, $state) {
    return {
      name: 'Helpers',
      Find: function (array, key, value) {
        for (var i = 0; i < array.length; i++) {
          if (array[i][key] && value && array[i][key] === value) {
            return array[i];
          }
        }
      },
      // ShowError: function (_msg) {
      //   console.log(_msg);
      //   $rootScope.Loading = false;
      //   $rootScope.errorMsg = _msg;
      //   $('.alert-danger').removeClass('in').show();
      //   $('.alert-danger').delay(4000).addClass('in').fadeOut(5000);
      // },
      ShowError: function (_msg) {
        $rootScope.Loading = false;
        $rootScope.errorMsg = _msg;
        $("#modalShowError").modal('show');

        },
      showToaster: function (_msg) {
        Swal.mixin({
          toast: false,
          position: 'top-center',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire({
          icon: 'success',
          title: _msg,
        });
      },
      showToasterNotification: function (_msg) {
        Swal.fire({
          text: _msg,
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton:false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#3085d6',
        
          cancelButtonText:"تأكيد"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              $rootScope.logout(),
             
              'تم تسجيل الخروج بنجاح',
            )
          }
        })
      },
      
      ShowLoader: function () {
        $rootScope.Loading = true;
      },
      HideLoader: function () {
        $rootScope.Loading = false;
      },
      CheckPermission: function (_codes) {
        token = localStorage.token;
        if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var permissions = JSON.parse(window.atob(base64)).Permission;
            for (var i = 0; i < _codes.length; i++) {
                if (permissions.indexOf(_codes[i]) < 0)
                    return false;
            }
            return true;
        } else {
            return false;
        }

    },
      showErrorMessage: function (_msg) {
        Swal.mixin({
          toast: false,
          position: 'top-center',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire({
          icon: 'error',
          title: _msg,
        });
      },
      
    };
  },
]);
