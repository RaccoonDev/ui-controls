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
            controller: 'MenuController'
        };
    }])
;