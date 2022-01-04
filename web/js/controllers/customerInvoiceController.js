app.controller("customerInvoiceController", [
  "$scope",
  "$window",
  "customerInvoice",
  "customer",
  "$timeout",
  "item",
  "accounts",
  "currency",
  "tax",
  "payMoney",
  "Helpers",
  "$state",
  "company",
  "Fullccreen",
  "$timeout",
  "Excel",
  "Translate",
  "$rootScope",
  "bank",
  "inventory",
  function (
    $scope,
    $window,
    customerInvoice,
    customer,
    $timeout,
    item,
    accounts,
    currency,
    tax,
    payMoney,
    Helpers,
    $state,
    company,
    Fullccreen,
    $timeout,
    Excel,
    Translate,
    $rootScope,
    bank,
    inventory
  ) {
    $rootScope.lang = localStorage.lang;
    $scope.Translate = Translate;
    $scope.currencyLst = [];
    $scope.currencyObj = {};
    $scope.bankLst = [];
    $scope.inventoryLst = [];
    $scope.accounttype = [];
    $scope.currencies = [];
    $scope.editMood = false;
    $scope.customerData = [];
    $scope.customerForm = {};

    function getdefaultcurrency() {
      currency.GetDefaultCurrency().then(function (res) {
        $scope.currency = res.data;
        $scope.currentfactor = res.data.factor;
      });
    }
    function getAllCurrencies() {
      currency.getAllCurrencies().then(function (res) {
        $scope.currencyLst = res.data;
        $scope.defaultCurrancy = $scope.currencyLst.filter(function (_obj) {
          return _obj.default === true;
        });
        if ($scope.defaultCurrancy.length > 0) {
          $scope.customerInvoiceForm.currencyId = $scope.defaultCurrancy[0].id;
          $scope.currentObj1.currencyId = $scope.defaultCurrancy[0].id;
          $scope.InvObj.currencyId = $scope.defaultCurrancy[0].id;
        }
      });
    }
    function GetPricePolicy() {
      company.GetPricePolicy().then(function (res) {
        $scope.pricepolicy = res.data;
      });
    }
    function getallstores() {
      item.getallstoreReq().then(function (res) {
        $scope.stores = res.data;
        // $scope.customerInvoiceForm.storeId = $scope.stores[0].id
      });
    }
    company.getbranchesbyuserIdReq().then(function (res) {
      $scope.branches = res.data;

      for (let index = 0; index < $scope.branches.length; index++) {
          if (res.data[index].view) {
              $scope.defaultObj.branch = $scope.branches[index]

          }
          $scope.branchId=$scope.defaultObj.branch.branchId
      }

  });
    function getcustomerinvoices() {
      customerInvoice.GetCustomerinvoices().then(function (res) {
        $scope.invoices = res.data;
      });
    }
    function getAllCustomers() {
      customer.getAllCustomers().then(function (res) {
        $scope.customers = res.data;
      });
    }
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
    $scope.getproductbtstore = function () {
      $scope.havestore = true;
      item.getallproductByStoreId($scope.customerInvoiceForm.storeId).then(function (res) {
        $scope.producsbystore = res.data;
      });
    };
    $scope.customerInvoiceForm = {
      invoiceNumber: 0,
      description: "",
      customerId: null,
      invoiceDate: new Date(),
      paymentTypeId: null,
      currencyId: null,
      storeId: null,
      customerInvoiceDetails: [],
      totalDiscountAmount: 0,
      accountPayToId: 0,
    };
    $scope.alltax = [];
    $scope.currentObj1 = {
      currencyId: 0,
    };
    $scope.InvObj = {
      currencyId: 0,
    };
    $scope.paysome = {
      accountPayFromId: 0,
      accountPayToId: 0,
      amount: 0,
      description: "",
      currencyId: 0,
      date: new Date(),
      refrenceId: 0,
      total: 0,
      productId: 0,
    };
    $scope.Delay = {
      customerId: 0,
      productId: 0,
      amount: 0,
      description: "string",
      currencyId: 0,
      date: new Date(),
      refrenceId: 0,
    };
    $scope.setpay = function (data) {
      $scope.paytype = data;
    };

    $scope.show = {
      totalunitprice: 0,
      discount: 0,
      tax: 0,
      totalPrice: 0,
    };

    $scope.init = function () {
      getcustomerinvoices();
      getAllCustomers();
      getallproducts();
      getallinvandbank();
      getTax();
      getpaymenttype();
      getdefaultcurrency();
      getallstores();
      GetPricePolicy();
      getAllCurrencies();
      // $scope.getbanksAfterUpdates();
      $scope.checksellpriceunit = true;
      $scope.havestore = false;
    };
    $scope.init();
    $scope.units = [];
    $scope.disablerow = [];
    $scope.passunits = function (data, i) {
      $scope.units.push(data.units);
      $scope.units[i].forEach((element) => {
        if (element.defaultSelling) {
          $scope.customerInvoiceForm.customerInvoiceDetails[i].unitId =
            element.id;
          customerInvoice.GetSellPriceForUnit(element.id).then(function (res) {
            $scope.sellpriceunit = res.data;
            $scope.customerInvoiceForm.customerInvoiceDetails[i].unitPrice =
              $scope.sellpriceunit.sellingprice;
            $scope.customerInvoiceForm.customerInvoiceDetails[i].stock2 =
              $scope.sellpriceunit.stock;
          });
        }
      });
    };

    $scope.getunitprice = function (data, i) {
      customerInvoice.GetSellPriceForUnit(data.id).then(function (res) {
        $scope.sellpriceunit = res.data;
        $scope.customerInvoiceForm.customerInvoiceDetails[i].unitPrice =
          $scope.sellpriceunit.sellingprice;
        $scope.customerInvoiceForm.customerInvoiceDetails[i].stock2 =
          $scope.sellpriceunit.stock;
      });
    };
    $scope.toggleFullScreen = function () {
      Fullccreen.toggleFullScreen();
    };
    document.addEventListener("webkitfullscreenchange", function (event) {});

    /* IE / Edge */
    document.addEventListener("msfullscreenchange", function (event) {
      Fullccreen.toggleFullScreen();
    });
    $scope.newItem = function () {
     var newWidow = window.open("/#/menu/additem", "", "width=" + screen.availWidth + ",height=" + screen.availHeight);
     var popupTick = setInterval(function() {
      if (newWidow.closed) {
        clearInterval(popupTick);
        $scope.co();
      }
    }, 500);

    return false;
    }
    $scope.co = function () {
      getallproducts();
      $scope.init();
      item.getallproductByStoreId($scope.customerInvoiceForm.storeId).then(function (res) {
        $scope.producsbystore = res.data;

      });
    }
    $scope.calccost = function (i) {
      $scope.oldstockavailable = $scope.sellpriceunit.stock;
      $scope.oldquantityorder =
        $scope.customerInvoiceForm.customerInvoiceDetails[i];
      $scope.customerInvoiceForm.customerInvoiceDetails[i].quantity;
      if (
        $scope.customerInvoiceForm.customerInvoiceDetails[i].quantity >
        $scope.sellpriceunit.stock
      ) {
        if ($scope.pricepolicy.medium) {
          Swal.fire({
            icon: "info",
            title: "تحذير",
            text: "لا يوجد الكميه المطلوبه",
            footer: "الكميه المتاحه" + $scope.oldstockavailable.toString(),
          });
          $scope.customerInvoiceForm.customerInvoiceDetails[i].quantity =
            $scope.oldstockavailable;
          $scope.customerInvoiceForm.customerInvoiceDetails[i].totalUnitPrice =
            $scope.oldstockavailable * $scope.sellpriceunit.sellingprice;
          $scope.calctotal($scope.alltax[i].tax, i);
        } else {
          customerInvoice
            .GetSellPriceForUnitNext(
              $scope.customerInvoiceForm.customerInvoiceDetails[i].unitId
            )
            .then(function (res) {
              $scope.sellpriceunitnext = res.data;
              if ($scope.sellpriceunitnext.stock == 0) {
                Swal.fire({
                  icon: "info",
                  title: "تحذير",
                  text: "لا يوجد الكميه المطلوبه",
                  footer:
                    "الكميه المتاحه" + $scope.oldstockavailable.toString(),
                });
                $scope.customerInvoiceForm.customerInvoiceDetails[i].quantity =
                  $scope.oldstockavailable;
                $scope.customerInvoiceForm.customerInvoiceDetails[
                  i
                ].totalUnitPrice = Math.floor(
                  $scope.oldstockavailable * $scope.sellpriceunit.sellingprice
                );
                $scope.calctotal($scope.alltax[i].tax, i);
              } else {
                if (
                  $scope.customerInvoiceForm.customerInvoiceDetails[i]
                    .quantity -
                    $scope.oldstockavailable >
                  $scope.sellpriceunitnext.stock
                ) {
                  Swal.fire({
                    icon: "warning",
                    title: "تحذير",
                    text: " لا يوجد الكميه المطلوبه ايضا",
                    footer:
                      " الكميه المتاحه" +
                      $scope.sellpriceunitnext.stock.toString(),
                  });
                  $scope.addrow();
                  $scope.customerInvoiceForm.customerInvoiceDetails[
                    i + 1
                  ].quantity = $scope.sellpriceunitnext.stock;
                  $scope.calctotal($scope.alltax[i + 1].tax, i + 1);
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "تحذير",
                    text: "سيتم اضافه سطر اخر بسعر مختلف",
                    footer:
                      " بكميه" +
                      (
                        $scope.customerInvoiceForm.customerInvoiceDetails[i]
                          .quantity - $scope.oldstockavailable
                      ).toString(),
                  });
                  $scope.addrow();
                  $scope.customerInvoiceForm.customerInvoiceDetails[
                    i + 1
                  ].quantity =
                    $scope.customerInvoiceForm.customerInvoiceDetails[i]
                      .quantity - $scope.oldstockavailable;
                  $scope.calctotal($scope.alltax[i + 1].tax, i + 1);
                }

                $scope.customerInvoiceForm.customerInvoiceDetails[
                  i + 1
                ].unitPrice = Math.floor($scope.sellpriceunitnext.sellingprice);
                $scope.customerInvoiceForm.customerInvoiceDetails[
                  i + 1
                ].productId =
                  $scope.customerInvoiceForm.customerInvoiceDetails[
                    i
                  ].productId;
                $scope.customerInvoiceForm.customerInvoiceDetails[
                  i + 1
                ].unitId =
                  $scope.customerInvoiceForm.customerInvoiceDetails[i].unitId;

                $scope.customerInvoiceForm.customerInvoiceDetails[
                  i + 1
                ].totalUnitPrice = Math.floor(
                  $scope.customerInvoiceForm.customerInvoiceDetails[i + 1]
                    .unitPrice *
                    $scope.customerInvoiceForm.customerInvoiceDetails[i + 1]
                      .quantity
                );
                $scope.calctotal($scope.alltax[i + 1].tax, i + 1);
                //calc show
                $scope.show.totalunitprice = 0;
                $scope.customerInvoiceForm.customerInvoiceDetails.forEach(
                  (element) => {
                    $scope.show.totalunitprice += element.totalUnitPrice;
                  }
                );
              }
              $scope.customerInvoiceForm.customerInvoiceDetails[i].quantity =
                $scope.oldstockavailable;
              $scope.calctotal($scope.alltax[i].tax, i);
            });
        }
      } else {
        if (
          $scope.customerInvoiceForm.customerInvoiceDetails.indexOf(
            $scope.customerInvoiceForm.customerInvoiceDetails[i + 1]
          ) > -1
        ) {
          $scope.customerInvoiceForm.customerInvoiceDetails.splice(
            $scope.customerInvoiceForm.customerInvoiceDetails[i + 1],
            1
          );
          $scope.customerInvoiceForm.customerInvoiceDetails[i].unitPrice =
            $scope.sellpriceunit.sellingprice;
        }
      }

      $scope.customerInvoiceForm.customerInvoiceDetails[i].totalUnitPrice =
        Math.floor(
          $scope.customerInvoiceForm.customerInvoiceDetails[i].unitPrice *
            $scope.customerInvoiceForm.customerInvoiceDetails[i].quantity
        );
      $scope.calctotal($scope.alltax[i].tax, i);
      //calc show
      $scope.show.totalunitprice = 0;
      $scope.customerInvoiceForm.customerInvoiceDetails.forEach((element) => {
        $scope.show.totalunitprice += element.totalUnitPrice;
      });
    };

    $scope.checkdisablerow = function (i) {
      if ($scope.disablerow.indexOf(i) > 0) {
        return true;
      } else {
        return false;
      }
    };

    $scope.calccurrency = function (data) {
      $scope.currencydata = data;
      $scope.currentfactor = data.factor;
    };
    $scope.updatecurrency = function () {
      $scope.currencydata.factor = $scope.currentfactor;
      currency
        .updateCurrency($scope.currencydata, $scope.currencydata.id)
        .then(function (res) {});
    };

    $scope.calctotal = function (data, i) {
      $scope.alltax[i].tax = data;
      $scope.customerInvoiceForm.customerInvoiceDetails[i].totalPrice =
        Math.floor(
          $scope.customerInvoiceForm.customerInvoiceDetails[i].totalUnitPrice +
            $scope.customerInvoiceForm.customerInvoiceDetails[i]
              .totalUnitPrice *
              (data.amount / 100) -
            $scope.customerInvoiceForm.customerInvoiceDetails[i]
              .totalUnitPrice *
              ($scope.customerInvoiceForm.customerInvoiceDetails[i].discount /
                100)
        );
      // calc show
      $scope.show.tax = 0;
      $scope.customerInvoiceForm.customerInvoiceDetails.forEach((element) => {
        var taxamount = Math.floor((data.amount / 100) * element.totalUnitPrice);
        $scope.show.tax += taxamount;
      });
      // calc show
      $scope.show.totalPrice = 0;
      $scope.customerInvoiceForm.customerInvoiceDetails.forEach((element) => {
        $scope.show.totalPrice += element.totalPrice;
      });
    };
    $scope.removerow = function(row, i) {
      $scope.customerInvoiceForm.customerInvoiceDetails.splice(i, 1);
      $scope.show.totalunitprice = 0;
      $scope.customerInvoiceForm.customerInvoiceDetails.forEach((element) => {
          $scope.show.totalunitprice += element.totalUnitPrice;
      });

      $scope.show.discount = 0;
      $scope.customerInvoiceForm.customerInvoiceDetails.forEach((element) => {
          $scope.show.discount += Math.floor(
              element.totalUnitPrice * (element.discount / 100)
          );
      });

      $scope.taxes.forEach((element) => {
                 if (element.id == row.taxId) {

              $scope.show.tax -= Math.floor((row.totalUnitPrice *element.amount)/100);
              if( $scope.show.tax<=0){$scope.show.tax=0;}
          }
      });

      $scope.show.totalPrice -= row.totalPrice;
  

  };
    $scope.addrow = function (data) {
      $scope.getproductbtstore()
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
      var b = {
        tax: $scope.taxes[0],
      };
      if ($scope.customerInvoiceForm.storeId) {
        $scope.customerInvoiceForm.customerInvoiceDetails.push(a);
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
      $scope.customerInvoiceForm.customerInvoiceDetails.forEach((element) => {
        var disamount = Math.floor(
          (element.discount / 100) * element.totalUnitPrice
        );
        $scope.show.discount += disamount;
      });
      $scope.calctotal($scope.alltax[i].tax, i);
    };

    $scope.taxclsh = function (data) {
      $scope.show.tax = 0;
      $scope.customerInvoiceForm.customerInvoiceDetails.forEach((element) => {
        var taxamount = Math.floor((data.amount / 100) * element.totalUnitPrice);
        $scope.show.tax += taxamount;
      });
    };

    $scope.totalunitclsh = function () {
      $scope.show.totalunitprice = 0;
      $scope.customerInvoiceForm.customerInvoiceDetails.forEach((element) => {
        $scope.show.totalunitprice += Math.floor(element.totalUnitPrice);
      });
    };
    $scope.totalclsh = function () {
      $scope.show.totalPrice = 0;
      $scope.customerInvoiceForm.customerInvoiceDetails.forEach((element) => {
        $scope.show.totalPrice += Math.floor(element.totalPrice);
      });
    };
    $scope.addinvoice = function (data) {
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
                    customerInvoice
                      .AddCustomerinvoiceReq(data)
                      .then(function (res) {
                        if (res.status == 201) {
                          $scope.Delay.customerId =
                            $scope.custtoRecieve.accountId;
                          $scope.Delay.productId =
                            $scope.customerInvoiceForm.customerInvoiceDetails[0].productId;
                          $scope.Delay.amount = $scope.show.totalPrice;
                          $scope.Delay.description =
                            $scope.customerInvoiceForm.description;
                          $scope.Delay.currencyId =
                            $scope.customerInvoiceForm.currencyId;
                          $scope.invdata = res.data;
                          $scope.Delay.refrenceId = parseInt(
                            $scope.invdata.message
                          );
                          payMoney
                            .addPayMoneyRecieveForCustDelay($scope.Delay)
                            .then(function (res) {
                              if (res.status == 201) {
                                Helpers.showToaster("تم الحفظ");
                                $state.go("menu.customerInvoice");
                              }
                            })
                            .catch(function (res) {
                              Helpers.ShowError(res.data.message);
                            });
                        }
                      })
                      .catch(function (res) {
                        Helpers.ShowError(res.data.message);
                        $state.go("menu.customerInvoice");
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
              customerInvoice
                .AddCustomerinvoiceReq(data)
                .then(function (res) {
                  if (res.status == 201) {
                    Helpers.showToaster("تم الحفظ");
                    $state.go("menu.customerInvoice");
                  }
                })
                .catch(function (res) {
                  Helpers.ShowError(res.data.message);
                });
            } else {
              Helpers.showToaster("تم الالغاء");
            }
          });
      }
    };

    $scope.customertopay = function (data) {
      customer.getAllCustomerBycode(data.code).then(function (res) {
        $scope.custtoRecieve = res.data;
        $scope.paysome.accountPayFromId = $scope.custtoRecieve.accountId;
      });
    };

    $scope.setFromAccBalance = function (data) {
      $scope.accbalance = data.balance;
    };

    $scope.addPaysome = function (data) {
      customerInvoice
        .AddCustomerinvoiceReq($scope.customerInvoiceForm)
        .then(function (res) {
          if (res.status == 201) {
            $scope.invdata = res.data;
            $scope.paysome.refrenceId = parseInt($scope.invdata.message);
            $scope.paysome.productId =
              $scope.customerInvoiceForm.customerInvoiceDetails[0].productId;
            $scope.paysome.total = $scope.show.totalPrice;
            payMoney.addPayMoneyRecieveForCustSome(data).then(function (res) {
              if (res.status == 201) {
                $("#paymoney").modal("hide");
                Helpers.showToaster("تم الحفظ");
                $state.go("menu.customerInvoice");
              } else if (res.status == 400) {
                $("#paymoney").modal("hide");
                Helpers.ShowError(res.data.message);
                $state.go("menu.customerInvoice");
              }
            });
          }
        })
        .catch(function (res) {
          Helpers.showToaster(res.data.message);
          $("#paymoney").modal("hide");
        });
    };

    $scope.filldataforreturn = function (data) {
      $scope.returnform = {
        invoiceNumber: data.invoiceNumber,
        returnsInvoiceDetailsViewModel: [],
      };
      data.customerInvoiceDetails.forEach((element) => {
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
          cost: element.cost,
        };
        $scope.returnform.returnsInvoiceDetailsViewModel.push(a);
      });
    };
    $scope.filldata = function (data) {
      $scope.customerReturnInvoice = data;
    };

    $scope.calcforreturn = function (i) {
      if (
        $scope.returnform.returnsInvoiceDetailsViewModel[i].quantity >
        $scope.customerReturnInvoice.customerInvoiceDetails[i].quantity
      ) {
        Swal.fire({
          icon: "warning",
          title: "تحذير",
          text:
            "الكميه المراد ارجاعها يجب ان لا تتعدي " +
            $scope.customerReturnInvoice.customerInvoiceDetails[
              i
            ].quantity.toString(),
        });
        $scope.returnform.returnsInvoiceDetailsViewModel[i].quantity =
          $scope.customerReturnInvoice.customerInvoiceDetails[i].quantity;
      }

      $scope.returnform.returnsInvoiceDetailsViewModel[i].totalPrice =
        Math.floor(
          $scope.returnform.returnsInvoiceDetailsViewModel[i].unitPrice *
            $scope.returnform.returnsInvoiceDetailsViewModel[i].quantity
        );
      $scope.amoutafterdis = Math.floor(
        $scope.returnform.returnsInvoiceDetailsViewModel[i].totalPrice -
          $scope.returnform.returnsInvoiceDetailsViewModel[i].totalPrice *
            ($scope.returnform.returnsInvoiceDetailsViewModel[i].discount / 100)
      );

      $scope.returnform.returnsInvoiceDetailsViewModel[i].total = Math.floor(
        $scope.amoutafterdis +
          $scope.amoutafterdis *
            ($scope.returnform.returnsInvoiceDetailsViewModel[i].amountoftax /
              100)
      );

      //calc cost
      $scope.returnform.returnsInvoiceDetailsViewModel[i].cost =
        ($scope.customerReturnInvoice.customerInvoiceDetails[i].cost /
          $scope.customerReturnInvoice.customerInvoiceDetails[i].quantity) *
        $scope.returnform.returnsInvoiceDetailsViewModel[i].quantity;
    };

    $scope.addreturninvoice = function () {
      customerInvoice
        .AddReturnsInvoiceSelling($scope.returnform)
        .then(function (res) {
          if (res.status == 201) {
            Helpers.showToaster("تم الحفظ");
            $state.go("menu.customerinvoice");
          }
        })
        .catch(function (res) {
          Helpers.ShowError(res.data.message);
        });
    };
    $scope.removerowforreturn = function (i) {
      $scope.returnform.returnsInvoiceDetailsViewModel.splice(i, 1);
    };
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

    //  --------------CURRENCY NAME-------------------

    $scope.init();
    //reset modal if close
    $("#sbtncust2").on("click", function () {
      $scope.currencyObj = null;
      $scope.init();
    });
    $("#sbtncust3").on("click", function () {
      $scope.currencyObj = null;
      $scope.init();
    });
    $("#close").on("click", function () {
      $scope.currencyObj = null;
      $scope.init();
    });

    $scope.reseatObj = function () {
      $scope.currencyObj = {};
    };
    $scope.addCurrency = function (data) {
      if (!data.id) {
        currency.addCurrency(data).then(
          function (res) {
            $("#currencyModalCustomer").modal("hide");

            Helpers.showToaster(
              Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY
            );
            getAllCurrencies();
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
            $("#currencyModalCustomer").modal("hide");
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
    $scope.update = function (data) {
      currency.updateCurrency(data, data.id).then(
        function (res) {
          Helpers.showToaster(
            Translate[$rootScope.lang].MSG_DEFAULTCURRENCYADDED
          );
          $state.go("menu.dashboard");
        },
        (_ex) => {
          if (_ex.status == 400)
            Helpers.showErrorMessage(
              Translate[$rootScope.lang].MSG_DEFAULTCURRENCYEXIST
            );
        }
      );
    };

    // -------------------STORE NAME----------
    $scope.getstores = function () {
      item.getallstoreReq().then(function (res) {
        $scope.stores = res.data;
      });
    };
    $scope.getstores();
    $scope.addstore = function (data) {
      item.addstoreReq(data).then(
        function (res) {
          //handle
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          getstores();
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

    // ----------BANK ACCOUNT TAB--------
    $scope.getbanksAfterUpdates = function () {
      bank
        .getAllBanks()
        .then(function (res) {
          $scope.bankLst = res.data;
        })
        .then(
          function () {
            getAllCurrencies();
          },
          (_ex) => {
            if (_ex.status == 400) {
              Helpers.showErrorMessage(_ex.data.message);
            } else if (_ex.status == 403) {
              Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            }
          }
        );
      bank.getBankAccountsByBranch().then(function (res) {
        $scope.bankAccountLst = res.data;
      });
    };
    $scope.getbanksAfterUpdates();
    $scope.addbank = function (data) {
      bank.addBank(data).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          bank.getAllBanks().then(function (res) {
            $scope.bankLst = res.data;
          });
        },
        (_ex) => {
          if (_ex.status == 400) {
            Helpers.showErrorMessage(_ex.data.message);
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

    // ------------- CUSTOMER NAME ---------------

    $scope.addCustomer = function (data) {
      customer.addCustomer(data).then(
        function (res) {
          Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
          getAllCustomers();
        },
        (_ex) => {
          if (_ex.status == 400) {
            Helpers.showErrorMessage(
              Translate[$rootScope.lang].MSG_CUSTOMEREXIST
            );
          } else if (_ex.status == 403) {
            Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
            $state.go("login");
          }
        }
      );
    };
  },
]);
