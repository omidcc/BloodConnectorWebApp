﻿'use strict';
app.controller('usersController', ['usersService', '$scope', '$filter', function (usersService, $scope, $filter) {

    var vm = this;

    /*vm.users = [];

    usersService.getUsers().then(function (results) {

        vm.users = results.data;

    }, function (error) {
        //alert(error.data.message);
    });*/

    vm.itemsPerPage = 5;
    vm.currentPage = 0;
    vm.items = [];

    for (var i = 0; i < 50; i++) {
        vm.items.push({
            id: i,
            name: "name " + i,
            description: "description " + i
        });
    }

    vm.pageCount = function () {
        var pages = $filter('filter')(vm.items, vm.searchText);
        return Math.ceil(pages.length / vm.itemsPerPage);
    };

    vm.range = function () {
        var rangeSize = 5;
        var ret = [];
        var start;

        var count = vm.pageCount();

        if (count < rangeSize) {
            rangeSize = count;
        }

        start = vm.currentPage;
        if (start > count - rangeSize) {
            start = count - rangeSize;
        }

        for (var i = start; i < start + rangeSize; i++) {
            ret.push(i);
        }
        return ret;
    };
    vm.pages = vm.range();

    $scope.$watch('vm.searchText.name', function (v) {
        vm.currentPage = 0;
        vm.pages = vm.range();
    });

    $scope.$watch('vm.currentPage', function (v) {
        vm.pages = vm.range();
    });

    vm.prevPage = function () {
        if (vm.prevPageDisabled()) {
            return;
        }
        if (vm.currentPage > 0) {
            vm.currentPage--;
        }
    };

    vm.prevPageDisabled = function () {
        return vm.currentPage === 0 ? "disabled" : "";
    };

    vm.nextPage = function () {
        if (vm.nextPageDisabled()) {
            return;
        }
        if (vm.currentPage < vm.pageCount()) {
            vm.currentPage++;
        }
    };

    vm.nextPageDisabled = function () {
        return vm.currentPage + 1 === vm.pageCount() ? "disabled" : "";
    };

    vm.setPage = function (n) {
        vm.currentPage = n;
    };

}]);