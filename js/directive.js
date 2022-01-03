app.directive("compareTo", function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});
app.directive("sort", function() {
    return {
        restrict: 'A',
        transclude: true,
        template: '<span class="d-inline-flex" style="cursor: pointer;" ng-click="onClick()">' +
            '<span ng-transclude></span>' +
            '<i class="icon ni" ng-class="{\'ni-sort-v\' : order === by && !reverse,  \'ni-sort-v\' : order===by && reverse}">&nbsp;</span>' +
            '</span>',
        scope: {
            order: '=',
            by: '=',
            reverse: '='
        },
        link: function(scope, element, attrs) {
            scope.reverse = !scope.reverse

            scope.onClick = function() {
                if (scope.order === scope.by) {
                    scope.reverse = !scope.reverse
                } else {
                    scope.by = scope.order;
                    scope.reverse = false;
                }
            }
        }
    }
});
app.directive('loading', ['$http', function($http) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            scope.isLoading = function() {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function(v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };
}]);
app.directive('ngIntroOptions', ['$timeout', function ($timeout) {

    return {
        restrict: 'A',
        scope: {
            ngIntroMethod: "=",
            ngIntroOptions: '=',
            ngIntroOncomplete: '=',
            ngIntroOnexit: '=',
            ngIntroOnchange: '=',
            ngIntroOnbeforechange: '=',
            ngIntroOnafterchange: '=',
            ngIntroAutostart: '@'
        },
        link: function(scope, element, attrs) {
            scope.ngIntroMethod = function(step) {

                var intro;

                if(typeof(step) === 'string') {
                    intro = introJs(step);

                } else {
                    intro = introJs();
                }

                intro.setOptions(scope.ngIntroOptions);

                if(scope.ngIntroOncomplete) {
                    intro.oncomplete(scope.ngIntroOncomplete);
                }

                if(scope.ngIntroOnexit) {
                    intro.onexit(scope.ngIntroOnexit);
                }

                if(scope.ngIntroOnchange) {
                    intro.onchange(function(targetElement){
                       $timeout(function() { scope.ngIntroOnchange(targetElement)});
                    });
                }

                if(scope.ngIntroOnbeforechange) {
                    intro.onbeforechange(function(targetElement) {
                        $timeout(function() {
                             scope.ngIntroOnbeforechange(targetElement) ;
                        }, 0);
                    });
                }

                 if(scope.ngIntroOnafterchange) {
                     intro.onafterchange(function(targetElement){
                        $timeout(function() { scope.ngIntroOnafterchange(targetElement); });
                     });
                }

                if(typeof(step) === 'number') {
                    intro.goToStep(step).start();
                } else {
                    intro.start();
                }
            };

            if(scope.ngIntroAutostart == 'true') {
                $timeout(function() {
                    scope.ngIntroMethod();
                });
            }
        }
    };
}]);