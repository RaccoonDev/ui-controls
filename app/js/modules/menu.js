'use strict';

angular.module('ui.menu', [])
    .controller('MenuController', ['$scope', '$location', function($scope, $location) {
        $scope.selectItem = function (item) {
            $scope.selectedItem = item;
        };

        $scope.selectSubitem = function (subitem) {
            $scope.selectedSubitem = subitem;
            if (subitem.url != null) {
                $location.url(subitem.url);
            }
        };
    }])
    .directive('menu', ['$location', function ($location) {
        return {
            scope: {
                items: "=items"
            },
            templateUrl: 'templates/menu.html',
            replace: true,
            controller: 'MenuController',
            link: function(scope) {
                var url = $location.path().substring(1);

                for(var itemIndex in scope.items) {
                    var currentItem = scope.items[itemIndex];
                    for(var subItemIndex in currentItem.subItems) {
                        var currentSubitem =currentItem.subItems[subItemIndex];
                        if (url === currentSubitem.url) {
                            scope.selectedItem = currentItem;
                            scope.selectedSubitem = currentSubitem;
                        }
                    }
                }

            }
        };
    }])
;