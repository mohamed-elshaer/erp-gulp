app.controller("supplierinvoicectr", [
  "$scope",
  "supplierinvoice",
  "supplier",
  "$timeout",
  "company",
  "item",
  "accounts",
  "currency",
  "tax",
  "payMoney",
  "Translate",
  "bank",
  "inventory",
  "Helpers",
  "$state",
  "$rootScope",
  "ReportService",
  "Fullccreen",
  "Excel",
  "costcenterservice",
  function (
    $scope,
    supplierinvoice,
    supplier,
    $timeout,
    company,
    item,
    accounts,
    currency,
    tax,
    payMoney,
    Translate,
    bank,
    inventory,
    costcenterservice,
    Helpers,
    $state,
    $rootScope,
    ReportService,
    Fullccreen,
    Excel
  ) {
    $rootScope.lang = localStorage.lang;
    $scope.Translate = Translate;
    $scope.init = function () {
      getallcostcenter();
      getsuppliersinvoices();
      getallsupplier();
      getallproducts();
      getallinvandbank();
      getdefaultcurrency();
      getTax();
      currency.getAllCurrencies().then(function (res) {
        $scope.currencyLst = res.data;
        $scope.defaultCurrancy = $scope.currencyLst.filter(function (_obj) {
          return _obj.default === true;
        });
        if ($scope.defaultCurrancy.length > 0) {
          $scope.supplierinvoiceform.currencyId = $scope.defaultCurrancy[0].id;
          $scope.currentObj1.currencyId = $scope.defaultCurrancy[0].id;
          $scope.InvObj.currencyId = $scope.defaultCurrancy[0].id;
        }
      });
      // getallcurrency();
      getpaymenttype();
      getallstores();
      getBankData();

      $scope.supId = 0;
      $scope.havestore = false;
      $scope.allurl = `https://reports.code-iss.com:443/Report/inv?supId=${$scope.supId}`;
    };

    function getallcostcenter() {
      costcenterservice.getAllReq().then(function (res) {
        $scope.costcenters = res.data;
      });
    }
    function getallstores() {
      item.getallstoreReq().then(function (res) {
        $scope.stores = res.data;
        // $scope.supplierinvoiceform.storeId = $scope.stores[0].id
      });
    }
    function getsuppliersinvoices() {
      supplierinvoice.GetSupplierinvoices().then(function (res) {
        $scope.invoices = res.data;
      });
    }
    function getallsupplier() {
      supplier.getAllSuppliers().then(function (res) {
        $scope.suppliers = res.data;
      });
    }
    $scope.toggleFullScreen = function () {
      Fullccreen.toggleFullScreen();
    };
    document.addEventListener("webkitfullscreenchange", function (event) {});

    /* IE / Edge */
    document.addEventListener("msfullscreenchange", function (event) {
      Fullccreen.toggleFullScreen();
    });
    function getallproducts() {
      item.getallproductReq().then(function (res) {
        $scope.products = res.data;
      });
    }
    function getallinvandbank() {
      accounts.getallinvandbankacc().then(function (res) {
        $scope.invandbanks = res.data;
        $scope.invandbanks.forEach((element) => {
          element.groupby = element.accountParent.accountNameArabic;
        });
      });
    }

    function getdefaultcurrency() {
      currency.GetDefaultCurrency().then(function (res) {
        $scope.currency = res.data;
        $scope.currentfactor = res.data.factor;
      });
    }

    function getTax() {
      tax.getAllTaxes().then(function (res) {
        $scope.taxes = res.data;
      });
    }
    function getpaymenttype() {
      payMoney.GetPaymentTypesReq().then(function (res) {
        $scope.paymenttypes = res.data;
      });
    }
    // $scope.addpaymenttype = function (data) {
    //   supplierinvoiceform.addpaymenttype(data).then(
    //     function (res) {
    //       $state.go('menu.supplierinvoiceform');
    //     },
    //   )
    // }
    $scope.getproductbtstore = function () {
      $scope.havestore = true;
      item
        .getallproductByStoreId($scope.supplierinvoiceform.storeId)
        .then(function (res) {
          $scope.producsbystore = res.data;
        });
    };

    $scope.currentObj1 = {
      currencyId: 0,
    };
    $scope.InvObj = {
      currencyId: 0,
    };

    $scope.supplierinvoiceform = {
      invoiceNumber: 0,
      description: "",
      supplierId: null,
      invoiceDate: new Date(),
      paymentTypeId: null,
      currencyId: 0,
      storeId: null,
      supplierInvoiceDetails: [],
      totalDiscountAmount: 0,
      accountPayFromId: 0,
      storeId: 0,
      insuranceExpense: 0,
      transportExpense: 0,
    };

    $scope.paysome = {
      accountPayFromId: 0,
      accountPayToId: 0,
      amount: 0,
      description: "",
      currencyId: 0,
      date: Date.now,
      refrenceId: 0,
      total: 0,
      productId: 0,
    };

    $scope.Delay = {
      supplierId: 0,
      productId: 0,
      amount: 0,
      description: "",
      currencyId: 0,
      date: Date.now,
      refrenceId: 0,
    };

    $scope.setpay = function (data) {
      $scope.paytype = data;
    };

    $scope.alltax = [];
    $scope.show = {
      totalunitprice: 0,
      discount: 0,
      tax: 0,
      totalPrice: 0,
    };
    $timeout($scope.init, 10);
    $scope.units = [];
    $scope.passunits = function (data, i) {
      data.units.forEach((element) => {
        if (element.defaultPurchasing) {
          $scope.units.push(element);
          $scope.supplierinvoiceform.supplierInvoiceDetails[i].unitId =
            element.id;
          console.log($scope.units);
          $scope.supplierinvoiceform.supplierInvoiceDetails[i].unitPrice =
            element.purchasingprice;
        }
      });
    };

    $scope.calccost = function (i) {
      var x =
        $scope.supplierinvoiceform.supplierInvoiceDetails[i].unitPrice *
        $scope.supplierinvoiceform.supplierInvoiceDetails[i].quantity;

      $scope.supplierinvoiceform.supplierInvoiceDetails[i].totalUnitPrice =
        Math.floor(x);

      $scope.totalafterdicount = Math.floor(
        $scope.supplierinvoiceform.supplierInvoiceDetails[i].totalUnitPrice -
          $scope.supplierinvoiceform.supplierInvoiceDetails[i].totalUnitPrice *
            ($scope.supplierinvoiceform.supplierInvoiceDetails[i].discount /
              100)
      );
      $scope.supplierinvoiceform.supplierInvoiceDetails[i].totalPrice =
        Math.floor($scope.totalafterdicount + 0);

      $scope.supplierinvoiceform.supplierInvoiceDetails[i].unitPrice =
        Math.floor(
          $scope.supplierinvoiceform.supplierInvoiceDetails[i].totalPrice /
            $scope.supplierinvoiceform.supplierInvoiceDetails[i].quantity
        );
      //calc show
      $scope.show.totalunitprice = 0;
      $scope.supplierinvoiceform.supplierInvoiceDetails.forEach((element) => {
        $scope.show.totalunitprice += element.totalUnitPrice;
      });
      $scope.calctotal($scope.alltax[i].tax, i);
    };
    $scope.newItem = function () {
      var newWidow = window.open(
        "/#/menu/additem",
        "",
        "width=" + screen.availWidth + ",height=" + screen.availHeight
      );
      //  newWidow.onbeforeunload =  $scope.co();
      var popupTick = setInterval(function () {
        if (newWidow.closed) {
          clearInterval(popupTick);
          $scope.co();
        }
      }, 500);

      return false;
    };
    $scope.co = function () {
      getallproducts();
      $scope.init();
      item
        .getallproductByStoreId($scope.supplierinvoiceform.storeId)
        .then(function (res) {
          $scope.producsbystore = res.data;
        });
    };
    $scope.calccurrency = function (data) {
      $scope.currencydata = data;
      $scope.currentfactor = data.factor;
      console.log($scope.currentfactor);
    };
    $scope.updatecurrency = function () {
      $scope.currencydata.factor = $scope.currentfactor;
      currency
        .updateCurrency($scope.currencydata, $scope.currencydata.id)
        .then(function (res) {});
    };
    $scope.addCurrency = function (data) {
      if (!data.id) {
        currency.addCurrency(data).then(
          function (res) {
            $("#currencyModal").modal("hide");

            Helpers.showToaster(
              Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY
            );
            currency.getAllCurrencies().then(function (res) {
              $scope.currencyLst = res.data;
            });
            $scope.currencyObj = null;
            $scope.init();
          },
          (_ex) => {
            Helpers.showErrorMessage(_ex.data.message);
          }
        );
      } else {
        currency.updateCurrency(data, data.id).then(
          function (res) {
            Helpers.showToaster(
              Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY
            );
            $("#currencyModal").modal("hide");
            $scope.currencyObj = null;

            $scope.init();
          },
          (_ex) => {
            if (_ex.status == 400)
              Helpers.showErrorMessage(
                Translate[$rootScope.lang].MSG_DEFAULTCURRENCYEXIST
              );
          }
        );
      }
    };

    $scope.addstore = function (data) {
      item.addstoreReq(data).then(
        function (res) {
          //handle
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          getallstores();
        },
        (_ex) => {
          if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $state.go("login");
          } else if (_ex.status == 400) {
            Helpers.showErrorMessage(
              Translate[$rootScope.lang].MSG_STORE_EXIST
            );
          }
        }
      );
    };

    $scope.calctotal = function (data, i) {
      $scope.alltax[i].tax = data;
      $scope.totalafterdicount = Math.floor(
        $scope.supplierinvoiceform.supplierInvoiceDetails[i].totalUnitPrice -
          $scope.supplierinvoiceform.supplierInvoiceDetails[i].totalUnitPrice *
            ($scope.supplierinvoiceform.supplierInvoiceDetails[i].discount /
              100)
      );
      $scope.supplierinvoiceform.supplierInvoiceDetails[i].totalPrice =
        Math.floor(
          $scope.totalafterdicount +
            $scope.totalafterdicount * (data.amount / 100)
        );

      // $scope.supplierinvoiceform.supplierInvoiceDetails[i].unitPrice =
      //   Math.floor(
      //     $scope.supplierinvoiceform.supplierInvoiceDetails[i].totalPrice /
      //       $scope.supplierinvoiceform.supplierInvoiceDetails[i].quantity
      //   );

      // calc show
      $scope.show.tax = 0;
      $scope.supplierinvoiceform.supplierInvoiceDetails.forEach((element) => {
        var taxamount = Math.floor(
          (data.amount / 100) * element.totalUnitPrice
        );
        $scope.show.tax += taxamount;
      });
      // calc show
      $scope.show.totalPrice = 0;
      $scope.supplierinvoiceform.supplierInvoiceDetails.forEach((element) => {
        $scope.show.totalPrice += element.totalPrice;
      });
    };
    $scope.removerow = function (row, i) {
      debugger;
      $scope.supplierinvoiceform.supplierInvoiceDetails.splice(i, 1);
      $scope.show.totalunitprice = 0;
      $scope.supplierinvoiceform.supplierInvoiceDetails.forEach((element) => {
        $scope.show.totalunitprice += element.totalUnitPrice;
      });

      $scope.show.discount = 0;
      $scope.supplierinvoiceform.supplierInvoiceDetails.forEach((element) => {
        $scope.show.discount += Math.floor(
          element.totalUnitPrice * (element.discount / 100)
        );
      });

      $scope.taxes.forEach((element) => {
        if (element.id == row.taxId) {
          $scope.show.tax -= Math.floor(
            (row.totalUnitPrice * element.amount) / 100
          );
          if ($scope.show.tax <= 0) {
            $scope.show.tax = 0;
          }
        }
      });

      $scope.show.totalPrice -= row.totalPrice;
    };

    $scope.addrow = function () {
      $scope.getproductbtstore();
      var a = {
        unitId: 0,
        quantity: 0,
        unitPrice: 0,
        totalUnitPrice: 0,
        discount: 0,
        totalPrice: 0,
        productId: null,

        taxId: $scope.taxes[0].id,
      };
      var b = { tax: $scope.taxes[0] };
      if ($scope.supplierinvoiceform.storeId) {
        $scope.supplierinvoiceform.supplierInvoiceDetails.push(a);
        $scope.alltax.push(b);
      } else {
        Swal.fire({
          icon: "warning",
          title: "تحذير",
          text: "يجب اختيار مخزن اولا",
        });
      }
    };

    $scope.dicountclsh = function (i) {
      $scope.show.discount = 0;
      $scope.supplierinvoiceform.supplierInvoiceDetails.forEach((element) => {
        var disamount = Math.floor(
          (element.discount / 100) * element.totalUnitPrice
        );
        $scope.show.discount += disamount;
      });
      $scope.calctotal($scope.alltax[i].tax, i);
    };

    $scope.taxclsh = function (data) {
      $scope.show.tax = 0;
      $scope.supplierinvoiceform.supplierInvoiceDetails.forEach((element) => {
        var taxamount = Math.floor(
          (data.amount / 100) * element.totalUnitPrice
        );
        $scope.show.tax += taxamount;
      });
    };

    $scope.totalunitclsh = function () {
      $scope.show.totalunitprice = 0;
      $scope.supplierinvoiceform.supplierInvoiceDetails.forEach((element) => {
        $scope.show.totalunitprice += element.totalUnitPrice;
      });
    };
    $scope.totalclsh = function () {
      $scope.show.totalPrice = 0;
      $scope.supplierinvoiceform.supplierInvoiceDetails.forEach((element) => {
        $scope.show.totalPrice += element.totalPrice;
      });
    };
    $scope.addinvoice = function (data) {
      console.log(data);
      if ($scope.paytype == "اجل") {
        const wanttopay = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        wanttopay
          .fire({
            title: "هل تريد سداد جزء",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
            reverseButtons: false,
          })
          .then((result) => {
            if (result.isConfirmed) {
              $("#paymoney").modal();
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              const wanttopayno = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
              });
              wanttopayno
                .fire({
                  title: "تأكيد ",
                  text: "تأكيد الحفظ",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "نعم",
                  cancelButtonText: "لا",
                  reverseButtons: false,
                })
                .then((res) => {
                  if (res.isConfirmed) {
                    supplierinvoice
                      .AddsupplierinvoiceReq(data)
                      .then(function (res) {
                        if (res.status == 201) {
                          $scope.Delay.supplierId = $scope.suptopay.accountId;
                          $scope.Delay.productId =
                            $scope.supplierinvoiceform.supplierInvoiceDetails[0].productId;
                          $scope.Delay.amount = $scope.show.totalPrice;
                          $scope.Delay.description =
                            $scope.supplierinvoiceform.description;
                          $scope.Delay.currencyId =
                            $scope.supplierinvoiceform.currencyId;
                          $scope.invdata = res.data;
                          $scope.Delay.refrenceId = parseInt(
                            $scope.invdata.message
                          );
                          payMoney
                            .addPayMoneySpendForSupDelay($scope.Delay)
                            .then(function (res) {
                              if (res.status == 201) {
                                Helpers.showToaster("تم الحفظ");
                                $state.go("menu.supplierinvoice");
                              } else {
                                Helpers.ShowError(res.data.message);
                              }
                            });
                        }
                      });
                  } else {
                    Helpers.showToaster("تم الالغاء");
                  }
                });
            }
          });
      } else if ($scope.paytype == "نقدي") {
        const wanttopaycash = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        wanttopaycash
          .fire({
            title: "تأكيد ",
            text: "تأكيد الحفظ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
            reverseButtons: false,
          })
          .then((res) => {
            if (res.isConfirmed) {
              supplierinvoice.AddsupplierinvoiceReq(data).then(function (res) {
                if (res.status == 201) {
                  Helpers.showToaster("تم الحفظ");
                  $state.go("menu.supplierinvoice");
                }
              });
            } else {
              Helpers.showToaster("تم الالغاء");
            }
          });
      }
    };

    $scope.suppliertopay = function (data) {
      supplier.getAllSupplierBycode(data.code).then(function (res) {
        $scope.suptopay = res.data;
        $scope.paysome.accountPayToId = $scope.suptopay.accountId;
      });
    };

    $scope.setFromAccBalance = function (data) {
      $scope.accbalance = data.balance;
    };

    $scope.addPaysome = function (data) {
      supplierinvoice
        .AddsupplierinvoiceReq($scope.supplierinvoiceform)
        .then(function (res) {
          if (res.status == 201) {
            $scope.invdata = res.data;
            $scope.paysome.refrenceId = parseInt($scope.invdata.message);
            $scope.paysome.productId =
              $scope.supplierinvoiceform.supplierInvoiceDetails[0].productId;
            $scope.paysome.total = $scope.show.totalPrice;
            payMoney.addPayMoneySpendForSupSome(data).then(function (res) {
              if (res.status == 201) {
                $("#paymoney").modal("hide");
                Helpers.showToaster("تم الحفظ");
                $state.go("menu.supplierinvoice");
              } else {
                Helpers.ShowError(res.data.message);
              }
            });
          }
        });
    };

    $scope.filldata = function (data) {
      $scope.supplierReturnInvoice = data;
      console.log(data);
    };

    $scope.filldataforreturn = function (data) {
      $scope.returnform = {
        invoiceNumber: data.invoiceNumber,
        returnsInvoiceDetailsViewModel: [],
      };
      data.supplierInvoiceDetails.forEach((element) => {
        var a = {
          unit: element.unit,
          quantity: element.quantity,
          unitPrice: element.unitPrice,
          totalPrice: element.totalPrice,
          discount: element.discount,
          total: element.total,
          taxId: element.tax.id,
          productId: element.product.id,
          amountoftax: element.tax.amount,
        };
        $scope.returnform.returnsInvoiceDetailsViewModel.push(a);
      });
    };

    $scope.calcforreturn = function (i) {
      if (
        $scope.returnform.returnsInvoiceDetailsViewModel[i].quantity >
        $scope.supplierReturnInvoice.supplierInvoiceDetails[i].quantity
      ) {
        Swal.fire({
          icon: "warning",
          title: "تحذير",
          text:
            "الكميه المراد ارجاعها يجب ان لا تتعدي " +
            $scope.supplierReturnInvoice.supplierInvoiceDetails[
              i
            ].quantity.toString(),
        });
        $scope.returnform.returnsInvoiceDetailsViewModel[i].quantity =
          $scope.supplierReturnInvoice.supplierInvoiceDetails[i].quantity;
      }
      $scope.returnform.returnsInvoiceDetailsViewModel[i].totalPrice =
        $scope.returnform.returnsInvoiceDetailsViewModel[i].unitPrice *
        $scope.returnform.returnsInvoiceDetailsViewModel[i].quantity;

      $scope.amountafterdis =
        $scope.returnform.returnsInvoiceDetailsViewModel[i].totalPrice -
        $scope.returnform.returnsInvoiceDetailsViewModel[i].totalPrice *
          ($scope.returnform.returnsInvoiceDetailsViewModel[i].discount / 100);

      $scope.returnform.returnsInvoiceDetailsViewModel[i].total =
        $scope.amountafterdis +
        $scope.amountafterdis *
          ($scope.returnform.returnsInvoiceDetailsViewModel[i].amountoftax /
            100);
    };

    $scope.addreturninvoice = function () {
      supplierinvoice
        .AddReturnsInvoicePurchasing($scope.returnform)
        .then(function (res) {
          if (res.status == 201) {
            Helpers.showToaster("تم الحفظ");
            $state.go("menu.supplierinvoice");
          }
        })
        .catch(function (res) {
          Helpers.ShowError(res.data.message);
        });
    };
    $scope.removerowforreturn = function (i) {
      $scope.returnform.returnsInvoiceDetailsViewModel.splice(i, 1);
    };
    company.getbranchesbyuserIdReq().then(function (res) {
      $scope.branches = res.data;

      for (let index = 0; index < $scope.branches.length; index++) {
        if (res.data[index].view) {
          $scope.defaultObj.branch = $scope.branches[index];
        }
        $scope.branchId = $scope.defaultObj.branch.branchId;
        console.log($scope.branchId);
      }
    });

    $scope.exportToExcel = function (_tableId) {
      // ex: '#my-table'
      Helpers.ShowLoader();
      $scope.hideLastColumn = true;
      $timeout(function () {
        $scope.exportHref = Excel.tableToExcel(_tableId, "export");
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
              normal: "DroidKufi-Regular.ttf",
              bold: "DroidKufi-Regular.ttf",
              italics: "DroidKufi-Regular.ttf",
              bolditalics: "DroidKufi-Regular.ttf",
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
              font: "DroidKufi",
            },
          };
          pdfMake.createPdf(docDefinition).download("export.pdf");
          $scope.hideLastColumn = false;
          $scope.hideLastTop = true;
          $scope.perPageCount = 20;
        },
      });
    };
    $scope.print = function () {
      var divContents = document.getElementById("printDiv").innerHTML;
      console.log(divContents);
      var printWindow = window.open("", "", "height=1000,width=1000");
      printWindow.document.write("<html><head><title></title>");
      printWindow.document.write(
        '<link rel="stylesheet" href="../../css/bootstrap.min.css">'
      );
      printWindow.document.write('</head><body dir="rtl">');
      printWindow.document.write(divContents);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();
      printWindow.onafterprint = printWindow.close;
      setTimeout(() => {
        printWindow.print();
      }, 2000);
      return true;
    };

    //supplier Modal
    $scope.addSupplier = function (data) {
      supplier.addSupplier(data).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);

          getallsupplier();
        },
        (_ex) => {
          if (_ex.status == 400) {
            Helpers.showErrorMessage(
              Translate[$rootScope.lang].MSG_SUPPLIEREXIST
            );
          } else if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
          }
        }
      );
    };
    $scope.addbank = function (data) {
      bank.addBank(data).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          getBankData();
        },
        (_ex) => {
          if (_ex.status == 400) {
            Helpers.showErrorMessage(_ex.data.message);
          } else if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $state.go("login");
          }
        }
      );
    };
    $scope.typesLst = [
      {
        id: 1,
        name: "جاري",
      },
      {
        id: 1,
        name: "توفير",
      },
      {
        id: 1,
        name: "وديعه",
      },
    ];
    function getBankData() {
      bank.getAllBanks().then(
        function (res) {
          $scope.bankLst = res.data;
        },
        (_ex) => {
          if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $state.go("login");
          }
        }
      );
    }
    $scope.addBankAccount = function (data) {
      bank.addBankAccount(data).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          getallinvandbank();
        },
        (_ex) => {
          Helpers.showErrorMessage(_ex.data.message);
        }
      );
    };
    $scope.addInventory = function (data) {
      inventory.addInventory(data).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          getallinvandbank();
        },
        (_ex) => {
          if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $state.go("login");
          } else if (_ex.status == 400) {
            Helpers.showErrorMessage(_ex.data.message);
          }
        }
      );
    };
  },
]);
