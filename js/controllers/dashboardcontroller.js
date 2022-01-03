app.controller(
  'dashboardCtrl',
  function (
    $scope,
    $rootScope,
    $state,
    Helpers,
    Translate,
    dashboard,
    currency
  ) {
    $rootScope.ativetab = 'dashboard';
    $scope.Translate = Translate;
    $scope.currency = {};
    $scope.itemsAllData = [];
    $scope.customersAllData = [];
    $scope.suppliersAllData = [];
    $scope.prodAmount = [];
    $scope.prodName = [];
    $scope.custAmount = [];
    $scope.custName = [];
    $scope.supliersAmount = [];
    $scope.supliersName = [];
    $scope.init = function () {
      if (!localStorage.token) $state.go('login');
      $scope.userrole = JSON.parse(
        window.atob(localStorage.token.split('.')[1])
      ).role;
      currency.GetDefaultCurrency().then(function (res) {
        $scope.currency = res.data;
        $scope.currencySymbol = $scope.currency.symbol;
      });
      dashboard.getCustomersCount().then(function (res) {
        $scope.customerCount = res.data;
      });
      dashboard.getSuppliersCount().then(function (res) {
        $scope.suppliersCount = res.data;
      });
      dashboard.getUsersCount().then(function (res) {
        $scope.usersCount = res.data;
      });
      dashboard.getProductsCount().then(function (res) {
        $scope.prouductsCount = res.data;
      });
      dashboard.getTransactions().then(function (res) {
        $scope.transactionsLst = res.data;
      });
      dashboard.getTotalRevenues().then(function (res) {
        parseFloat(res.data.currentMonth).toFixed(2);
        parseFloat(res.data.lastMonth).toFixed(2);
        parseFloat(res.data.lastWeek).toFixed(2);
        $scope.totalRevenues = res.data;
      });
      dashboard.getTotalExpenses().then(function (res) {
        parseFloat(res.data.currentMonth).toFixed(2);
        parseFloat(res.data.lastMonth).toFixed(2);
        parseFloat(res.data.lastWeek).toFixed(2);
        $scope.totalExpenses = res.data;
      });
      dashboard.getBalance().then(function (res) {
        parseFloat(res.data.balance).toFixed(2);
        parseFloat(res.data.banks).toFixed(2);
        parseFloat(res.data.saves).toFixed(2);
        $scope.Balance = res.data;
      });
    };
    $scope.init();
    $scope.IntroOptions = {
      steps: [
        {
          element: '#step1',
          intro: 'اجمالي المصروفات ويتم توضيح مصروفات ( الاسبوع الماضي و الشهر الماضي )',
          position: 'right',
        },
        {
          element: '#step2',
          intro: 'اجمالي الايرادات ويتم توضيح ايرادات ( الاسبوع الماضي و الشهر الماضي )',
          position: 'bottom',
        },
        {
          element: '#step3',
          intro: 'اجمالي الرصيد ويتم توضيح الرصيد ( البنوك و الخزن )',
          position: 'bottom',
        },
        {
          element: '#step4',
          intro: 'هذا توضيح بياني لاكثر عشر اصناف من حيث القيمه',
          position: 'bottom',
        },
        {
          element: '#step5',
          intro: 'هذا توضيح بياني لاكثر خمس عملاء من حيث الرصيد',
          position: 'bottom',
        },
        {
          element: '#step6',
          intro: 'هذا توضيح بياني لاكثر خمس موردين من حيث الرصيد',
          position: 'bottom',
        },
        {
          element: '#step7',
          intro: 'قائمه بأخر عشر قيود تم انشائها',
          position: 'top',
        },
        {
          element: '#step8',
          intro: 'قائمه لتوضيح ( عدد العملاء و عدد الموردين و عدد الاصناف و عدد المستخدمين',
          position: 'top',
        },
      ],
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      nextLabel: 'التالي!',
      prevLabel: '<span">السابق</span>',
      skipLabel: 'إنهاء',
      doneLabel: 'شكرا',
    };
    $scope.load = function () {
      dashboard
        .getProductsData()
        .then(function (res) {
          $scope.itemsAllData = res.data;
          for (let j = 0; j < $scope.itemsAllData.length; j++) {
            $scope.prodAmount.push($scope.itemsAllData[j].amount);
            $scope.prodName.push($scope.itemsAllData[j].productName);
          }
        })
        .then(function () {
          dashboard.getTopFiveCustomers().then(function (res) {
            $scope.customersAllData = res.data;
            for (let j = 0; j < $scope.customersAllData.length; j++) {
              $scope.custAmount.push($scope.customersAllData[j].balance);
              $scope.custName.push(
                $scope.customersAllData[j].accountNameArabic
              );
            }
          });
        })
        .then(function () {
          dashboard.getTopFiveSuppliers().then(function (res) {
            $scope.suppliersAllData = res.data;
            for (let j = 0; j < $scope.suppliersAllData.length; j++) {
              $scope.supliersAmount.push($scope.suppliersAllData[j].balance);
              $scope.supliersName.push(
                $scope.suppliersAllData[j].accountNameArabic
              );
            }
          });
        })
        .then(function () {
          $scope.itemChart();
          $scope.piechartsCustomer();
          $scope.piechartsSuppliers();
        });
    };
    $scope.load();
    $scope.itemChart = function () {
      var options = {
        series: [
          {
            name: 'القيمه',
            data: $scope.prodAmount,
          },
        ],
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '50%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
        },

        grid: {
          row: {
            colors: ['#fff', '#f2f2f2'],
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: $scope.prodName,
          tickPlacement: 'on',
        },
        yaxis: {
          title: {
            text: '',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100],
          },
        },
      };
      var chart = new ApexCharts(document.querySelector('#chart'), options);
      chart.render();
    };
    $scope.piechartsCustomer = function () {
      var options = {
        chart: {
          width: '100%',
          height: 360,
          type: 'pie',
        },
        dataLabels: {
          enabled: true,
        },
        labels: $scope.custName,
        series: $scope.custAmount,
      };
      var chart = new ApexCharts(
        document.querySelector('#pie-customers'),
        options
      );

      chart.render();
    };
    // introJs().setOptions({
    //   steps: [{
    //     intro: "Hello world!"
    //   }, {
    //     element: document.querySelector('#title'),
    //     intro: "Click here to login!"
    //   }]
    // }).start();

    $scope.piechartsSuppliers = function () {
      var options = {
        chart: {
          width: '100%',
          height: 360,
          type: 'pie',
        },
        dataLabels: {
          enabled: true,
        },
        labels: $scope.supliersName,
        series: $scope.supliersAmount,
      };
      var chart = new ApexCharts(
        document.querySelector('#pie-suppliers'),
        options
      );
      chart.render();
    };
  }
);
