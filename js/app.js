"use strict";
var app = angular.module("app", [
  "ui.router",
  "angularUtils.directives.dirPagination",
  "angular.filter",
  "ui.select",
  "angularjsToast",
//   'angular-intro'
]);
app.factory('Excel', function($window) {
  var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><div class="row text-right"><div class="col-xs-12 "></div></div><table>{table}</table></body></html>',
      base64 = function(s) {
          return $window.btoa(unescape(encodeURIComponent(s)));
      },
      format = function(s, c) {
          return s.replace(/{(\w+)}/g, function(m, p) {
              return c[p];
          })
      };
  return {
      tableToExcel: function(tableId, worksheetName) {
          var table = $(tableId),
              ctx = {
                  worksheet: worksheetName,
                  table: table.html()
              },
              link = document.createElement("a");
          link.download = worksheetName + ".xls";
          link.href = uri + base64(format(template, ctx));
          link.click();
          // href = uri + base64(format(template, ctx));
          return link;
      }
  };
})

app.factory('Fullccreen', function() {
    return {
        toggleFullScreen: function() {
            if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                // $('nk-sidebar').hide();
                // $('.nk-sidebar').addClass("d-none");
                // $('.nk-header').addClass("d-none");
                // $('.nk-wrap').addClass("full");
                //  $('.nk-content').addClass("full");
                if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                // $('nk-sidebar').show();
                // $('.nk-sidebar').removeClass("d-none");
                // $('.nk-header').removeClass("d-none");
                // $('.nk-wrap').removeClass("full");
                // $('.nk-content').removeClass("full");
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        }
    }
})
