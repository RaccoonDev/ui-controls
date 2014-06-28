'use strict';

angular.module('ui.grid', [])
    .controller('GridController', ['$scope', function($scope) {

        var deselectSelectedRow = function () {
            $scope.selectedRow = -1;
            $scope.selectedItem = null;
        };

        $scope.reload = function () {
            deselectSelectedRow();

            $scope.settings.fetchData($scope.settings.paging.page, $scope.settings.paging.pageSize, $scope.currentSorting, function (data, total) {
                $scope.data = data;
                $scope.settings.paging.total = total;

                $scope.pages = [];
                var pagesNumber = ($scope.settings.paging.total + $scope.settings.paging.pageSize - 1) / $scope.settings.paging.pageSize;
                for (var i = 1; i <= pagesNumber; i++)
                    $scope.pages.push({ number: i })
            });
        };

        $scope.changePage = function (newPage) {
            if ($scope.settings.paging.page === newPage) return;
            $scope.settings.paging.page = newPage;
            $scope.reload()
        };

        $scope.sortBy = function (column) {
            if (column.sortable) {
                column.sorting = column.sorting || {desc: true};
                column.sorting.desc = !column.sorting.desc;
                $scope.currentSorting = { field: column.id };
                $scope.currentSorting.desc = column.sorting.desc;
                $scope.reload();
            }
        };

        $scope.triggerSelectedRow = function (index, item) {
            if ($scope.selectedRow == index) {
                $scope.selectedRow = -1;
                $scope.selectedItem = null;
            } else {
                $scope.selectedRow = index;
                $scope.selectedItem = item;
            }
        };

        $scope.logSelectedItem = function () {
            console.log($scope.selectedItem);
        };

        $scope.editSelectedItem = function () {
            if ($scope.selectedItem == null) return;
            $scope.editingItem = angular.copy($scope.selectedItem);
            $scope.originalItem = $scope.selectedItem;
            $scope.originalItem.editing = true;
        };

        $scope.cancelEdit = function () {
            $scope.editingItem = null;
            $scope.originalItem.editing = false;
        };

        $scope.saveEdit = function () {
            angular.copy($scope.editingItem, $scope.originalItem);
        };

        this.init = function() {
            $scope.reload();
        }

    }])
    .directive('grid', function () {
        return {
            scope: {
                settings: "=settings"
            },
            templateUrl: 'templates/grid.html',
            replace: true,
            require: ['grid'],
            controller: 'GridController',
            link: function (scope, element, attr, ctrl) {
                var gridCtrl = ctrl[0];
                gridCtrl.init();
            }
        };
    });