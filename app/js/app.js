'use strict';

/*
    TODO:
    [ ] Cover grid with tests
    [ ] Create new items using modal dialog
    [ ] Filter items by requesting items with filter
    [ ] Think about adding dependency on some other ui controls. Probably angular-bootstrap or something like angular ui
    [ ] Edit types

 */

angular.module('myApp', ['ui.grid', 'ui.menu', 'ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/usersManagement', {
                template: "<div>You can manage users on that page. Probably.</div>"
            })
            .when('/bearsManagement', {
                template: '<div data-grid="" data-settings="gridSettings"></div>',
                controller: 'bearsController'
            })
            .when('/singleProgram', {
                template: "<div>Some kind of single program setup here.</div>"
            })
            .when('/multipleProgram', {
                template: "<div>Another kind of program setup here. Looks like multiple.</div>"
            })
            .when('/programComponentsManagement', {
                template: "<div>Program component usage on that page is exhausted.</div>"
            });

    }])
    .controller('bearsController', ['$scope', '$timeout', function($scope, $timeout) {
        var getBears = function (page, pageSize, sort) {
            var bears = [
                {id: 1, name: 'BigOne', color: 'black'},
                {id: 2, name: "CalmOne", color: "brown"},
                {id: 3, name: "LittleOne", color: "black"},
                {id: 4, name: "SmallOne", color: "red"},
                {id: 5, name: "Aggressive", color: "orange"},
                {id: 6, name: "Zak", color: "pink"},
                {id: 7, name: "British", color: "green"},
                {id: 8, name: "French", color: "blue"},
                {id: 9, name: "Spooky", color: "olive"},
                {id: 10, name: "Modern", color: "oliver"},
                {id: 11, name: "Pug", color: "grey"}
            ];

            if (sort != null) {
                bears.sort(function (a, b) {
                    if (a[sort.field] > b[sort.field])
                        return sort.desc ? -1 : 1;
                    else if (a[sort.field] < b[sort.field])
                        return sort.desc ? 1 : -1;
                    else
                        return 0;
                });
            }

            //throw new Error('error getting data from server');

            var skip = pageSize * (page - 1);
            var slicedBears = bears.slice(skip, skip + pageSize);
            var total = bears.length;

            return {total: total, page: page, pageSize: pageSize, data: slicedBears};
        };

        $scope.gridSettings = {
            columns: [
                {'id': 'id', 'name': 'Id', sortable: true, sorting: { desc: false }, width: '25%' },
                {'id': 'name', 'name': 'Name', sortable: true, width: '30%', editable: true },
                {'id': 'color', 'name': 'Color', editable: true}
            ],
            paging: {
                page: 1,
                pageSize: 4,
                pageSizes: [2, 3, 4, 5]
            },
            fetch: function (page, pageSize, sort, success, error) {
                $timeout(function() {
                    try {
                        var response = getBears(page, pageSize, sort);
                        success(response.data, response.total);
                    } catch (exception) {
                        error(exception);
                    }
                }, 1000);
            },
            save: function(item, success, error) {
                try {
                    console.log('updating existing item ', item);
                    success();
                } catch(exception) {
                    error();
                }
            },
            create: function(item, success, error) {
                try {
                    console.log('creating new item ', item);
                    success();
                } catch (exception) {
                    error();
                }
            }
        };
    }])
    .controller('appController', ['$scope', function ($scope) {
        $scope.menuItems = [
            {title: 'Administration', subItems: [
                {title: 'Users Management', url: "usersManagement"},
                {title: 'Bears Management', url: "bearsManagement"}
            ]},
            {title: 'Program Management', subItems: [
                {title: 'Single Program', url: "singleProgram"},
                {title: 'Multiple Programs', url: "multipleProgram"},
                {title: 'Program Components Management', url: "programComponentsManagement"}
            ]}
        ];
    }]);
