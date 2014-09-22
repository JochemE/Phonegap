'use strict';

angular.module('app.controllers').controller('app.overview', [])
  .controller('OverviewCtrl', function ($scope, $http) {
    $scope.holidayRequests = [];

    $http.get('https://holidays')
      .success(function (data, status, headers, config) {
        $scope.holidayRequests = data;
      })
      .error(function (data, status, headers, config) {
        console.log("Error occurred.  Status:" + status);
      });
  })