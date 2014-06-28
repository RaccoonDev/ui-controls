'use strict';

angular.module('ui.menu', [])
    .directive('menu', function() {
        return {
            scope: {
                items: "=items"
            },
            templateUrl: 'templates/menu.html',
            replace: true,
            link: function(scope) {
                scope.selectItem = function(item) {
                    scope.selectedItem = item;
                };

                scope.selecSubitem = function (subitem) {
                    scope.selectedSubitem = subitem;
                };
            }
        };
    })
;