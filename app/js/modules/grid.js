'use strict';

angular.module('ui.grid', [])
    .controller('GridController', ['$scope', function($scope) {

        var deselectSelectedRow = function () {
            $scope.selectedRow = -1;
            $scope.selectedItem = null;
        };

        $scope.reload = function () {
            deselectSelectedRow();

            $scope.loading = true;
            // Expected fetch data: setting.fetch(currentPage, items per page, currentSortingObject, success_callback, error_callback)
            $scope.settings.fetch($scope.settings.paging.page, $scope.settings.paging.pageSize, $scope.currentSorting, function (data, total) {
                $scope.data = data;
                $scope.settings.paging.total = total;

                $scope.pages = [];
                var pagesNumber = ($scope.settings.paging.total + $scope.settings.paging.pageSize - 1) / $scope.settings.paging.pageSize;
                for (var i = 1; i <= pagesNumber; i++) {
                    $scope.pages.push({ number: i });
                }
                $scope.loading = false;
            }, function(error) {
                console.log(error);
                $scope.loading = false;
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

        $scope.selectRow = function(index, item) {
            $scope.selectedRow = index;
            $scope.selectedItem = item;
        };

        $scope.triggerSelectedRow = function (index, item) {
            if ($scope.selectedRow == index) {
                $scope.selectRow(-1, null);
            } else {
                $scope.selectRow(index, item);
            }
        };

        $scope.logSelectedItem = function () {
            console.log($scope.selectedItem);
        };

        $scope.editSelectedItem = function (creatingNew) {
            if ($scope.selectedItem == null) return;
            $scope.editingItem = angular.copy($scope.selectedItem);
            $scope.originalItem = $scope.selectedItem;
            $scope.originalItem.editing = true;
            $scope.creatingNew = creatingNew;
        };

        $scope.cancelEdit = function () {
            if($scope.creatingNew === true) {
                $scope.data.shift();
            }
            $scope.editingItem = null;
            $scope.originalItem.editing = false;
        };

        $scope.save = function () {
            $scope.loading = true;
            if($scope.creatingNew === true) {
                $scope.settings.create($scope.editingItem, function() { $scope.reload(); }, function () { $scope.loading = false; });
            } else {
                $scope.settings.save($scope.editingItem, function () {
                    $scope.reload();
                }, function () {
                    $scope.loading = false;
                });
            }
        };

        $scope.createNewItem = function() {
            var newItem = {};
            $scope.data.unshift(newItem);
            $scope.selectRow(0, newItem);
            $scope.editSelectedItem(true);
        };

        $scope.saveCancelKeys = function(event) {
            if(event !== null && event.keyIdentifier === 'Enter') {
                $scope.save();
            }
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