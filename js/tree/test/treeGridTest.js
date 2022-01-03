(function () {
  //   var app, deps;

  //   deps = ["treeGrid"];

  //   app = angular.module("treeGridTest", deps);

  app.controller("treeGridController", function ($scope, $timeout, accounts,Helpers,$state, $rootScope, Translate) {
    var tree;
    $scope.Translate = Translate;
    var rawTreeData = [];
    $scope.init = function () {
      accounts.get_account_tree().then(function (res) {
        res.data.forEach((element) => {
          rawTreeData.push(element);
        });

        console.log(rawTreeData);
      },(_ex)=>{
        if(_ex.status==403){
          Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
          $state.go('login')
        }
     
      });
    };

    $timeout($scope.init);

    var myTreeData = getTree(rawTreeData);

    $scope.tree_data = rawTreeData;
    //$scope.my_tree = tree = {};
    $scope.expanding_property = {
      field: "accountNameArabic",
      displayName: "اسم الحساب",
      sortable: true,
      filterable: true,
      cellTemplate: ` <i ng-class="{'icon ni ni-chevron-left' : !row.branch.expanded, 'icon ni ni-chevron-down' : !!row.branch.expanded, 'icon ni ni-minus' : row.branch.children.length == 0}"></i><strong class="text-right">{{row.branch[expandingProperty.field]}}</strong>`,
    };
    console.log($scope.expanding_property);
    $scope.col_defs = [
      {
        field: "code",
        sortable: true,
        displayName: "الكود",
        sortingType: "number",
        filterable: true,
      },

      {
        field: "debit",
        sortable: true,
        displayName: "مدين",
        sortingType: "number",
        filterable: true,
      },
      {
        field: "credit",
        displayName: "دائن",
        sortable: true,
        sortingType: "number",
        filterable: true,
      },
      {
        field: "balance",
        displayName: "الرصيد",
        sortable: true,
        sortingType: "number",
      },
      {
        field: "accountParent",
        displayName: "الحساب الرئيسي",
        cellTemplate:
          "<span>{{row.branch[col.field].accountNameArabic}}</span>",
      },
      {
        field: "accountNature",
        displayName: "طبيعه الحساب",
        cellTemplate:
          "<span>{{row.branch[col.field].accountNatureNameArabic}}</span>",
      },
      {
        field: "accountLevel",
        displayName: "المستوي",
        cellTemplate:
          "<span>{{row.branch[col.field].accountLevelNameArabic}}</span>",
      },
    ];
    $scope.col_defse = [
      {
        field: "code",
        sortable: true,
        displayName: "Code",
        sortingType: "number",
        filterable: true,
      },

      {
        field: "debit",
        sortable: true,
        sortingType: "number",
        filterable: true,
      },
      {
        field: "credit",
        sortable: true,
        sortingType: "number",
        filterable: true,
      },
      {
        field: "balance",
        sortable: true,
        sortingType: "number",
      },
      {
        field: "accountParent",
        displayName: "accountParent",
        cellTemplate: "<span>{{row.branch[col.field].accountName}}</span>",
      },
      {
        field: "accountNature",
        displayName: "accountNature",
        cellTemplate:
          "<span>{{row.branch[col.field].accountNatureName}}</span>",
      },
      {
        field: "accountLevel",
        displayName: "accountLevel",
        cellTemplate: "<span>{{row.branch[col.field].accountLevelName}}</span>",
      },
    ];
    $scope.my_tree_handler = function (branch) {
      console.log("you clicked on", branch);
    };

    function getTree(data) {
      if (data.length == 0) return [];

      var tree = [],
        rootIds = [],
        item = data[0],
        treeObjs = {},
        tempChildren = {},
        parentId,
        parent,
        len = data.length,
        i = 0;

      while (i < len) {
        item = data[i++];
        primaryKey = item.accountId;

        item.children = data.children;

        treeObjs = item;
        parentId = item.accountParent.accountId;

        parent = item.accountParent;

        if (!parent) {
          var siblings = item.children;
          if (siblings) {
            siblings.push(item);
          } else {
            item.children = [item];
          }
        } else if (parent.children) {
          parent.children.push(item);
        } else {
          parent.children = [item];
        }

        for (var i = 0; i < rootIds.length; i++) {
          tree.push(treeObjs[rootIds[i]]);
        }
        console.log(tree);
        return tree;
      }
    }
  });
}.call(this));
