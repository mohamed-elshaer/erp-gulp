app.controller("itemcontroller", [
    "$scope",
    "Translate",
    "$timeout",
    "item",
    "accounts",
    "unit",
    "$state",
    "$rootScope",
    "Helpers",
    "company",
    "currency",
    "$timeout",
    "Excel",

    function(
        $scope,
        Translate,
        $timeout,
        item,
        accounts,
        unit,
        $state,
        $rootScope,
        Helpers,
        company,
        currency,
        $timeout,
        Excel,

    ) {
        $scope.Translate = Translate;
        $scope.active = "";
        $scope.disabledFir = false;
        $scope.disabledSec = false;
        $scope.unitObj = {};
        $scope.unitLst = [];
        $scope.selectedunit = {
            unitName: "",
            purchasingprice: 0,
            sellingprice: 0,
            defaultSelling: true,
            defaultPurchasing: true,
            bareCode: 0,
        };
        $scope.selectedunitindex = 0;
        $scope.productform = {
            productName: "",
            description: "",
            productionDate: new Date(),
            expirationDate: new Date(),
            unitViewModels: [
                // {
                //   unitName: "",
                //   purchasingprice: 0,
                //   sellingprice: 0,
                //   defaultSelling: true,
                //   defaultPurchasing: true,
                //   bareCode: 0,
                // },
            ],
            storeId: null,
            categoryId: null,
            accountIdstore: 0,
            stock: 0,
            demandLimit: 0,
            productCode: "",
            isExpiration: false,
            size: 0,
            wiedth: 0,
            hiegth: 0,
            elevation: 0,
            accountId: 0,
            accountIdstore: 0,
            amount: 0,
            productImage: "",
            unitFirstStock: "",
        };
        $scope.makeActive = function(item) {
            $scope.active = $scope.active == item ? "" : item;
        };
        $scope.init = function() {
            getcategorie();
            getstores();
            getallaccounts();
            getproducts();
            getUnits();
            getsellpricepolicy();
            getdefaultcurrency();
        };

        function getsellpricepolicy() {
            company.GetSellPriceSetting().then(function(res) {
                $scope.sellpricepolicy = res.data;
            });
        }

        function getUnits() {
            unit.getAllUnits().then(function(res) {
                $scope.unitLst = res.data;
            });
        }

        function getdefaultcurrency() {
            currency.GetDefaultCurrency().then(function(res) {
                $scope.currency = res.data;
            });
        }
        GetDefaultCurrencySymbol()

        function GetDefaultCurrencySymbol() {
            currency.GetDefaultCurrency().then(function(res) {
                $scope.defaultCurrency = res.data
            })
        }
        $scope.addUnitDetail = function(_selected, _row) {
            _row.bareCode = _selected.bareCode;
            _row.factor = _selected.factor;
            _row.purchasingprice = _selected.purchasingprice;
            _row.sellingprice = _selected.sellingprice;
            _row.defaultSelling = _selected.defaultSelling;
            _row.defaultPurchasing = _selected.defaultPurchasing;
        };

        function getproducts() {
            item.getallproductReq().then(
                function(res) {
                    $scope.products = res.data;
                },
                (_ex) => {
                    if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go("login");
                    }
                }
            );
        }
        $scope.addNewUnit = function(data) {
            unit.addUnit(data).then(
                function(res) {
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                    getUnits()
                },
                (_ex) => {
                    Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_UNIT_EXIST);
                }
            );
        };

        function getcategorie() {
            item.getallcategoryReq().then(
                function(res) {
                    $scope.categories = res.data;
                },
                (_ex) => {
                    if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go("login");
                    }
                }
            );
        }

        function getstores() {
            item.getallstoreReq().then(
                function(res) {
                    $scope.stores = res.data;
                },
                (_ex) => {
                    if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go("login");
                    }
                }
            );
        }

        function getallaccounts() {
            accounts.getaccountReq().then(
                function(res) {
                    $scope.accounts = res.data;
                },
                (_ex) => {
                    if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go("login");
                    }
                }
            );
        }
        $timeout($scope.init);
        ($scope.beforeSaveValidation = function() {
            if ($scope.productform.unitViewModels.length <= 0) {
                // alert here
                $("#validationUnit").modal("show");
                return false;
            }
            return true;
        }),
        ($scope.addrow = function(data) {
            var a = {

                unitName: "",
                purchasingprice: 0,
                sellingprice: 0,
                defaultSelling: false,
                defaultPurchasing: false,
                bareCode: 0,
                factor: $scope.productform.unitViewModels.length ? 0 : 1,
            };
            console.log(a);
            $scope.productform.unitViewModels.push(a);
            // if ($scope.editproduct) $scope.editproduct.unitViewModels.push(a);
        });
        ($scope.addroweditFun = function(data) {
            var a = {

                unitName: "",
                purchasingprice: 0,
                sellingprice: 0,
                defaultSelling: false,
                defaultPurchasing: false,
                bareCode: 0,
                factor: $scope.editproduct.unitViewModels.length ? 0 : 1,
            };
            console.log(a);
            $scope.editproduct.unitViewModels.push(a);
            // if ($scope.editproduct) $scope.editproduct.unitViewModels.push(a);
        });
        $(document).ready(function() {
            $(".btnNext").click(function() {
                console.log($(".nav-tabs .active").parent().next("li").find("a"));
                $(".nav-tabs .active").parent().next("li").find("a")[0].click();
            });
        });
        $scope.onClick = function(checked) {
            console.log(checked);
            if (checked) {
                for (var i = 0; i < $scope.productform.unitViewModels.length; i++) {
                    if ($scope.productform.unitViewModels[i].defaultSelling == false) {
                        angular.element(document.getElementById('com-email' + i))[0].disabled = true;
                    }

                }

            } else if (!checked) {
                for (var i = 0; i < $scope.productform.unitViewModels.length; i++) {
                    if ($scope.productform.unitViewModels[i].defaultSelling == false) {
                        angular.element(document.getElementById('com-email' + i))[0].disabled = false;
                    }

                }
            }
        }
        $scope.onClickDefaultPurchasing = function(checked) {
            if (checked) {
                for (var i = 0; i < $scope.productform.unitViewModels.length; i++) {
                    if ($scope.productform.unitViewModels[i].defaultPurchasing == false) {
                        angular.element(document.getElementById('com-email2' + i))[0].disabled = true;
                    }

                }

            } else if (!checked) {
                for (var i = 0; i < $scope.productform.unitViewModels.length; i++) {
                    if ($scope.productform.unitViewModels[i].defaultPurchasing == false) {
                        angular.element(document.getElementById('com-email2' + i))[0].disabled = false;
                    }

                }
            }
        }
        $scope.onClickEdit = function(checked) {
            console.log(checked);
            if (checked) {
                for (var i = 0; i < $scope.editproduct.unitViewModels.length; i++) {
                    if ($scope.editproduct.unitViewModels[i].defaultSelling == false) {
                        angular.element(document.getElementById('com-email2' + i))[0].disabled = true;
                    }

                }

            } else if (!checked) {
                for (var i = 0; i < $scope.editproduct.unitViewModels.length; i++) {
                    if ($scope.editproduct.unitViewModels[i].defaultSelling == false) {
                        angular.element(document.getElementById('com-email2' + i))[0].disabled = false;
                    }

                }
            }
        }
        $scope.onClickDefaultPurchasingEdit = function(checked) {
            if (checked) {
                for (var i = 0; i < $scope.editproduct.unitViewModels.length; i++) {
                    if ($scope.editproduct.unitViewModels[i].defaultPurchasing == false) {
                        angular.element(document.getElementById('com-email3' + i))[0].disabled = true;
                    }

                }

            } else if (!checked) {
                for (var i = 0; i < $scope.editproduct.unitViewModels.length; i++) {
                    if ($scope.editproduct.unitViewModels[i].defaultPurchasing == false) {
                        angular.element(document.getElementById('com-email3' + i))[0].disabled = false;
                    }

                }
            }
        }
        $scope.removerow = function(row) {
            $scope.productform.unitViewModels.pop();
            // console.log(row);
            // delete $scope.productform.unitViewModels[row];
        };
        $scope.removerowEditFunction = function(row) {
            // console.log(row);
            // delete $scope.productform.unitViewModels[row];
            var indx = $scope.editproduct.unitViewModels.indexOf(row);
            $scope.editproduct.unitViewModels.splice(indx, 1);
        };
        $scope.calcCost = function(_obj) {
            $scope.itemPurchPrice = _obj.purchasingprice;
            $scope.productform.amount =
                _obj.purchasingprice * $scope.productform.stock;
        };
        $scope.reCalcItemCost = function() {
            $scope.productform.amount =
                $scope.itemPurchPrice * $scope.productform.stock;
        };
        $scope.addproduct = function(data) {
            if (!$scope.beforeSaveValidation()) return;
            item.addproductReq(data).then(
                function(res) {
                    //handle
                    $state.go("menu.items");

                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                },
                (_ex) => {
                    if (_ex.status == 400 &&_ex.data=="501") {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_PRODUCT_EXIST);
                    }else if(_ex.status==400&&_ex.data=="502"){
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_STORE_NOT_EXIST);
                    }else if(_ex.status==400&&_ex.data=="503"){
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_CATEGORY_NOT_EXIST);
                    }else if(_ex.status==400&&_ex.data=="504"){
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_PRODUCT_CODE_EXIST);

                    }
                }
            );
        };
        $scope.addcategory = function(data) {
            item.addcategoryReq(data).then(
                function(res) {
                    //handle

                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                    getcategorie();
                },
                (_ex) => {
                    if (_ex.staus == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go("login");
                    } else if (_ex.status == 400) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_CATEGORY_EXIST);

                    }
                }
            );
        };
        $scope.addstore = function(data) {
            item.addstoreReq(data).then(
                function(res) {
                    //handle
                    Helpers.showToaster(Translate[$rootScope.lang].MSG_ADDEDSUCCESSFULLY);
                    getstores();
                },
                (_ex) => {
                    if (_ex.staus == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go("login");
                    } else if (_ex.status == 400) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_STORE_EXIST);

                    }
                }
            );
        };

        //calc amount
        $scope.calcamount = function(data) {
            $scope.selectedunit = data;
            $scope.productform.amount =
                $scope.productform.stock * $scope.selectedunit.purchasingprice;
            $scope.productform.unitFirstStock = $scope.selectedunit.unitName;
        };
        $rootScope.calcamountedit = function(data) {
            $scope.selectedunit = data;
            $rootScope.editproduct.amount =
                $rootScope.editproduct.stock * $scope.selectedunit.purchasingprice;
            $rootScope.editproduct.unitFirstStock = $scope.selectedunit.unitName;
        };

        $scope.filldata = function(data) {
            $rootScope.editproduct = {
                id: data.id,
                productName: data.productName,
                description: data.description,
                productionDate:data.isExpiration? new Date(data.productionDate):new Date("1-1-2000"),
                expirationDate: data.isExpiration?new Date(data.expirationDate):new Date("1-1-2000"),
                unitViewModels: data.units,
                storeId: data.storeId,
                categoryId: data.categoryId,
                accountIdstore: data.accountIdstore,
                stock: data.stock,
                demandLimit: data.demandLimit,
                productCode: data.productCode,
               
                isExpiration: data.isExpiration,
                size: 0,
                wiedth: data.wiedth,
                hiegth: data.hiegth,
                elevation: data.elevation,
                accountId: data.accountId,
                amount: data.amount,
                productImage: data.productImage,
                unitFirstStock: data.unitFirstStock,
            };
            console.log(data);
            $state.go("menu.updateitem");
        };

        $scope.updateproduct = function(data) {
            item.updateproductReq(data).then(
                function(res) {
                    if (res.data.issuccessd) {
                        Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);
                        $state.go("menu.items");
                    } else {
                        Helpers.showErrorMessage(res.data.message);
                    }
                },
                (_ex) => {
                    if (_ex.status == 403) {
                        Helpers.showErrorMessage(Translate[$rootScope.lang].MSG_NOACCESS);
                        $state.go("login");
                    }
                }
            );
        };
        $scope.goto = function(id) {
            $location.hash(id);
        };

        $scope.calcforfactor = function() {
          
            for (var i = 0; i < $scope.productform.unitViewModels.length; i++) {
                var firstpurchasingprice = $scope.productform.unitViewModels[0].purchasingprice;
                var firstDefaultSelling = $scope.productform.unitViewModels[0].sellingprice;
                $scope.productform.unitViewModels[i].purchasingprice = firstpurchasingprice / $scope.productform.unitViewModels[i].factor
                $scope.productform.unitViewModels[i].sellingprice = firstDefaultSelling / $scope.productform.unitViewModels[i].factor
            }
        };
        $scope.calcforfactorEdit = function() {
          
            for (var i = 0; i < $scope.editproduct.unitViewModels.length; i++) {
                var firstpurchasingprice = $scope.editproduct.unitViewModels[0].purchasingprice;
                var firstDefaultSelling = $scope.editproduct.unitViewModels[0].sellingprice;
                $scope.editproduct.unitViewModels[i].purchasingprice = firstpurchasingprice / $scope.editproduct.unitViewModels[i].factor
                $scope.editproduct.unitViewModels[i].sellingprice = firstDefaultSelling / $scope.editproduct.unitViewModels[i].factor
            }
        };
        $scope.fillCategoryData = function(data) {
            $rootScope.editCategory = data
        }
        $scope.fillStoreData = function(data) {
            $rootScope.editStore = data
        }
        $scope.updateCategory = function(data) {
            item.updateCategoryReq(data.id, data).then(function() {
                Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);

            })
        }
        $scope.updateStore = function(data) {
            item.updateStoreReq(data.id, data).then(function() {
                Helpers.showToaster(Translate[$rootScope.lang].MSG_UPDATEDSUCCESSFULLY);

            })
        }
        //Check product code exist
        $scope.productCodeExist=function(productCode){
            item.CheckProductCode(productCode).then(function(){

            },(_ex)=>{
                 if(_ex.status==400){
                    Swal.fire({
                        icon: "warning",
                        title: "تحذير",
                        text: "كود الصنف موجود مسبقا",
                      });
                 }
            })
        }
        $scope.exportToExcel = function(_tableId) {
            // ex: '#my-table'
            Helpers.ShowLoader();
            $scope.hideLastColumn = true;
            $timeout(function() {
                $scope.exportHref = Excel.tableToExcel(_tableId, 'export');
                // location.href = $scope.exportHref;
                Helpers.HideLoader();
                $scope.hideLastColumn = false;
                $scope.$applyAsync();
            }, 500); // trigger download
        };
        $scope.exportToPdf = function(_tableId) {
            $scope.perPageCount = 100;
            $scope.hideLastColumn = true;
            $scope.hideLastTop = false;
            html2canvas(document.getElementById(_tableId), {
                onrendered: function(canvas) {
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
                        content: [{
                            image: data,
                            width: 500,
                        }, ],
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
        $scope.print = function() {
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
            setTimeout(() => { printWindow.print() }, 2000)
            return true;
        };
    },



]);