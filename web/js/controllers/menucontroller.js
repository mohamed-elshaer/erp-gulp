app.controller(
  "menuCtrl",
  function (
    $scope,
    API,
    $rootScope,
    $state,
    Translate,
    $timeout,
    $http,
    $window,
    userProfile,
    user,
    $filter,
    company,
    Helpers,
    toast,
  ) {
    
    getBranchForUser()
     //signalr
     var connection = new signalR.HubConnectionBuilder().withUrl(`${API.url}notificationHub`,
     {
      accessTokenFactory: () => localStorage.token
  })
     .configureLogging(signalR.LogLevel.Information).build();
     try {
       connection.on("UserNotification", function (message,user) {
       var userObj=JSON.parse(localStorage.userObj)
         $scope.notify=message;
         if($scope.notify=="Message_NOTIFY"&&user==userObj.userId){
           Helpers.showToasterNotification(Translate[$rootScope.lang].MSG_SAME_USER_LOGGED)
           $rootScope.logout()
         }
       });
     } catch (err) {
       setTimeout(() => start(), 1000);
     }
     try {
      connection.on("ProductNotification", function (message,branch) {
        if(branch.branchId==$scope.defaultObj.branch.branchId){
      //  Helpers.showToasterNotification(message)
      toast.create({
        timeout:  3000,
        maxToast: 10,
        message: message,
        className: 'alert-warning',
        position:'right',
        dismissible: false
      });
        }
        })
      
    } catch (err) {
      setTimeout(() => start(), 1000);
    }
    
     connection.start().then(function () {
       console.log("START");
     }).catch(function (err) {
       connection.start();
       console.log("START");
     });
    
  
    // when you add new sidebar item you must check userrole on it

    $scope.init = function () {
      if(!localStorage.token){
        $state.go("login")
      }
      if (localStorage.lang && localStorage.lang == "ltr") {
         
        $rootScope.lang = "ltr";
        localStorage.lang = "ltr"
        
    }else{
         
        $rootScope.lang = "rtl";
        localStorage.lang = "rtl"
    } 
  
      // $rootScope.lang = localStorage.lang;
      $scope.defaultObj = {};
      $scope.menu = [];
      $scope.updatedMenu = [];
      $rootScope.emptyFavLst = true;
      $scope.favListMenu = [];
      $rootScope.userObj = JSON.parse(localStorage.userObj);
      if (localStorage.Menu) {
        $scope.favListMenu = JSON.parse(localStorage.Menu)
    }
      $rootScope.CheckPerm = Helpers.CheckPermission;
      $scope.Translate = Translate;
      // $rootScope.getUserProfileData()        
      
     
      $rootScope.userrole = JSON.parse(
        window.atob(localStorage.token.split(".")[1])
      ).role;

      $rootScope.getallbranch();
      getBranchForUser()
    };
    $rootScope.getallbranch = function() {
      company.getbranchesbyuserIdReq().then(function (res) {
        $scope.branches = res.data;

        for (let index = 0; index < $scope.branches.length; index++) {
          if (res.data[index].view) {
            $scope.defaultObj.branch = $scope.branches[index]

          }
        }
      });
    }
    function getBranchForUser() {
      company.getbranchebyuserIdReq().then(function (res) {
        $scope.branchForUser = res.data
      })
    }
    $scope.setLang = function (_range) {
      if (_range == 'ltr') {
        console.log('ww')
        localStorage.changeLang = JSON.stringify(_range)
      } else if (_range == 'rtl') {
        localStorage.changeLang = JSON.stringify(_range)
      }
      $window.location.reload();
    }
    $timeout($scope.init, 10);
    $scope.changebranch = function (branchId) {
      company.ChangeBranch(branchId).then(function (res) {
        Helpers.showToaster(res.data.message);
        $rootScope.getallbranch();
        $state.go("menu.dashboard");
      });
    };
    $scope.active = "";
    $scope.makeActive = function (item) {
      $scope.active = $scope.active == item ? "" : item;
    };
    $http.get("menu.json").success(function (data) {
      $scope.menu = data;
      $scope.updatedMenu = data;
      $scope.updatedMenu = $scope.updatedMenu.filter(function (_item) {
        if (_item.List) {
          _item.List = _item.List.filter(function (_sub) {
          return Helpers.CheckPermission(_sub.Perm);
          })
        }
      $scope.menu = $scope.updatedMenu;
      $scope.favListMenu = []
      localStorage.menu = JSON.stringify($scope.menu);
      $rootScope.emptyFavLst = true
      for (let i = 0; i < $scope.menu.length; i++) {
          if ($scope.menu[i].List) {
              for (let j = 0; j < $scope.menu[i].List.length; j++) {
                  if ($scope.menu[i].List[j].fav == true) {
                      $rootScope.emptyFavLst = false;
                      var indx = $scope.favListMenu.indexOf($scope.menu[i].List[j]);
                      if (indx > -1) {} else {
                          if ($scope.favListMenu.length < 10) {
                              $scope.filteredMenu = $filter('filter')($scope.favListMenu, function (item) {
                                  return item.Name == $scope.menu[i].List[j].Name
                              });
                              if ($scope.filteredMenu.length > 0) {

                              } else {
                                  $scope.favListMenu.push($scope.menu[i].List[j])
                              }
                          } else {
                              $rootScope.emptyFavLst = false;
                              Helpers.showErrorMessage("الحد اﻷقصي 10 شاشات في القائمه");
                              $scope.menu[i].List[j].fav = false
                          }
                      }
                  }
              }
          }
      }
      localStorage.Menu = JSON.stringify($scope.favListMenu);
    })
      $scope.$applyAsync();
    });
    $scope.state = function (_to) {
      $state.go(_to.Rout);
    }
    $scope.toggleFav = function (_obj) {
      console.log(_obj);
      _obj.fav = !_obj.fav
      $scope.favListMenu = []
      localStorage.menu = JSON.stringify($scope.menu);
      $rootScope.emptyFavLst = true
      for (let i = 0; i < $scope.menu.length; i++) {
          if ($scope.menu[i].List) {
              for (let j = 0; j < $scope.menu[i].List.length; j++) {
                  if ($scope.menu[i].List[j].fav == true) {
                      $rootScope.emptyFavLst = false;
                      var indx = $scope.favListMenu.indexOf($scope.menu[i].List[j]);
                      if (indx > -1) {} else {
                          if ($scope.favListMenu.length < 9) {
                              $scope.filteredMenu = $filter('filter')($scope.favListMenu, function (item) {
                                  return item.Name == $scope.menu[i].List[j].Name
                              });
                              if ($scope.filteredMenu.length > 0) {

                              } else {
                                  $scope.favListMenu.push($scope.menu[i].List[j])
                              }
                          } else {
                              $rootScope.emptyFavLst = false;
                              Helpers.showErrorMessage("الحد اﻷقصي 9 شاشات في القائمه");
                              $scope.menu[i].List[j].fav = false
                          }
                      }
                  }
              }
          }
      }
      localStorage.Menu = JSON.stringify($scope.favListMenu);
  }
    $scope.toggleside = function ($event) {
      console.log($event);
      var a = document.getElementsByClassName("nk-sidebar");
      var content = document.getElementsByClassName("nk-content");
      $event.currentTarget.classList.toggle("toggle-active");
      a[0].classList.toggle("nk-sidebar-active");
      content[0].classList.toggle("mytoggleside");
    };
    $rootScope.toggledark = function () {
      var element = document.getElementById("myDIV");
      element.classList.toggle("nk-body");
      element.classList.toggle("dark-mode");
    };
    $rootScope.arabiclang = function () {
      $rootScope.lang = "rtl";
      localStorage.lang = "rtl";
      var element = document.getElementById("myDIV");
      element.toggleAttribute("dir", "rtl");
    };
    $rootScope.englishlang = function () {
      $rootScope.lang = "ltr";
      localStorage.lang = "ltr";
      var element = document.getElementById("myDIV");
      element.toggleAttribute("dir", "ltr");
    };
    $rootScope.logout = function () {
      var userObj=JSON.parse(localStorage.userObj);
       user.UpdateLoggedIn(userObj.userId);
     delete localStorage.menu;
     delete localStorage.token;
     delete localStorage.userObj;
    
      $state.go("login");
    };
  
    // $window.onbeforeunload = $rootScope.logout;
    // var expDate =new Date($scope.tokenObj.exp) ;
    // var today = new Date();
    // console.log(expDate);
    // console.log(expDate<today);
    // if (expDate < today) {
    //   var userObj=JSON.parse(localStorage.userObj);
    //    user.UpdateLoggedIn(userObj.userId);
    //  delete localStorage.menu;
    //  delete localStorage.token;
    //  delete localStorage.userObj;
    
    //   $state.go("login");
      
    // }
    $scope.go = function (_obj) {
      console.log(_obj);
      $scope.activeSup = _obj.Name;
      if (_obj.Rout == "login") {
        $scope.logOutFrom();
      } else if (_obj.Rout && !_obj.List) {
        if (_obj.Parameter) {
          var url = "#/menu/" + _obj.Rout + "/" + _obj.Parameter;
          window.open(url, _obj.Target);
          if (window.innerWidth < 500) {
            $('.nk-sidebar').removeClass("nk-sidebar-active");
            $('.nk-content').removeClass("mytoggleside");
              $('nk-sidebar').removeClass('nk-sidebar-active');
            }
        } else {
           $state.go(_obj.Rout);
           if (window.innerWidth < 500) {
            $('.nk-sidebar').removeClass("nk-sidebar-active");
            $('.nk-content').removeClass("mytoggleside");
            $('nk-sidebar').removeClass('nk-sidebar-active');
            }
          // var url = $state.href(_obj.Rout);
          // window.open(url, _obj.Target);
        }
      }
    };
    
    $rootScope.getUserProfileData=function(){
      userProfile.userData().then(function(res){
        $scope.userProfileData=res.data
      })
    }
    $scope.setActive = function (_id) {
      $scope.ativetab = _id;
    };
  }
);
