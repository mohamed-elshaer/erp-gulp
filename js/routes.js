app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/menu/dashboard");
  $stateProvider
    .state("login", {
      url: "/login",
      views: {
        "": {
          templateUrl: "views/login.html",
          controller: "loginCtrl",
        },
      },
    })
    .state("startCompany", {
      url: "/startCompany",
      views: {
        "": {
          templateUrl: "views/startCompany.html",
          controller: "startCompanycontroller",
        },
      },
    })
    .state("defaultCurrency", {
      url: "/defaultCurrency",
      templateUrl: "views/mainData/DefaultCurrency.html",
      controller: "currencyController",
    })
    .state("branch", {
      url: "/branch",
      templateUrl: "views/admin/startBranch.html",
      controller: "branchcontroller",
    })
    .state("confirmEmail", {
      url: "/confirmEmail",
      templateUrl: "views/confirmEmail.html",
      controller: "loginCtrl",
    })
    .state("successSubmitForm", {
      url: "/successSubmitForm",
      templateUrl: "views/successSubmitForm.html",
    })
    .state("rest-password", {
      url: "/reset-password",
      templateUrl: "views/reset-password.html",
      controller: "resetPasswordCtrl",
    })
    // menu
    .state("menu", {
      url: "/menu",
      abstract: true,
      templateUrl: "views/menu.html",
      controller: "menuCtrl",
      css: "css/custonsidebar.css",
    })
    .state("menu.reports", {
      url: "/reports",
      views: {
        pageContent: {
          templateUrl: "views/reports.html",
          controller: "reportsController",
        },
      },
    })
    .state("menu.dashboard", {
      url: "/dashboard",
      views: {
        pageContent: {
          templateUrl: "views/dashboard.html",
          controller: "dashboardCtrl",
        },
      },
    })
    .state("menu.users", {
      url: "/users",
      views: {
        pageContent: {
          templateUrl: "views/users.html",
          controller: "userscontroller",
        },
      },
    })
    .state("menu.adduser", {
      url: "/adduser",
      views: {
        pageContent: {
          templateUrl: "views/adduser.html",
          controller: "userscontroller",
        },
      },
    })
    .state("menu.roles", {
      url: "/roles",
      views: {
        pageContent: {
          templateUrl: "views/roles.html",
          controller: "rolescontroller",
        },
      },
    })
    .state("menu.changepassword", {
      url: "/changepassword",
      views: {
        pageContent: {
          templateUrl: "views/mainData/ChangePassword.html",
          controller: "changePasswordCtrl",
        },
      },
    })
    .state("menu.userprofile", {
      url: "/userprofile",
      views: {
        pageContent: {
          templateUrl: "views/mainData/userProfile.html",
          controller: "userProfileCtrl",
        },
      },
    })
    .state("menu.customers", {
      url: "/customers",
      views: {
        pageContent: {
          templateUrl: "views/admin/customers.html",
          controller: "CustomersController",
        },
      },
    })
    .state("menu.addCustomer", {
      url: "/addCustomer",
      views: {
        pageContent: {
          templateUrl: "views/admin/addCustomer.html",
          controller: "CustomersController",
        },
      },
    })
    .state("menu.editCustomer", {
      url: "/editCustomer",
      views: {
        pageContent: {
          templateUrl: "views/admin/editCustomer.html",
          controller: "CustomersController",
        },
      },
    })
    .state("menu.banks", {
      url: "/banks",
      views: {
        pageContent: {
          templateUrl: "views/mainData/list-banks.html",
          controller: "BanksController",
        },
      },
    })
    .state("menu.addbank", {
      url: "/addbank",
      views: {
        pageContent: {
          templateUrl: "views/mainData/banks.html",
          controller: "BanksController",
        },
      },
    })
    .state("menu.editbank", {
      url: "/editbank/:id",
      views: {
        pageContent: {
          templateUrl: "views/mainData/banks.html",
          controller: "BanksController",
        },
      },
    })
    .state("menu.suppliers", {
      url: "/suppliers",
      views: {
        pageContent: {
          templateUrl: "views/admin/suppliers.html",
          controller: "SuppliersController",
        },
      },
    })
    .state("menu.addSupplier", {
      url: "/addSupplier",
      views: {
        pageContent: {
          templateUrl: "views/admin/addSupplier.html",
          controller: "SuppliersController",
        },
      },
    })
    .state("menu.editSupplier", {
      url: "/editSupplier",
      views: {
        pageContent: {
          templateUrl: "views/admin/editSupplier.html",
          controller: "SuppliersController",
        },
      },
    })
    .state("menu.edituser", {
      url: "/edituser",
      views: {
        pageContent: {
          templateUrl: "views/edituser.html",
          controller: "userscontroller",
        },
      },
    })
    // .state("menu.addcompany", {
    //   url: "/addcompany",
    //   views: {
    //     pageContent: {
    //       templateUrl: "views/admin/addcompany.html",
    //       controller: "companycontroller",
    //     },
    //   },
    // })
    .state("menu.company", {
      url: "/company",
      views: {
        pageContent: {
          templateUrl: "views/admin/addcompany.html",
          controller: "companycontroller",
        },
      },
    })
    // .state("menu.editcompany", {
    //   url: "/editcompany",
    //   views: {
    //     pageContent: {
    //       templateUrl: "views/admin/addcompany.html",
    //       controller: "companycontroller",
    //     },
    //   },
    // })
    .state("menu.addbranch", {
      url: "/addbranch",
      views: {
        pageContent: {
          templateUrl: "views/admin/addbranch.html",
          controller: "branchcontroller",
        },
      },
    })
    .state("menu.editbranch", {
      url: "/editbranch/:id",
      views: {
        pageContent: {
          templateUrl: "views/admin/editbranch.html",
          controller: "branchcontroller",
        },
      },
    })
    .state("menu.branches", {
      url: "/branches",
      views: {
        pageContent: {
          templateUrl: "views/admin/Branch.html",
          controller: "branchcontroller",
        },
      },
    })
    .state("menu.manageroles", {
      url: "/manageroles/:id",
      views: {
        pageContent: {
          templateUrl: "views/manageroles.html",
          controller: "rolepermissioncontroller",
        },
      },
    })
    .state("menu.items", {
      url: "/items",
      views: {
        pageContent: {
          templateUrl: "views/user/items/items.html",
          controller: "itemcontroller",
        },
      },
    })
    .state("menu.additem", {
      url: "/additem",
      views: {
        pageContent: {
          templateUrl: "views/user/items/test.html",
          controller: "itemcontroller",
        },
      },
    })
    .state("menu.updateitem", {
      url: "/updateitem",
      views: {
        pageContent: {
          templateUrl: "views/user/items/edititem.html",
          controller: "itemcontroller",
        },
      },
    })
    .state("menu.categories", {
      url: "/categories",
      views: {
        pageContent: {
          templateUrl: "views/user/items/ListCategory.html",
          controller: "categoryController",
        },
      },
    })
    .state("menu.units", {
      url: "/units",
      views: {
        pageContent: {
          templateUrl: "views/user/items/ListUnit.html",
          controller: "unitController",
        },
      },
    })
    .state("menu.stores", {
      url: "/stores",
      views: {
        pageContent: {
          templateUrl: "views/user/items/ListStores.html",
          controller: "storeController",
        },
      },
    })
    .state("menu.configuration", {
      url: "/configuration",
      views: {
        pageContent: {
          templateUrl: "views/e-invoice/configuration.html",
          controller: "configurationController",
        },
      },
    })
    .state("menu.tree", {
      url: "/tree",
      views: {
        pageContent: {
          templateUrl: "js/tree/test/treeGrid.html",
          controller: "treeGridController",
        },
      },
    })
    .state("menu.accounts", {
      url: "/accounts",
      views: {
        pageContent: {
          templateUrl: "views/user/account/tree.html",
          controller: "accountcontroller",
        },
      },
    })
    .state("menu.inventories", {
      url: "/inventories",
      views: {
        pageContent: {
          templateUrl: "views/mainData/list-Inventories.html",
          controller: "inventoryController",
        },
      },
    })
    .state("menu.addInventory", {
      url: "/addInventory",
      views: {
        pageContent: {
          templateUrl: "views/mainData/editInventory.html",
          controller: "inventoryController",
        },
      },
    })
    .state("menu.editInventory", {
      url: "/editInventory/:id",
      views: {
        pageContent: {
          templateUrl: "views/mainData/editInventory.html",
          controller: "inventoryController",
        },
      },
    })
    .state("menu.paymoney", {
      url: "/paymoney",
      views: {
        pageContent: {
          templateUrl: "views/admin/payMoney.html",
          controller: "payMoneyController",
        },
      },
    })
    .state("menu.listpaymoney", {
      url: "/listpaymoney",
      views: {
        pageContent: {
          templateUrl: "views/admin/ListOfPayMoney.html",
          controller: "payMoneyController",
        },
      },
    })
    .state("menu.collectmoney", {
      url: "/collectmoney",
      views: {
        pageContent: {
          templateUrl: "views/admin/collectMoney.html",
          controller: "collectMoneyController",
        },
      },
    })
    .state("menu.listcollectmoney", {
      url: "/listcollectmoney",
      views: {
        pageContent: {
          templateUrl: "views/admin/ListOfCollectMoney.html",
          controller: "collectMoneyController",
        },
      },
    })
    .state("menu.currencies", {
      url: "/currencies",
      views: {
        pageContent: {
          templateUrl: "views/admin/currency.html",
          controller: "currencyController",
        },
      },
    })
    .state("menu.taxes", {
      url: "/taxes",
      views: {
        pageContent: {
          templateUrl: "views/admin/tax.html",
          controller: "taxController",
        },
      },
    })
    .state("menu.transactions", {
      url: "/transactions",
      views: {
        pageContent: {
          templateUrl: "views/admin/transactions.html",
          controller: "transactionController",
        },
      },
    })
    .state("menu.transactions-report", {
      url: "/transactions-report",
      views: {
        pageContent: {
          templateUrl: "views/admin/transactionsReport.html",
          controller: "transactionsReportController",
        },
      },
    })
    .state("menu.storesetting", {
      url: "/storesetting",
      views: {
        pageContent: {
          templateUrl: "views/mainData/storesetting.html",
          controller: "storesettingcntr",
        },
      },
    })
    .state("menu.bankaccount", {
      url: "/bankaccount",
      views: {
        pageContent: {
          templateUrl: "views/admin/ListBankAccounts.html",
          controller: "bankaccountController",
        },
      },
    })
    .state("menu.AddBankAccount", {
      url: "/bankaccount",
      views: {
        pageContent: {
          templateUrl: "views/admin/bankaccount.html",
          controller: "bankaccountController",
        },
      },
    })
    .state("menu.editBankAccount", {
      url: "/editBankAccount",
      views: {
        pageContent: {
          templateUrl: "views/admin/editBankAccount.html",
          controller: "bankaccountController",
        },
      },
    })
    .state("menu.supplierinvoice", {
      url: "/supplierinvoice",
      views: {
        pageContent: {
          templateUrl: "views/invoice/supplierinvoice.html",
          controller: "supplierinvoicectr",
        },
      },
    })
    .state("menu.addsupplierinvoice", {
      url: "/addsupplierinvoice",
      views: {
        pageContent: {
          templateUrl: "views/invoice/addsupplierinvoice.html",
          controller: "supplierinvoicectr",
        },
      },
    })
    .state("menu.addStoreRelocation", {
      url: "/addStoreRelocation",
      views: {
        pageContent: {
          templateUrl: "views/StoreRelocation/addStoreRelocation.html",
          controller: "storeRelocationCtrl",
        },
      },
    })
    .state("menu.storeRelocation", {
      url: "/getStoreRelocation",
      views: {
        pageContent: {
          templateUrl: "views/StoreRelocation/getStoreRelocation.html",
          controller: "storeRelocationCtrl",
        },
      },
    })

    .state("menu.customerInvoice", {
      url: "/customerInvoice",
      views: {
        pageContent: {
          templateUrl: "views/invoice/customerInvoice.html",
          controller: "customerInvoiceController",
        },
      },
    })
    .state("menu.addcustomerInvoice", {
      url: "/addcustomerInvoice",
      views: {
        pageContent: {
          templateUrl: "views/invoice/addcustomerInvoice.html",
          controller: "customerInvoiceController",
        },
      },
    })
    .state("menu.addTransaction", {
      url: "/addTransaction",
      views: {
        pageContent: {
          templateUrl: "views/admin/addTransactions.html",
          controller: "transactionController",
        },
      },
    })
    .state("menu.logs", {
      url: "/logs",
      views: {
        pageContent: {
          templateUrl: "views/mainData/logs.html",
          controller: "logsController",
        },
      },
    })
    .state("menu.report", {
      url: "/report",
      views: {
        pageContent: {
          templateUrl: "views/admin/report.html",
          controller: "Report",
        },
      },
    })
    .state("menu.addaccount", {
      url: "/addaccount",
      views: {
        pageContent: {
          templateUrl: "views/accounts/addaccount.html",
          controller: "accountcontroller",
        },
      },
    })
    .state("menu.backup", {
      url: "/backup",
      views: {
        pageContent: {
          templateUrl: "views/admin/backup.html",
          controller: "backupController",
        },
      },
    });
    ;
  $urlRouterProvider.otherwise("/login");
});
