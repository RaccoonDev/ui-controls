'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ui.grid', 'ui.menu'])
.controller('testController', ['$scope', function($scope) {
        var getBears = function(page, pageSize, sort) {
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
                bears.sort(function(a,b) {
                    if (a[sort.field] > b[sort.field])
                        return sort.desc ? -1 : 1;
                    else if (a[sort.field] < b[sort.field])
                        return sort.desc ? 1 : -1;
                    else
                        return 0;
                });
            }

            var skip = pageSize * (page - 1);
            var slicedBears = bears.slice(skip, skip + pageSize);
            var total = bears.length;

            return {total: total, page: page, pageSize: pageSize, data: slicedBears};
        };

        $scope.menuItems = [
            {title: 'Administration', subItems: [{title: 'Users Management'}, {title: 'Files Management'}]},
            {title: 'Program Management', subItems: [{title: 'Single Program'}, {title: 'Multiple Programs'}, {title: 'Program Components Management'}]}
        ];

        $scope.gridSettings = {
            columns: [
                {'id': 'id', 'name': 'Id', sortable: true, sorting: { desc: false } },
                {'id': 'name', 'name': 'Name', sortable: true },
                {'id': 'color', 'name': 'Color'}
            ],
            paging: {
                page: 1,
                pageSize: 4,
                pageSizes: [2,3,4,5]
            },
            fetchData: function(page, pageSize, sort, success) {
                var response = getBears(page, pageSize, sort);
                success(response.data, response.total);
            }
        };

    }]);
